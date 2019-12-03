/**
 * @project NumberNinja
 * @author Sukhpreet Singh Anand, Abhinaw Sarang
 */

import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { QuestionServiceService } from './question-service.service';

describe('QuestionServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionServiceService, HttpClient, HttpHandler]
    });
  });

  it('should be created', () => {
    const service: QuestionServiceService = TestBed.get(QuestionServiceService);
    expect(service).toBeTruthy();
  });
});
