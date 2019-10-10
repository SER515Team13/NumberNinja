import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { HttpService } from "../../shared/http.services";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assignment } from '../model/assignment';
import { AssignmentService } from '../service/assignment.service';


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})

export class AssignmentsComponent implements OnInit {

  private displayedColumns: String[] = ['id', 'assignmentname', 'duedate', 'grade', 'action'];
  private dataSource;
  //private responseFromAPi;
  constructor(public AssignmentService:AssignmentService) { }

  ngOnInit() {
    console.log('Inside the assignment component');
    var userData = this.AssignmentService.getAssignments().subscribe((data: any) => {
      console.log("Testing:" + data +".");
      if (data && data != undefined && data.length) {
        console.log("Inside");
        this.dataSource = new MatTableDataSource<Assignment>(data);
      }
    });
   // console.log("Testing 2:" + userData);
    //this.responseFromAPi = userData;
  
  }
  readonly rootUrl = 'http://localhost:3000';

  public editbutton(selectedassignment : Assignment){
  
  }

  public deletebutton(selectedassignment : Assignment) {
    console.log('hello!2333' + selectedassignment.id);
    const data = this.dataSource.data;
    const index: number = data.indexOf(selectedassignment);
    this.AssignmentService.deleteAssignment(selectedassignment.id).subscribe((abc : any) => {
      data.splice(index, 1);
      this.dataSource.data=data;
    }
    )
  }

}
