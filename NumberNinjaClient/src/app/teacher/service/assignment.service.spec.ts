/**
 * @project NumberNinja
 * @authors Saksham Jhawar, Abhinaw Sarang
 */

import { TestBed } from '@angular/core/testing';
import { AssignmentService } from './assignment.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AssignmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [AssignmentService, HttpClient, HttpHandler]
  }));

  it('should be created', () => {
    const service: AssignmentService = TestBed.get(AssignmentService);
    expect(service).toBeTruthy();
  });
});
