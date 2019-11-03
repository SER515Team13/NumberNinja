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

  // private regex: RegExp = /\d+/g;
  // private regexOp: RegExp = /(\+|\-|\(|\)|\*|\^|\/|√)/g;
  private regexOp1: RegExp = /(\d+)|(\+|\-|\(|\)|\*|\^|\/|√)|(\=)/gm;
  public questionForm: FormGroup;
  private digitsArray = [];
  private selectedValue : Array<number>;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<QuestionComponent>,
    private questionService: QuestionService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  ngOnInit() {
    this.questionForm = this.formBuilder.group({
      _id: [this.data._id],
      formula: [this.data.formula, [Validators.required]],
      formulaType: [this.data.formulaType, [Validators.required]]
    })
  }
  onSubmit() {
    //console.log("Data Id" + this.data._id);
    if (isUndefined(this.data._id)) {
      let question = new Question;
      question.formula= this.questionForm.value.formula.replace(/\s/g, "");;
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
      console.log(stringWithQuestions);
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
    this.selectedValue.push(i);
  }

}
