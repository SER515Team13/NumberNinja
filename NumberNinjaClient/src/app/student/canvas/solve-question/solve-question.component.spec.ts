/**
 * @project NumberNinja
 * @author Sukhpreet Singh Anand
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentToolbarComponent } from 'src/app/toolbars/studenttoolbar/studenttoolbar.component';
import { SolveQuestionComponent } from './solve-question.component';
declare var Blockly: any;

describe('SolveQuestionComponent', () => {
  let component: SolveQuestionComponent;
  let fixture: ComponentFixture<SolveQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ SolveQuestionComponent, StudentToolbarComponent, Blockly ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ HttpClient, HttpHandler ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});