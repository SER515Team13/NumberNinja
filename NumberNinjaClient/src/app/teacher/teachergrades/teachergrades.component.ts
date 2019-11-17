import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { HttpService } from "../../../shared/http.services";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assignment } from '../../model/assignment';
import { AssignmentService } from '../../service/assignment.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-teachergrades',
  templateUrl: './teachergrades.component.html',
  styleUrls: ['./teachergrades.component.css']
})
export class TeachergradesComponent implements OnInit {
 
  private displayedColumns: String[] = ['studentname', 'marks', 'grade', 'action'];
  private dataSource;
  private isPopupOpened: boolean = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    // var userData = this.assignmentService.getAssignments().subscribe((data: any) => {
    //   if (data && data != undefined && data.length) {
    //     this.dataSource = new MatTableDataSource<Assignment>(data);
    //   }
    // });
  }

  // editAssignment(selectedassignment : Assignment) {
  //   console.log(selectedassignment);
  //   this.isPopupOpened = true;
  // }

  // deleteAssignment(selectedassignment : Assignment) {
  //   const data = this.dataSource.data;
  //   const index: number = data.indexOf(selectedassignment);
  //   this.assignmentService.deleteAssignment(selectedassignment.id).subscribe((abc : any) => {
  //     data.splice(index, 1);
  //     this.dataSource.data=data;
  //   })
  // }
}
