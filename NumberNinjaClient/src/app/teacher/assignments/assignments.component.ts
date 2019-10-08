import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { HttpService } from "../../shared/http.services";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../shared/user.service';
import { Assignment } from '../../shared/assignment';


const ELEMENT_DATA: Assignment[] = [
  { assignmentname: 'Design Pattern', duedate: '10-10-2019', grade: 'Second', id:0},
  { assignmentname: 'Mathematical Induction', duedate: '10-11-2019', grade: 'Seventh', id:1}
];

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})

export class AssignmentsComponent implements OnInit {

  private displayedColumns: String[] = ['assignmentname', 'duedate', 'grade', 'action'];
  private dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor() { }

  ngOnInit() {
  }

  public editbutton(selectedassignment : Assignment){
  
  }

  public deletebutton(selectedassignment : Assignment){
    const data = this.dataSource.data;
    const index: number = data.indexOf(selectedassignment);
    data.splice(index, 1);
    this.dataSource.data=data;
  }

}
