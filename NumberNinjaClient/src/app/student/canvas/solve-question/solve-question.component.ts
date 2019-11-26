/**
 * @project NumberNinja
 * @author Sukhpreet Singh Anand, Abhinaw Sarang, Saksham Jhawar
 */

import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { Location } from "@angular/common";
import { QuestionServiceService } from '../../service/question-service.service';
import { MathparserService } from 'src/app/shared/mathparser.service';
import { MatDialog } from '@angular/material/dialog';
declare var Blockly: any;
var workspace;

@Component({
  selector: 'app-solve-question',
  templateUrl: './solve-question.component.html',
  styleUrls: ['./solve-question.component.css']
})
export class SolveQuestionComponent implements OnInit {

  questionID: any;
  toolboxSource: any;
  questionString: any;
  isDisconnected: boolean = false;
  hasError: boolean = false;
  questionType: string;
  solution: string;
  isCorrectSolution: boolean = false;
  formulaDisplay: string;
  resultString: string = "Result: "

  constructor(private location: Location,
              private questionService: QuestionServiceService,
              private mathparserService: MathparserService,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit() {

    // Fetch question details from server
    this.questionID = this.route.snapshot.paramMap.get('id');
    this.questionService.getQuestionCanvas(this.questionID, localStorage.getItem('userEmail')).subscribe((data: any) => {
      if (data && data != undefined && data.length) {
        console.log("DATA: " + data);
        console.log("Fetched data is--------->>", data[0].formulaForBlockly);
        console.log(data[0].formulaForBlockly);
        if (data[0].formulaForBlockly == null) {
          //this.questionString = data[0].formula;//todo
          this.formulaDisplay = "Choose the correct answer for ".concat(data[0].formula.split('=')[0]);
        }
        else{
          this.questionString = data[0].formulaForBlockly;
          this.solution = data[0].formula.substring(data[0].formula.indexOf('=') + 1).trim();
          //this.questionString = this.questionString.substring(0, this.questionString.indexOf('='));
          console.log("QUESTION STRING: " + this.questionString);
          this.formulaDisplay = "Fill in the blank(s) in ".concat(data[0].formulaWithBlanks.replace(/\?/g, " _____ "));
        }
        console.log(this.questionString);
        //this.solution = this.questionString.substring(this.questionString.indexOf('=') + 1).trim();
        //this.questionString = this.questionString.substring(0, this.questionString.indexOf('='));
        var xmlContent = this.generateQuestionBlock(this.questionString);
        console.log("XML CONTENT: " + xmlContent);
        var dom = Blockly.Xml.textToDom(xmlContent);
        Blockly.Xml.domToWorkspace(dom, workspace);
      }
    });

    // Initialize toolbox depending on student grade.
    switch(localStorage.getItem('userGrade')) {
      case '2': 
        this.toolboxSource = document.getElementById('toolbox-grade-2')
        break;

      case '7':
        this.toolboxSource = document.getElementById('toolbox-grade-7')
        break;
    }
    
    // Spawn blockly workspace
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
      toolbox: this.toolboxSource
    });

    // /*if (this.questionType == 'Fill in the Blanks') {
      
    // } else if (this.questionType == 'Find the Answer') {

    // }*/

