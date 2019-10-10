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

    getAssignments(): Observable<{}> {
        console.log("Calling assignments client service.");
        return this.http.get(this.rootUrl + '/assignments/getAssignments', {
        observe: 'body',
        params: new HttpParams()
        });
    }

    addAssignment(currentAssignment: Assignment) {
        this.assignmentList.push(currentAssignment);
    }

    editAssignment(currentAssignment: Assignment) {
        const index = this.assignmentList.findIndex(index => index.id === currentAssignment.id);
        this.assignmentList[index] = currentAssignment;
    }

    deleteAssignment(id: number) {
        const currentAssignment = this.assignmentList.findIndex(index => index.id === id);
        this.assignmentList.splice(currentAssignment, 1);
    }

    getAllQuestion() {
        return this.assignmentList;
    }
}