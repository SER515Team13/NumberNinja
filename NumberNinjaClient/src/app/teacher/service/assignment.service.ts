import { Injectable } from '@angular/core';
import { Assignment } from '../model/assignment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response, XHRBackend } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { async, inject } from '@angular/core/testing';


@Injectable()
export class AssignmentService {

    readonly rootUrl = 'http://localhost:3000';
    assignmentList: Assignment[] = [];

    constructor(private http: HttpClient) { }

    getAssignments(email: string): Observable<{}> {
        console.log("Calling assignments client service.");
        return this.http.get(this.rootUrl + '/assignments/getassignments', {
        observe: 'body',
        params: new HttpParams().append('email', email)
        });
    }

    addAssignment(currentAssignment: Assignment, email: string): Observable<{}> {
        console.log("Sending request to server to Add assignment");
        const reqHeader = new HttpHeaders({'No-Auth': 'True'}).append('email', email);
        const params = new HttpParams().append('email', email);
        return this.http.post(this.rootUrl + '/assignments/addassignment', currentAssignment, { headers: reqHeader, params: params });
    }

    editAssignment(currentAssignment: Assignment): Observable<{}> {
        console.log("Sending request to server to Edit assignment");
        const reqHeader = new HttpHeaders({'No-Auth': 'True'});
        return this.http.post(this.rootUrl + '/assignments/editassignment', currentAssignment, { headers: reqHeader });
    }

    deleteAssignment(id: string): Observable<{}> {
        const body : any = { Id : id};
        const reqHeader = new HttpHeaders({'No-Auth': 'True'});
        return this.http.post(this.rootUrl + '/assignments/deleterow', body, {headers: reqHeader });
    }
    
    describeAssignment(currentAssignment : Assignment) {
        const body : any ={ currentAssignment};
        const reqHeader = new HttpHeaders({'No-Auth': 'True'});
        return this.http.post(this.rootUrl +'/assignments/clickassignment', body, {headers : reqHeader});
    }
}