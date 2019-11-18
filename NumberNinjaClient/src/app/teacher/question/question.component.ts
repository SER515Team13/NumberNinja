/**
 * @project NumberNinja
 * @authors Sukhpreet Singh Anand, Abhinaw Sarang, Smit Shah
 */

import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionService } from '../service/question-service';
import { isNull, isUndefined } from 'util';
import { Question } from '../model/question';

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

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<QuestionComponent>,
    private questionService: QuestionService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  ngOnInit() {
    console.log("IDDDDDDDDDDDDDDDDD: " + this.data);
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
    if (isUndefined(this.data._id)) {
      let question = new Question;
      question.formula= this.questionForm.value.formula.replace(/\s/g, "");
      question.formulaType = this.questionForm.value.formulaType;
      question.assignmentID= this.data;
      if(this.questionForm.value.formulaType == 'Fill in the Blanks') {
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
      }
      if(this.questionForm.value.formulaType == 'Find the Answer') {
        question.answers = [];
        question.answers.push(this.questionForm.value.formula1)
        question.answers.push(this.questionForm.value.formula2);
        question.answers.push(this.questionForm.value.formula3);
        question.answers.push(this.questionForm.value.formula4);
        question.formulaWithBlanks = null;
      }
      this.questionService.addQuestion(question).subscribe((data: any) => {
        console.log("Add question response" + data );
        if (data && data != undefined && data.length) {
          return data;
        }
    });
      console.log(this.selectedValue);
      this.dialogRef.close();
    } else {
      console.log("Question form" + this.questionForm.value);
      this.questionService.editQuestion(this.questionForm.value).subscribe((data: any) => {
        console.log("Edit question response" + data );
        if (data && data != undefined && data.length) {
          return data;
        }
    });
      this.dialogRef.close();
    }
  }

  myFunc() {
    this.digitsArray = this.questionForm.value.formula.match(this.regexOp1);
    this.selectedValue = [];
    console.log(this.digitsArray);
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

  onNoClick(): void {
    this.dialogRef.close();
  }
}