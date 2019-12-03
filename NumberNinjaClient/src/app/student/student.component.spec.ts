/**
 * @project NumberNinja
 * @authors Sukhpreet Singh Anand, Saksham Jhawar
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentComponent } from './student.component';
import { StudentToolbarComponent } from './../toolbars/studenttoolbar/studenttoolbar.component';
import { ViewAssignmentsComponent } from './assignments/view-assignments/view-assignments.component';
import { MatTableModule, MatDialogModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatTableModule,
        MatDialogModule,
        HttpClientTestingModule, 
        RouterTestingModule
      ],
      declarations: [ 
        StudentComponent,
        StudentToolbarComponent,
        ViewAssignmentsComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
