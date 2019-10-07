import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionService } from '../service/question-service';

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
    this.questionForm = this.formBuilder.group({
      id: [],
      formula: [this.data.formula, [Validators.required]],
      formulaType: [this.data.formulaType, [Validators.required]]
    })
  }
  onSubmit() {
    if (isNaN(this.data.ID)) {
      this.questionService.addQuestion(this.questionForm.value);
      this.dialogRef.close();
    } else {
      this.questionService.editQuestion(this.questionForm.value);
      this.dialogRef.close();
    }
  }

}
