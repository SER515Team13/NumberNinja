/**
 * @project NumberNinja
 * @authors Sukhpreet Singh Anand, Saksham Jhawar, Abhinaw Sarang, Sagar Khar
 */

import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Assignment } from '../model/assignment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

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
        const params = new HttpParams().append('assignmentId', id);
        return this.http.post(this.rootUrl + '/assignments/deleterow', body, {headers: reqHeader, params:params });
    }
    
    describeAssignment(currentAssignment : Assignment) {
        const body : any ={ currentAssignment};
        const reqHeader = new HttpHeaders({'No-Auth': 'True'});
        return this.http.post(this.rootUrl +'/assignments/clickassignment', body, {headers : reqHeader});
    }

    getAssignmentGrades(assignmentId: string): Observable<{}> {
        console.log("Calling assignments-status service.");
        return this.http.get(this.rootUrl + '/assignments/getassignmentsgrade', {
          observe: 'body',
          params: new HttpParams().append('aId', assignmentId)
        });
      }

      studentAssignmentGrade(email: string, assignment: string): Observable<{}> {
        console.log("Sending request to Add assignment for each students");
        return this.http.get(this.rootUrl + '/assignments/getgrade',{
                observe: 'body',
                params: new HttpParams().append('studentEmail', email).append('assignmentId', assignment)
                });
    }


      getTotalQuestions(assignmentId: string): Observable<{}> {
        console.log("Calling assignment questions.");
        return this.http.get(this.rootUrl + '/questions/gettotalquestions', {
          observe: 'body',
          params: new HttpParams().append('aId', assignmentId)
        });
      } 

    getAllStudents(userGrade: string) {
        const reqHeader = new HttpHeaders({'No-Auth': 'True'});
        return this.http.get(this.rootUrl +'/assignments/getAllStudents',{
            observe: 'body',
            params: new HttpParams().append('userGrade', userGrade)
        });
    }

    addStudentAssignment(email: string, assignmentId: string): Observable<{}> {
        console.log("Sending request to Add assignment for each students");
        const body : any ={};
        const reqHeader = new HttpHeaders({'No-Auth': 'True'}).append('email', email)
        const params = new HttpParams().append('email', email).append('assignmentId', assignmentId);
        return this.http.post(this.rootUrl + '/assignments/addStudentAssignment', body, { headers: reqHeader, params: params });
    }

    updateAssignedGrade(assignment: string , element: any) {
        const body : any = { 
            Element : element,
            AssignmentId: assignment
         };
         console.log("calling server now")
        const reqHeader = new HttpHeaders({'No-Auth': 'True'});
        return this.http.post(this.rootUrl + '/assignments/upgradegrades', body, {headers : reqHeader});

    }
}