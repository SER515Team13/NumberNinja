import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { HttpService } from "../../shared/http.services";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assignment } from '../model/assignment';
import { AssignmentService } from '../service/assignment.service';
import { MatDialog } from '@angular/material';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-teachergrades',
  templateUrl: './teachergrades.component.html',
  styleUrls: ['./teachergrades.component.css']
})
export class TeachergradesComponent implements OnInit {
 
  private displayedColumns: String[] = ['studentname', 'marks', 'grade', 'action'];
  private dataSource;
  private list = [];
  private assignmentData = [];
  private isPopupOpened: boolean = false;
  private assignment;
  private totalQuestions;

  constructor(private dialog: MatDialog, private assignmentService: AssignmentService) { }

  ngOnInit() {
    this.getAssignmentData();
  }

  getAssignmentData() {
    this.assignmentService.getAssignments(localStorage.getItem('userEmail')).subscribe((data: any) => { 
      this.assignmentData = data;
      console.log(this.assignmentData)
     });
  }

  onSelectAssignment() {
    this.list = []
    this.assignmentService.getAssignmentGrades(this.assignment)
    .pipe(flatMap((allgrades: any) => allgrades)).subscribe((grade: any) => {
      console.log(grade._id,"belore the issue");
      console.log(this.assignment," is correct")
      this.assignmentService.studentAssignmentGrade(grade._id.studentEmail, this.assignment).subscribe((data:any) => {
        console.log(data)
          grade["assignedGrade"] = data[0].gradeReceived;
        this.list.push(grade);
        this.dataSource = new MatTableDataSource(this.list);
      });
    });
    // .subscribe((data: any) => {
    //   this.dataSource = new MatTableDataSource(data)
    //   console.log(data)

    this.assignmentService.getTotalQuestions(this.assignment).subscribe((data: any) => {
      this.totalQuestions = data[0].totalQues;
      console.log(data)
    })
  }

  calc(totalQuestions : number,falseAns : number){
    return totalQuestions - falseAns;
  }

  updateGrade(element: any){
    this.assignmentService.updateAssignedGrade(this.assignment, element).subscribe((data: any) => {
      console.log(data);
    })
  }
}
