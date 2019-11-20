/**
 * @project NumberNinja
 * @authors Sukhpreet Singh Anand, Abhinaw Sarang
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TeacherComponent } from './teacher.component';
import { TeacherToolbarComponent } from './../toolbars/teachertoolbar/teachertoolbar.component';
import {QuestionListComponent} from './question-list/question-list.component';
import { MatDialog, MatCardModule, MatIcon, MatIconModule, MatToolbarModule, MatTableModule, MatDialogModule } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignmentsComponent } from './assignments/view-assignments/assignments.component';
import { AssignmentService } from './service/assignment.service';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TeacherComponent', () => {
  let component: TeacherComponent;
  let fixture: ComponentFixture<TeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatIconModule,
        MatToolbarModule,
        MatTableModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        HttpClientTestingModule
      ],
      declarations: [ 
        TeacherComponent,
        TeacherToolbarComponent,
        QuestionListComponent,
        AssignmentsComponent
      ],
      providers: [AssignmentService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});