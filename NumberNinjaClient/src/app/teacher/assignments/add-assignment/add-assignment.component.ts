import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentService } from '../../service/assignment.service';
import { isNull, isUndefined } from 'util';
import { Pipe, PipeTransform } from '@angular/core'

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {

  public addAssignmentForm: FormGroup;
  private currentDate = new Date();
  private allowedGrades: number[] = [2, 7];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddAssignmentComponent>,
    private assignmentService: AssignmentService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    //this.currentDate = new Date();
    console.log(this.currentDate);
    this.addAssignmentForm = this.formBuilder.group({
      _id: [this.data._id],
      name: [this.data.name, [Validators.required]],
      description: [this.data.description, [Validators.required]],
      duedate: [this.data.duedate, [Validators.required]],
      grade: [localStorage.getItem('userGrade'), [Validators.required]],
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (isUndefined(this.data._id)) {
      this.assignmentService.addAssignment(this.addAssignmentForm.value).subscribe((data: any) => {
        console.log("Add assignment response" + data );
        if (data && data != undefined && data.length) {
          return data;
        }
      });
      this.dialogRef.close();
    } else {
      console.log("Add assignment form" + this.addAssignmentForm.value);
      this.assignmentService.editAssignment(this.addAssignmentForm.value).subscribe((data: any) => {
        console.log("Edit question response" + data );
        if (data && data != undefined && data.length) {
          return data;
        }
      });
      this.dialogRef.close();
    }
  }

}
