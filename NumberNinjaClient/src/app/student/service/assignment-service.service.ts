/**
 * @project NumberNinja
 * @authors Sukhpreet Singh Anand, Abhinaw Sarang
 */

import { Injectable } from '@angular/core';
import { Assignment } from '../model/assignment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentServiceService {

  readonly rootUrl = 'http://localhost:3000';
  assignmentList: Assignment[] = [];

  constructor(private http: HttpClient) { }

  getAssignments(): Observable<{}> {
    console.log("Calling assignments client service.");
    return this.http.get(this.rootUrl + '/assignments/getassignments', {
    observe: 'body',
    params: new HttpParams()
    });
  }

  addAssignment(currentAssignment: Assignment): Observable<{}> {
      console.log("Sending request to server to Add assignment");
      const reqHeader = new HttpHeaders({'No-Auth': 'True'});
      return this.http.post(this.rootUrl + '/assignments/addassignment', currentAssignment, { headers: reqHeader });
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

  getAssignmentStudent(grade: string, email: string): Observable<{}> {
      console.log("Calling student assignments service.");
      /*const body: any = {grade : grade, email: email}
      const reqHeader = new HttpHeaders({'No-Auth': 'True'});
      return this.http.post(this.rootUrl + '/assignments/getassignments-student', body, {headers : reqHeader});*/
      return this.http.get(this.rootUrl + '/assignments/getassignments-student', {
        observe: 'body',
        params: new HttpParams().append('grade', grade).append('email', email)
      });
  }
  getAssignmentStatus(assignmentId: string, email: string): Observable<{}> {
    console.log("Calling assignments-status service.");
    /*const body: any = {grade : grade, email: email}
    const reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return this.http.post(this.rootUrl + '/assignments/getassignments-student', body, {headers : reqHeader});*/
    return this.http.get(this.rootUrl + '/assignments/getassignments-status', {
      observe: 'body',
      params: new HttpParams().append('aId', assignmentId).append('sEmail', email)
    });
} 
}
