import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { MathparserService } from './mathparser.service';

describe('MathparserService', () => {
  beforeEach(() => { 
    TestBed.configureTestingModule({
      providers: [ HttpClient, HttpHandler ],
    });
  });

  it('should be created', () => {
    const service: MathparserService = TestBed.get(MathparserService);
    expect(service).toBeTruthy();
  });
});