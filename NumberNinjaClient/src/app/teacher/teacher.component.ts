/**
 * @project NumberNinja
 * @authors Sukhpreet Singh Anand, Saksham Jhawar
 */

import { Component, OnInit } from '@angular/core';
import { AssignmentsComponent} from './assignments/view-assignments/assignments.component'

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
