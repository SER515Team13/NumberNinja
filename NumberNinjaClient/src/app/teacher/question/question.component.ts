/**
 * @project NumberNinja
 * @authors Sagar Khar, Abhinaw Sarang, Smit Shah
 */

import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionService } from '../service/question-service';
import { AssignmentService } from '../service/assignment.service';
import { isNull, isUndefined } from 'util';
import { Question } from '../model/question';
import { MathparserService } from 'src/app/shared/mathparser.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {

  private regexOp1: RegExp = /(\d+)|(\+|\-|\(|\)|\*|\^|\/|√)|(\=)/gm;
  private regexOp2: RegExp = /(?<=\=).*/gm;
  public questionForm: FormGroup;
  private digitsArray = [];
  private digitsArray1 = [];
  private selectedValue : Array<number>;
  private checkbox = false;
  private grade = true;
  private question : Question;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<QuestionComponent>,
    private questionService: QuestionService,
    private assignmentService: AssignmentService,
    private mathparserService: MathparserService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  ngOnInit() {
    console.log("IDDDDDDDDDDDDDDDDD: " + this.data);
    var grade1 = localStorage.getItem('userGrade');
    if(grade1 == '2') {
      this.grade = false;
    } else {
      this.grade = true;
    }
    this.questionForm = this.formBuilder.group({
      _id: [this.data._id],
      formula: [this.data.formula, [Validators.required]],
      formulaType: [this.data.formulaType, [Validators.required]],
      formula1: [this.data.formula1, [Validators.required]],
      formula2: [this.data.formula2, [Validators.required]],
      formula3: [this.data.formula3, [Validators.required]],
      formula4: [this.data.formula4, [Validators.required]],
      assignmentID: [this.data]
    })
  }
  onSubmit() {
    
    console.log("Question form: " + this.questionForm.value);
    // let question = new Question;
    if(this.question === undefined) {
      this.question = new Question;
      this.question.formula= this.questionForm.value.formula.replace(/\s/g, "");
    }
    this.question.formula= this.question.formula.replace(/\s/g, "");
    // var nas = this.convertToCnvasFormat(this.infixGenrator(question.formula));
    // console.log(this.infixGenrator(question.formula));
    console.log(this.infixGenrator(this.question.formula.split('=')[0]));
    console.log(this.convertToCnvasFormat(this.infixGenrator(this.question.formula.split('=')[0])));
    this.question.formulaType = this.questionForm.value.formulaType;
    this.question.assignmentID= this.data;
    if (isUndefined(this.data._id)) {
      if(this.questionForm.value.formulaType == 'Fill in the Blanks') {
        this.addBlanksInString(this.question);
        this.question.formulaForBlockly = this.addBlanksInCanvasFormat( this.question.formulaWithBlanks,
          this.convertToCnvasFormat(this.infixGenrator(this.question.formula.split("=")[0])).toString());
        // console.log(question.formulaForBlockly);
      }
      if(this.questionForm.value.formulaType == 'Find the Answer') {
        this.addOptionsQuestion(this.question);
        this.question.formulaForBlockly = this.convertToCnvasFormat(this.infixGenrator(this.question.formula.split("=")[0])).toString();
      }
      this.questionService.addQuestion(this.question).subscribe((data: any) => {
        console.log("Add question response" + data );
        if (data._id != null) {
          this.assignToEachStudent(this.question.assignmentID, data._id)
          return data;
        }
    });
    console.log(this.selectedValue);
    this.dialogRef.close();
    } else {
      this.question.id = this.questionForm.value._id;
      console.log("Question form" + this.questionForm.value);
      if(this.questionForm.value.formulaType == 'Fill in the Blanks') {
        this.addBlanksInString(this.question);
        this.question.formulaForBlockly = this.addBlanksInCanvasFormat(this.question.formulaWithBlanks,
          this.convertToCnvasFormat(this.infixGenrator(this.question.formula.split("=")[0])).toString());
      }
      if(this.questionForm.value.formulaType == 'Find the Answer') {
        this.addOptionsQuestion(this.question);
        this.question.formulaForBlockly = this.convertToCnvasFormat(this.infixGenrator(this.question.formula.split("=")[0])).toString();
      }
      this.questionService.editQuestion(this.question).subscribe((data: any) => {
        console.log("Edit question response" + data );
        if (data && data != undefined && data.length) {
          return data;
        }
    });
    this.dialogRef.close();
    }
  }

  addBlanksInString(question:Question) {
    var stringWithQuestions : string;
    stringWithQuestions = "";
    for(var i = 0 ; i < this.digitsArray.length ; i ++) {
        if(this.selectedValue.includes(i)) {
          stringWithQuestions = stringWithQuestions + "?";
        } else {
          stringWithQuestions = stringWithQuestions + this.digitsArray[i];
        }
    }
    question.formulaWithBlanks = stringWithQuestions;
    question.answers = null;
    console.log(stringWithQuestions);
    // return question;
  }

  addOptionsQuestion(question:Question) {
    question.answers = [];
    question.answers.push(this.questionForm.value.formula1)
    question.answers.push(this.questionForm.value.formula2);
    question.answers.push(this.questionForm.value.formula3);
    question.answers.push(this.questionForm.value.formula4);
    question.formulaWithBlanks = null;
  }

  myFunc() {
    var stringWithAnswer = '';
    this.mathparserService.evaluateExpression(this.questionForm.value.formula).subscribe((data: any) => {
      if (data == null) {
        document.getElementById("textarea").innerText = "Math Error";
      } else {
        if (!(data % 1 === 0)) {
          data = Number.parseFloat(data).toPrecision(3);
        }
        let grade = localStorage.getItem('userGrade')
        if(data < 0 && grade == '2') {
          return;
        }
        stringWithAnswer = this.questionForm.value.formula + '=' + data;
        this.digitsArray = stringWithAnswer.match(this.regexOp1);
        this.selectedValue = [];
        this.question = new Question;
        this.question.formula = stringWithAnswer;
      }
    });
    // console.log(this.digitsArray);
  }

  addinarr(i:number) {
    if(this.selectedValue.includes(i)){
      const index: number = this.selectedValue.indexOf(i);
      if (index !== -1) {
          this.selectedValue.splice(index, 1);
      }
    } else {
      this.selectedValue.push(i);
    }
    var element = <HTMLInputElement> document.getElementById("submitButton");
    if(this.selectedValue.length > 0) {
      element.disabled = false;
    } else {
      element.disabled = true;
    }
  }

  myFuncForSingle() {
    this.digitsArray1 = this.questionForm.value.formula.match(this.regexOp2);
    this.checkbox = !this.checkbox;
    var element = <HTMLInputElement> document.getElementById("submitButton");
    element.disabled = false;
  }

  infixGenrator(equation: String) {

    var answerToreturn = "";
    var stack = [];
    for(let i = 0; i < equation.length; i++) {
      var tmpchr = equation.charAt(i);
      if(!isNaN(Number(tmpchr))) {
        answerToreturn = answerToreturn + tmpchr;
      }
      else if(tmpchr === '(') {
        stack.push(tmpchr);
      }
      else if(tmpchr === ')') {
        while(stack.length > 0 && stack[stack.length - 1] !== '(') {
          answerToreturn = answerToreturn + ',';
          answerToreturn = answerToreturn + stack.pop();
        }
        stack.pop(); 
      }
      else {
        while(stack.length > 0 && this.getOpValue(tmpchr) <= this.getOpValue(stack[stack.length - 1])) {
          if(stack[stack.length - 1] === '(') {
            break;
          }
          answerToreturn = answerToreturn + ',';
          answerToreturn = answerToreturn + stack.pop();
        }
        answerToreturn = answerToreturn + ',';
        stack.push(tmpchr);
      }
    }
    while(stack.length > 0) {
      answerToreturn = answerToreturn + ',';
      answerToreturn = answerToreturn + stack.pop();
    }
    return answerToreturn;
  }

  getOpValue(c:any) {
    switch(c) { 
      case '+':
      case '-':
      { 
         return 1; 
      } 
      case '*': 
      case '/':
      { 
         return 2; 
      }
      case '^':
        return 3; 
   }
   return -1; 
  }

  convertToCnvasFormat(postfixEquation: string) : String {
    var stack = [];
    var valuees = [];
    valuees = postfixEquation.split(',');
    for (let i = 0; i < valuees.length; i++) {
      var tmpchr = valuees[i];
      if(!isNaN(Number(tmpchr))) {
        stack.push(tmpchr);
      } else {
        var no1 = stack.pop();
        var no2 = stack.pop();
        var no3 = '('+no2+tmpchr+no1+')';
        stack.push(no3);
      }
    }
    return stack.pop();
  }

  addBlanksInCanvasFormat(stringWithQuestion: string, canvasFormatQuestion: string) {

    let j = 0;
    var flag1 = false;
    for(let i = 0 ; i < stringWithQuestion.length; i++) {
      var c = stringWithQuestion.charAt(i);
      if(c === '(' || c === ')') {
        continue;
      }
      for( ; j < canvasFormatQuestion.length ; j++) {
        var d = canvasFormatQuestion.charAt(j);
        if(flag1) {
          if(!isNaN(Number(d))) {
            canvasFormatQuestion = canvasFormatQuestion.substr(0, j) + '' + canvasFormatQuestion.substr(j + 1);
            j--;
            continue;
          } else {
            flag1 = false;
            break;
          }
        }
        else if(d === '(' || d === ')') {
          continue;
        }
        else if(d === c) {
          j++;
          break;
        }
        else if(c === '?') {
          if(!isNaN(Number(d))) {
            flag1 = true;
            canvasFormatQuestion = canvasFormatQuestion.substr(0, j) + '?' + canvasFormatQuestion.substr(j + 1);
          } else {
            canvasFormatQuestion = canvasFormatQuestion.substr(0, j) + '?' + canvasFormatQuestion.substr(j + 1);
            j++;
            break;
          }
        }

      }
    }
    return canvasFormatQuestion;
  }

// for (let i = 0; i < valuees.length; i++) {
//   var tmpchr = valuees[i];
//   if(!isNaN(Number(tmpchr))) {
//     if(this.selectedValue.includes(i)) {
//       stack.push("?");;
//     } else {
//       stack.push(tmpchr);
//     }
//   } else {
//     if(this.selectedValue.includes(i)) {
//       var no1 = stack.pop();
//       var no2 = stack.pop();
//       var no3 = '('+no2+'?'+no1+')';
//     } else {
//       var no1 = stack.pop();
//       var no2 = stack.pop();
//       var no3 = '('+no2+tmpchr+no1+')';
//     }
//     stack.push(no3);
//   }
// }

  onNoClick(): void {
    this.dialogRef.close();
  }

  assignToEachStudent(assignmentId: string, questionId: string) {
    let userGrade = localStorage.getItem('userGrade');
    let studentList = []
    this.assignmentService.getAllStudents(userGrade).subscribe((studentList: any) => {
      console.log("starting for looooopppppp");
      for (var each = 0; each < studentList.length; each++) {
        console.log(studentList[each].email);
        this.questionService.addStudentQuestion(studentList[each].email, assignmentId, questionId).subscribe((data:any) => {
          return data;
        });
      }
    })
  }
}