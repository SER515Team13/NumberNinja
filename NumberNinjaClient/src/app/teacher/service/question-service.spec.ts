import { QuestionService } from './question-service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';


describe('QuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();
  }));
});
