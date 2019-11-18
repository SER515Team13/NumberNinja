/**
 * @project NumberNinja
 * @author Sukhpreet Singh Anand
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { Location } from "@angular/common";
import { QuestionServiceService } from '../../service/question-service.service';
import { MathparserService } from 'src/app/shared/mathparser.service';
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

  constructor(private location: Location,
              private questionService: QuestionServiceService,
              private mathparserService: MathparserService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    // Fetch question details from server
    this.questionID = this.route.snapshot.paramMap.get('id');
    this.questionService.getQuestion(this.questionID).subscribe((data: any) => {
      if (data && data != undefined && data.length) {
        console.log(data);
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
    /*var*/ workspace = Blockly.inject(blocklyDiv, {
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
        startScale: 1.0,
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
    } /*as Blockly.BlocklyOptions*/);

    this.questionString = "(5 + (6 + 4))";
    var xmlContent = this.generateQuestionBlock(this.questionString);
    var dom = Blockly.Xml.textToDom(xmlContent);
    Blockly.Xml.domToWorkspace(dom, workspace);

    // Bind workspace to change listener
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
        this.mathparserService.evaluateExpression(generatedEquation).subscribe((data: any) => {
          console.log("IS DATA HERE: "+ data);
          if (data == null) {
            document.getElementById("textarea").innerText = "Math Error"
          } else {
            if (!(data % 1 === 0)) {
              data = Number.parseFloat(data).toPrecision(3);
            }
            document.getElementById("textarea").innerText = data;
          }
        });
        //document.getElementById("textarea").innerText = generatedEquation
      }
    }
    workspace.addChangeListener(myUpdateFunction.bind(this));
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
    for (let i = 0; i < questionString.length; i++) {
      console.log("Input: " + questionString[i]);
      //console.log(questionString[i])
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

        if (!isNaN(leftOperand)) {
          tripleLeft = '<block type="math_number"><field name="NUM">' + leftOperand + '</field></block>';
        } else {
          tripleLeft = leftOperand;
        }

        if (!isNaN(rightOperand)) {
          tripleRight = '<block type="math_number"><field name="NUM">' + rightOperand + '</field></block>';
        } else {
          tripleRight = rightOperand;
        }

        switch(operator) {
          case '+':
            tripleMiddle = '<block type="math_arithmetic"><field name="OP">ADD</field><value name="A">' + tripleLeft +
            '</value><value name="B">' + tripleRight + '</value></block>';
            break;

          case '-':
            tripleMiddle = '<block type="math_arithmetic"><field name="OP">MINUS</field><value name="A">' + tripleLeft +
            '</value><value name="B">' + tripleRight + '</value></block>';
            break;

          case '*':
            tripleMiddle = '<block type="math_arithmetic"><field name="OP">MULTIPLY</field><value name="A">' + tripleLeft +
            '</value><value name="B">' + tripleRight + '</value></block>';
            break;

          case '/':
            tripleMiddle = '<block type="math_arithmetic"><field name="OP">DIVIDE</field><value name="A">' + tripleLeft +
            '</value><value name="B">' + tripleRight + '</value></block>';
            break;
          
          case '^':
            tripleMiddle = '<block type="math_arithmetic"><field name="OP">POWER</field><value name="A">' + tripleLeft +
            '</value><value name="B">' + tripleRight + '</value></block>';
            break;
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
                 questionString[i] == '^') {
        if (numberBuffer != '') {
          stack.push(numberBuffer);
          numberBuffer = '';
        }
        stack.push(questionString[i]);
      }

      console.log("Stack: " + stack);
    }

    questionXml += stack.pop();
    questionXml += '</xml>';
    
    return questionXml;
  }

  /**
   * Go back to the student questions page
   */
  goBack() {
    this.location.back();
  }

  submitSolution() {
    var generatedEquation = document.getElementById("textarea").innerHTML
    if (generatedEquation === "Error: There are disconnected blocks on the canvas!") {
      this.isDisconnected = true;
    } else {
      this.isDisconnected = false;
      // TODO: Write code for submitting solution here.
    }
  }
}