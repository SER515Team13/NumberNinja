import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { HttpService } from "../../../shared/http.services";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assignment } from '../../model/assignment';
import { AssignmentService } from '../../service/assignment.service';
import { AddAssignmentComponent } from '../add-assignment/add-assignment.component'
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})

export class AssignmentsComponent implements OnInit {

  private displayedColumns: String[] = ['assignmentname', 'duedate', 'grade', 'action'];
  private dataSource;
  private isPopupOpened: boolean = false;
  readonly rootUrl = 'http://localhost:3000';

  constructor(private dialog?: MatDialog, private assignmentService?:AssignmentService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    console.log('Inside the assignment component');
    var userData = this.assignmentService.getAssignments().subscribe((data: any) => {
      if (data && data != undefined && data.length) {
        this.dataSource = new MatTableDataSource<Assignment>(data);
      }
    });
  }

  addAssignment() {
    console.log("Inside addAssignment() function.");
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(AddAssignmentComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
      this.isPopupOpened = false;
    });
  }

  editAssignment(selectedassignment : Assignment) {
    console.log(selectedassignment);
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(AddAssignmentComponent, {
      data: selectedassignment
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
      this.isPopupOpened = false;
    });
  }

  deleteAssignment(selectedassignment : Assignment) {
    const data = this.dataSource.data;
    const index: number = data.indexOf(selectedassignment);
    this.assignmentService.deleteAssignment(selectedassignment.id).subscribe((abc : any) => {
      data.splice(index, 1);
      this.dataSource.data=data;
    })
  }

  public openassignment(selectedassignment : Assignment){
    console.log('inside open assignment function' + selectedassignment);
    //const data = this.dataSource.data;
    this.assignmentService.describeassignment(selectedassignment).subscribe((def : any)=>{
    })
  }
}
