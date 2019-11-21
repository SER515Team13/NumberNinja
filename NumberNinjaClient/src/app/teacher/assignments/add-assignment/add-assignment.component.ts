/**
 * @project NumberNinja
 * @authors Sukhpreet Singh Anand, Saksham Jhawar, Abhinaw Sarang
 */

import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentService } from '../../service/assignment.service';
import { isNull, isUndefined } from 'util';
//import { Pipe, PipeTransform } from '@angular/core'
import { flatMap } from 'rxjs/operators';

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
      let email = localStorage.getItem('userEmail');
      console.log(email);
      this.assignmentService.addAssignment(this.addAssignmentForm.value, email).subscribe((data: any) => {
        console.log("Add assignment response" + data._id );
        if (data._id != null) {
          console.log("calling assignToEachStudent==========")
          this.assignToEachStudent(data._id);
          return data;
        }
      });
      this.dialogRef.close();
    } else {
      console.log("Add assignment form" + this.addAssignmentForm.value);
      this.assignmentService.editAssignment(this.addAssignmentForm.value).subscribe((data: any) => {
        console.log("Edit question response" + data );
        if (data && data != undefined && data.length) {
          // Doesn't required any update in student-assignment mapping.
          return data;
        }
      });
      this.dialogRef.close();
    }
  }

  assignToEachStudent(assignId: string) {
    let userGrade = localStorage.getItem('userGrade');
    let studentList = []
    this.assignmentService.getAllStudents(userGrade).subscribe((studentList: any) => {
      console.log("starting for looooopppppp");
      for (var each = 0; each < studentList.length; each++) {
        console.log(studentList[each].email);
        this.assignmentService.addStudentAssignment(studentList[each].email, assignId).subscribe((data:any) => {
          return data;
        });
      }
    })
  }

}
