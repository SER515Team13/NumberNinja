import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { MathparserService } from 'src/app/shared/mathparser.service';
declare var Blockly: any;
var workspace;
var toolboxSource;
var dom;

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  titleMessage: string = "Practice Playground";
  hasError: boolean = false;
  resultString: string = "Result: ";

  constructor(private location: Location,
              private mathparserService: MathparserService) { }

  ngOnInit() {
    // Initialize toolbox depending on student grade and question type.
    switch(localStorage.getItem('userGrade')) {
      case '2': 
        toolboxSource = document.getElementById('toolbox-grade-2');
        break;

      case '7':
        toolboxSource = document.getElementById('toolbox-grade-7');
        break;
    }

    const blocklyDiv = document.getElementById('blocklyDiv');
    workspace = Blockly.inject(blocklyDiv, {
      readOnly: false,
      grid: {
        spacing: 20,
        length: 20,
        colour: '#ccc',
        snap: true
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.4,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
      },
      move: {
        scrollbars: true,
        drag: true,
        wheel: true
      },
      toolbox: toolboxSource
    });

    document.getElementById("textarea").innerText = "The canvas is empty!";

    workspace.addChangeListener(myUpdateFunction.bind(this));

    function myUpdateFunction(event) {
      var generatedEquation = Blockly.JavaScript.workspaceToCode(workspace);
      generatedEquation = generatedEquation.replace("<br>", "");
      console.log("GENERATED EQUATION: " + generatedEquation);
      if (generatedEquation.split(';').length - 1 > 1) {
        this.hasError = true;
        document.getElementById("textarea").innerText = "There are disconnected blocks on the canvas!";
      } else if (generatedEquation.split(';').length - 1 == 0) {
        this.hasError = true;
        document.getElementById("textarea").innerText = "The canvas is empty!";
      } else {
        this.hasError = false;
        generatedEquation = generatedEquation.replace(";", "");
        generatedEquation = generatedEquation.replace(/(\r\n|\n|\r)/gm, "");
        generatedEquation = this.handlePower(generatedEquation);
        this.mathparserService.evaluateExpression(generatedEquation).subscribe((data: any) => {
          if (data == null) {
            document.getElementById("textarea").innerText = "Math Error";
          } else {
            if (!(data % 1 === 0)) {
              data = Number.parseFloat(data).toPrecision(3);
            }
            document.getElementById("textarea").innerText = this.resultString + data;
          }
        });
      }
    }
  }

  /**
   * 
   * @param generatedEquation "The equation string which replaces all occurance of 
   * substrings of the form Math.pow(x, y) where x and y are real numbers and replaces 
   * them with (x ^ y)"
   */
  handlePower(generatedEquation: string) {
    let index: number = generatedEquation.indexOf("Math.pow(");
    while (index != -1) {
      let startIndex: number = index + 9;
      let endIndex: number;
      let firstNumber: string = "";
      let secondNumber: string = "";
      let currentNumber: string = ""; 
      var stack = [];
      for (let i = startIndex; i < generatedEquation.length; i++) {
        if (generatedEquation.charAt(i) == ',') {
          if (stack.length == 0) {
            firstNumber = currentNumber;
            currentNumber = "";
          } else {
            currentNumber += generatedEquation.charAt(i);
          }
        } else if (generatedEquation.charAt(i) == '(') {
          stack.push('(');
          currentNumber += generatedEquation.charAt(i);
        } else if (generatedEquation.charAt(i) == ')') {
          if (stack.length == 0) {
            secondNumber = currentNumber;
            currentNumber = "";
            endIndex = i;
            break;
          } else {
            stack.pop();
            currentNumber += generatedEquation.charAt(i);
          }
        } else {
          currentNumber += generatedEquation.charAt(i);
        }
      }
      firstNumber = firstNumber.trim();
      secondNumber = secondNumber.trim();
      if (this.needsBraces(firstNumber)) {
        firstNumber = "(" + firstNumber + ")";
      }
      if (this.needsBraces(secondNumber)) {
        secondNumber = "(" + secondNumber + ")";
      }
      currentNumber = firstNumber + " ^ " + secondNumber;
      generatedEquation = generatedEquation.substring(0, index) +
                          "(" + currentNumber + ")" +
                          generatedEquation.substring(endIndex + 1);
      index = generatedEquation.indexOf("Math.pow(");
    }
    return generatedEquation;
  }

  /**
   *  
   * @param num "The equation string which is scanned by the function to 
   * determine whether brackets are needed to maintain precedence 
   * safety during mathematical evaluation."
   */
  needsBraces(num: string) {
    let needsBrace: boolean = false;
    for (let i=0; i < num.length; i++) {
      if (num.charAt(i) == '+' || num.charAt(i) == '-' || 
          num.charAt(i) == '*' || num.charAt(i) == '/') {
          needsBrace = true;
      }
    }
    return needsBrace;
  }

  /**
   * Go back to the student questions page
   */
  goBack() {
    this.location.back();
  }
}
