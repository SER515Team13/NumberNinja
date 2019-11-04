import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute} from "@angular/router";
import { HttpService } from "../../shared/http.services";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../shared/user.service';
import { QuestionService } from '../service/question-service';
import { MatDialog } from '@angular/material';
import { QuestionComponent } from '../question/question.component';
import { Question } from '../model/question';
import { Location } from "@angular/common";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  
  private displayedColumns: String[] = ['question', 'questiontype', 'action'];
  private dataSource;
  private isPopupOpened = false;

  assignmentID: any;

  constructor(private location: Location, private dialog: MatDialog,
    private questionService: QuestionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.assignmentID = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  getData() {
    var userData = this.questionService.getQuestions(this.assignmentID).subscribe((data: any) => {
      if (data && data != undefined && data.length) {
        this.dataSource = new MatTableDataSource<Question>(data);
      }
    });
  }

  addQuestion() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(QuestionComponent, {
      data: this.assignmentID
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
      this.isPopupOpened = false;
    });
  }

  editQuestion(selectedQuestion: Question) {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(QuestionComponent, {
      data: selectedQuestion
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
      this.isPopupOpened = false;
    });
  }

  deleteQuestion(selectedQuestion: Question) {
    const data = this.dataSource.data;
    const index: number = data.indexOf(selectedQuestion);
    this.questionService.deleteQuestion(selectedQuestion.id).subscribe((abc : any) => {
      data.splice(index, 1);
      this.dataSource.data=data;
    });
  }

  goBack() {
    this.location.back();
  }
}
