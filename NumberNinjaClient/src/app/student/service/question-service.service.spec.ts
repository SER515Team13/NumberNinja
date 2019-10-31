import { TestBed } from '@angular/core/testing';

import { QuestionServiceService } from './question-service.service';

describe('QuestionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionServiceService = TestBed.get(QuestionServiceService);
    expect(service).toBeTruthy();
  });
});
