/**
 * @project NumberNinja
 * @authors Sukhpreet Singh Anand, Abhinaw Sarang
 */

import { QuestionService } from './question-service';
import { TestBed, inject } from '@angular/core/testing';
import { TeacherToolbarComponent } from './../../toolbars/teachertoolbar/teachertoolbar.component';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';

describe('QuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionService, HttpClient, HttpHandler],
      declarations: [ TeacherToolbarComponent ],
    });
  });

  it('should be created', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();
  }));
});