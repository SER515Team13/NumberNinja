import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { QuestionServiceService } from '../../service/question-service.service';
import { Question } from '../../model/question';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  private displayedColumns: String[] = ['id', 'question', 'questiontype'];
  private dataSource;

  constructor(private questionService?: QuestionServiceService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.questionService.getQuestions().subscribe((data: any) => {
      console.log("Testing:" + data +".");
      if (data && data != undefined && data.length) {
        console.log("Inside");
        this.dataSource = new MatTableDataSource<Question>(data);
      }
    });
  }
}
