/**
 * @project NumberNinja
 * @authors Sukhpreet Singh Anand, Abhinaw Sarang
 */

import { TestBed } from '@angular/core/testing';
import { AssignmentServiceService } from './assignment-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AssignmentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: AssignmentServiceService = TestBed.get(AssignmentServiceService);
    expect(service).toBeTruthy();
  });
});
