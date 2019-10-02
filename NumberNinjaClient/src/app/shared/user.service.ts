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
    const body = {};
    const reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return this.http.post(this.rootUrl + '/users/getalldata', body, {headers: reqHeader });
    // var response;
    /*
    let promise = this.http.get(this.rootUrl + '/users/getalldata');
    console.log("in service layer");
    return new Promise(resolve=>{
      this.http.get(this.rootUrl + '/users/getalldata')
      //  .take(1) //useful if you need the data once and don't want to manually cancel the subscription again
       .subscribe(
          (data:any) => {
              console.log(data);
              resolve(data);
       })
    
  })*/

  }

  registerUser(user: User): Observable<{}> {
    const body: User = {
      userName: user.userName,
      password: user.password,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };
    const reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return this.http.post(this.rootUrl + '/users/register', body, {headers: reqHeader });
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
