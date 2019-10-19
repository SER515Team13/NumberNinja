import { TestBed } from '@angular/core/testing';
import { QuestionService } from './question-service';

describe('QuestionService', () => {
  it('should create an instance', () => {
    const service: QuestionService = TestBed.get(QuestionService);
    expect(service).toBeTruthy();
  });
});
