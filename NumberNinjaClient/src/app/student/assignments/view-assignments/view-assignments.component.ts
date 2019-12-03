/**
 * @project NumberNinja
 * @authors Abhinaw Sarang, Saksham Jhawar
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from "../../../shared/http.services";
import { AssignmentServiceService } from '../../../student/service/assignment-service.service';
import { Assignment } from 'src/app/teacher/model/assignment';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-assignments',
  templateUrl: './view-assignments.component.html',
  styleUrls: ['./view-assignments.component.css']
})
export class ViewAssignmentsComponent implements OnInit {

  private displayedColumns: String[] = ['assignmentname', 'duedate', 'score', 'status'];
  private dataSource;
  private list = []
  private isPopupOpened: boolean = false;
  readonly rootUrl = 'http://localhost:3000';
  
  constructor(private dialog: MatDialog, private assignmentService: AssignmentServiceService,private router: Router) { }

  ngOnInit() {
    let grade = localStorage.getItem('userGrade');
    let email = localStorage.getItem('userEmail');
    this.assignmentService.getAssignmentStudent(grade, email)
    .pipe(flatMap((assignments: any) => assignments)).subscribe((assignment: any) => {
        console.log(assignment._id);
        this.assignmentService.getAssignmentStatus(assignment._id, email).subscribe((data:any) => {
          console.log(data.assignmentStatus)
          if (data.assignmentStatus) {
            assignment["status"] = "Complete"
          } else {
            assignment["status"] = "Incomplete"
          }
          this.list.push(assignment);
          this.dataSource = new MatTableDataSource<Assignment>(this.list);
        });
      });
  }

  // getStatus(assignmentName: string) {
  //   let email = localStorage.getItem('userEmail');
  //   this.assignmentService.getAssignmentStatus(assignmentName, email).subscribe((data1: any) => {
  //      if (data1.assignmentStatus) {
  //        return "Complete";
  //      } else {
  //        return "Incomplete";
  //      }
  //   });
  // }
}
