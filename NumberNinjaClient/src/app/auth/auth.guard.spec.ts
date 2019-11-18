/**
 * @project NumberNinja
 * @authors Sukhpreet Singh Anand, Abhinaw Sarang
 */

import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { UserService } from '../shared/user.service';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('AuthGuard', () => {
  const mockRouter = new MockRouter();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, UserService, HttpClient, HttpHandler, {provide: Router, useValue: mockRouter}],
      imports: [
      ],
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
