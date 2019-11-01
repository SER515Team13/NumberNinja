import { TestBed } from '@angular/core/testing';

import { AssignmentServiceService } from './assignment-service.service';

describe('AssignmentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignmentServiceService = TestBed.get(AssignmentServiceService);
    expect(service).toBeTruthy();
  });
});
