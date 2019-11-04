import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionService } from '../service/question-service';
import { isNull, isUndefined } from 'util';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public questionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<QuestionComponent>,
    private questionService: QuestionService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log("IDDDDDDDDDDDDDDDDD: " + this.data);
    this.questionForm = this.formBuilder.group({
      _id: [this.data._id],
      formula: [this.data.formula, [Validators.required]],
      formulaType: [this.data.formulaType, [Validators.required]],
      assignmentID: [this.data]
    })
  }
  onSubmit() {
    
    console.log("Question form: " + this.questionForm.value);
    if (isUndefined(this.data._id)) {
      this.questionService.addQuestion(this.questionForm.value).subscribe((data: any) => {
        console.log("Add question response" + data );
        if (data && data != undefined && data.length) {
          return data;
        }
    });
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

}
