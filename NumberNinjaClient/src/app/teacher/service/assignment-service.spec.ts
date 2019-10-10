import { AssignmentService } from './assignment-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

describe('AssignmentService', () => {
    it('should create an instance', () => {
        var http: HttpClient;
        expect(new AssignmentService(http)).toBeTruthy();
    });
});