    function myUpdateFunction(event) {
      var generatedEquation = Blockly.JavaScript.workspaceToCode(workspace);
      generatedEquation = generatedEquation.replace("<br>", "");
      if (generatedEquation.split(';').length - 1 > 1) {
        this.hasError = true;
        document.getElementById("textarea").innerText = "Error: There are disconnected blocks on the canvas!";
      } else if (generatedEquation.split(';').length - 1 == 0) {
        this.hasError = true;
        document.getElementById("textarea").innerText = "Error: The canvas is empty!";
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
      // TODO: Uncomment the below line when saveSolution() and restoreSolution() are implemented
      // this.saveSolution();
    }
    workspace.addChangeListener(myUpdateFunction.bind(this));
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
   * 
   * @param questionString "The equation to be converted into blockly parsable XML"
   *
   */
  generateQuestionBlock(questionString: string): any {
    var questionXml = ``;
    questionXml += '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox-simple" style="display: none">';
    
    console.log(questionXml);
    var stack = [];
    var numberBuffer = '';
    var disconnectedComponents = [];
    for (let i = 0; i < questionString.length; i++) {
      if (questionString[i] == ')') {

        if (numberBuffer != '') {
          stack.push(numberBuffer);
          numberBuffer = '';
        }

        var rightOperand = stack.pop();
        var operator = stack.pop();
        var leftOperand = stack.pop();
        var tripleLeft;
        var tripleRight;
        var tripleMiddle;

        if (leftOperand == '?' || leftOperand == '') {
          tripleLeft = '';
        } else if (!isNaN(leftOperand)) {
          tripleLeft = '<block editable="false" type="math_number" deletable="false"><field name="NUM">' + leftOperand + '</field></block>';
        } else {
          tripleLeft = leftOperand;
        }

        if (rightOperand == '?' || rightOperand == '') {
          tripleRight = '';
        } else if (!isNaN(rightOperand)) {
          tripleRight = '<block editable="false" type="math_number" deletable="false"><field name="NUM">' + rightOperand + '</field></block>';
        } else {
          tripleRight = rightOperand;
        }

        switch(operator) {
          case '+':
            tripleMiddle = '<block editable="false" type="math_arithmetic" deletable="false"><field name="OP">ADD</field><value name="A">' + tripleLeft +
            '</value><value name="B">' + tripleRight + '</value></block>';
            break;

          case '-':
            tripleMiddle = '<block editable="false" type="math_arithmetic" deletable="false"><field name="OP">MINUS</field><value name="A">' + tripleLeft +
            '</value><value name="B">' + tripleRight + '</value></block>';
            break;

          case '*':
            tripleMiddle = '<block type="math_arithmetic" deletable="false"><field name="OP">MULTIPLY</field><value name="A">' + tripleLeft +
            '</value><value name="B">' + tripleRight + '</value></block>';
            break;

          case '/':
            tripleMiddle = '<block type="math_arithmetic" deletable="false"><field name="OP">DIVIDE</field><value name="A">' + tripleLeft +
            '</value><value name="B">' + tripleRight + '</value></block>';
            break;
          
          case '^':
            tripleMiddle = '<block type="math_arithmetic" deletable="false"><field name="OP">POWER</field><value name="A">' + tripleLeft +
            '</value><value name="B">' + tripleRight + '</value></block>';
            break;

          case '?':
            tripleMiddle = '';
            break;
        }

        if (tripleMiddle == '') {
          if (tripleLeft != '') {
            disconnectedComponents.push(tripleLeft);
          }
          if (tripleRight != '') {
            disconnectedComponents.push(tripleRight);
          }
        }

        stack.pop();
        stack.push(tripleMiddle);

      } else if (questionString[i] == '(') {
        stack.push(questionString[i]);
      } else if (questionString[i] >= '0' && questionString[i] <= '9') {
        numberBuffer += questionString[i];
      } else if (questionString[i] == ' ' && numberBuffer != '') {
        stack.push(numberBuffer);
        numberBuffer = '';
      } else if (questionString[i] == '+' || questionString[i] == '-' || 
                 questionString[i] == '*' || questionString[i] == '/' ||
                 questionString[i] == '^' || questionString[i] == '?') {
        if (numberBuffer != '') {
          stack.push(numberBuffer);
          numberBuffer = '';
        }
        stack.push(questionString[i]);
      }
    }

    questionXml += stack.pop();
    for (let i=0; i<disconnectedComponents.length; i++) {
      questionXml += disconnectedComponents[i];
    }
    questionXml += '</xml>';
    
    return questionXml;
  }

  /**
   * This function saves the student's solution progress so that it can 
   * be resumed later from that position.
   */
  saveSolution() {
    var xml = Blockly.Xml.workspaceToDom(Blockly.workspace);
    //TODO: Store Blockly.Xml.domToText(xml) in question database.
    console.log("Progress saved!");
  }

  /**
   * This function restores the student's solution on opening the workspace 
   * if the student attempted to partly solve the question before.
   */
  restoreSolution() {
    Blockly.workspace.clear();
    var xml = Blockly.Xml.textToDom(/*TODO: Fetch solution progress from question database*/);
    Blockly.Xml.domToWorkspace(xml, Blockly.workspace);
    console.log("Progress restored!");
  }

  /**
   * Go back to the student questions page
   */
  goBack() {
    this.location.back();
  }

  /**
   * This function submits the solution provided by the student, updates the question 
   * progress status and updates the percentage correctness of the assignment.
   */
  submitSolution(ref: TemplateRef<any>) {
    var generatedEquation = document.getElementById("textarea").innerHTML.substring(this.resultString.length);
    if (generatedEquation === "Error: There are disconnected blocks on the canvas!") {
      this.isDisconnected = true;
    } else {
      this.isDisconnected = false;
      console.log("SOLUTION:"+this.solution+"|EQUATED:"+generatedEquation);
      if (this.solution === generatedEquation) {
        this.isCorrectSolution = true;
      } else {
        this.isCorrectSolution = false;
      }
      this.dialog.open(ref);
      this.questionService.submitSolutionCanvas(this.questionID, localStorage.getItem('userEmail'), this.isCorrectSolution).subscribe((data: any) => {
        console.log(data);
      });
    }
  }
}