import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from "../../../shared/http.services";
import { AssignmentService } from '../../../teacher/service/assignment.service';
import { Assignment } from 'src/app/teacher/model/assignment';



@Component({
  selector: 'app-view-assignments',
  templateUrl: './view-assignments.component.html',
  styleUrls: ['./view-assignments.component.css']
})
export class ViewAssignmentsComponent implements OnInit {

  private displayedColumns: String[] = ['assignmentname', 'duedate', 'score', 'status'];
  private dataSource;
  private isPopupOpened: boolean = false;
  readonly rootUrl = 'http://localhost:3000';
  
  constructor(private dialog?: MatDialog, private assignmentService?:AssignmentService) { }

  ngOnInit() {
    let grade= localStorage.getItem('userGrade');
    let email= localStorage.getItem('userEmail');
    this.assignmentService.getAssignmentStudent(grade, email).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<Assignment>(data);
    })}


}
