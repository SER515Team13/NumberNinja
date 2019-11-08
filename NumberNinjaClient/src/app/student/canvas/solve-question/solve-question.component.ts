import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Operator } from './../models/operator.model';
import { OperatorService } from './../services/operator.service';

@Component({
  selector: 'app-solve-question',
  templateUrl: './solve-question.component.html',
  styleUrls: ['./solve-question.component.css']
})
export class SolveQuestionComponent implements OnInit {
  operators: Operator[] = [];
  slots: Operator[] = [];

  constructor(private operatorservice: OperatorService) { }

  drop (event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.operators, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  ngOnInit() {
    const operatorsObservable = this.operatorservice.getOperators();
    operatorsObservable.subscribe((operatorsData: Operator[]) => {
      this.operators = operatorsData;
    });
  }

}
