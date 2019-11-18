/**
 * @project NumberNinja
 * @authors Sagar Khar, Abhinaw Sarang, Smit Shah
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response, XHRBackend } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';
import { async, inject } from '@angular/core/testing';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getAllUserData(): Observable<{}> {
    console.log("Inside client service.");
    return this.http.get(this.rootUrl + '/users/getalldata', {
      observe: 'body',
      params: new HttpParams()
    });
  }

  getAllExistingUsers(): Observable<{}> {
    console.log("Inside client service.");
    return this.http.get(this.rootUrl + '/users/getExistingData', {
      observe: 'body',
      params: new HttpParams()
    });
  }

  registerUser(user: User): Observable<{}> {
    const body: User = {
      userName: user.userName,
      password: user.password,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: null,
      grade: null
    };
    const reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return this.http.post(this.rootUrl + '/users/register', body, {headers: reqHeader });
  }

  addDelete(user : User) {
    const reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return this.http.post(this.rootUrl + '/users/addRole', user, {headers: reqHeader });
  }

  delete(user : User) {
    const reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return this.http.post(this.rootUrl + '/users/deleteUser', user, {headers: reqHeader });
  }

  userAuthentication(email, password): Observable<{}> {
    const body: any = {
      Email: email,
      Password: password
    };
    const reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return this.http.post(this.rootUrl + '/users/login', body, { headers: reqHeader });
  }

  validateToken(): Observable<{}> {
    return this.http.get(this.rootUrl + '/users/verifyToken', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('userToken'))
    });
  }
}