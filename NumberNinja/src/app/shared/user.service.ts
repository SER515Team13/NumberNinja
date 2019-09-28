import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<{}> {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + '/users/register', body,{headers:reqHeader });
  }

  userAuthentication(email, password): Observable<{}> {
    const body: any = {
      Email: email,
      Password: password
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True' });
    return this.http.post(this.rootUrl + '/users/login', body, { headers: reqHeader });
  }

  validateToken(): Observable<{}> {
    return this.http.get(this.rootUrl + '/users/verifyToken', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('userToken'))
    });
  }

}