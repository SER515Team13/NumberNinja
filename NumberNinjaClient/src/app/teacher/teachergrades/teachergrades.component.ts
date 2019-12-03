/**
 * @project NumberNinja
 * @author Sagar Khar
 */
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

    this.assignmentService.getTotalQuestions(this.assignment).subscribe((data: any) => {
      this.totalQuestions = data[0].totalQues;
      console.log(data);
    });


    this.assignmentService.getAssignmentGrades(this.assignment)
    .pipe(flatMap((allgrades: any) => allgrades)).subscribe((grade: any) => {

      console.log(grade,"before the issue");
      this.assignmentService.studentAssignmentGrade(grade._id.studentEmail, this.assignment).subscribe((data:any) => {
          grade["assignedGrade"] = data[0].gradeReceived;
        if(grade._id.isCorrect == true && grade.correctAns == this.totalQuestions)
          this.list.push(grade);
        else if (grade._id.isCorrect == false)
          this.list.push(grade);
        this.dataSource = new MatTableDataSource(this.list);
      });
    });
    // .subscribe((data: any) => {
    //   this.dataSource = new MatTableDataSource(data)
    //   console.log(data)


  }

  calc(totalQuestions : number,falseAns : number,answer : boolean){
    if(answer)
    {
      return falseAns;
    }
    else {
      return totalQuestions - falseAns;
    }
  }

  updateGrade(element: any){
    this.assignmentService.updateAssignedGrade(this.assignment, element).subscribe((data: any) => {
      console.log(data);
    })
  }

  showrow(row : any){
    console.log(row, "-- this is the row");
  }
}
