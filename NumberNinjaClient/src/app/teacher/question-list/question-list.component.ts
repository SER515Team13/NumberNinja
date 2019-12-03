/**
 * @project NumberNinja
 * @authors Abhinaw Sarang, Sagar Khar
 */

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute} from "@angular/router";
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
        for (var each = 0; each < data.length; each++) {
          console.log(data[each].isSolved)
            if (data[each].isSolved) {
              data[each]["status"] = "Complete";
            } else {
              data[each]["status"] = "Incomplete";
            }
            if (data[each].formulaWithBlanks==null) {
              data[each].formulaWithBlanks = "Choose the correct answer for ".concat(data[each].formula.split('=')[0]);
            }
            else{
              data[each].formulaWithBlanks = "Fill in the blank in equation ".concat(data[each].formulaWithBlanks.replace(/\?/g, " _____ "));
            }
         }
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

  deleteQuestion(selectedQuestion: any) {
    const data = this.dataSource.data;
    const index: number = data.indexOf(selectedQuestion);
    console.log(selectedQuestion)
    this.questionService.deleteQuestion(selectedQuestion._id).subscribe((abc : any) => {
      data.splice(index, 1);
      this.dataSource.data=data;
    });
  }

  goBack() {
    this.location.back();
  }
}
