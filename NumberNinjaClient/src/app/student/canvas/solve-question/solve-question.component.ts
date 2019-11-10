import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-solve-question',
  templateUrl: './solve-question.component.html',
  styleUrls: ['./solve-question.component.css']
})
export class SolveQuestionComponent implements OnInit {

  ngOnInit() {}
  operator = ['+', '-', 'X', '/'];
  operands = ['0','1','2','3','4','5','6','7','8','9']
  even = ['='];

  drop(event: CdkDragDrop<string[]>) {
    if (1) 
      //moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
  }
}