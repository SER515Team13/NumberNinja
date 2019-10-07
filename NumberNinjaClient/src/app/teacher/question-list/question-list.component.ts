import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question-service';
import { MatDialog } from '@angular/material';
import { QuestionComponent } from '../question/question.component';
import { Question } from '../model/question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  isPopupOpened = false;

  constructor(private dialog?: MatDialog,
    private questionService?: QuestionService) { }

  ngOnInit() {
  }

  get QuestionList() {
    return this.questionService.getAllQuestion();
  }

  addQuestion() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(QuestionComponent, {
      data: {}
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

  editQuestion(question: Question) {
    this.isPopupOpened = true;
    const currentQuestion = this.questionService.getAllQuestion().find(index => index.id === question.id);
    const dialogRef = this.dialog.open(QuestionComponent, {
      data: currentQuestion
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

  deleteQuestion(id: number) {
    this.questionService.deleteQuestion(id);
  }
}
