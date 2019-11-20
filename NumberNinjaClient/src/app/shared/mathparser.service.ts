import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MathparserService {

  constructor(private http: HttpClient) { }

  readonly rootUrl = 'http://localhost:3000';

  evaluateExpression(expression: string): Observable<{}> {
    const body : any = { data : expression};
    const reqHeader = new HttpHeaders({'No-Auth': 'True'});
    console.log("Inside expression evlaution service: " + expression);
    return this.http.post(this.rootUrl + '/questions/evaluateEquation', /*expression, { headers: reqHeader });*/body, {headers: reqHeader });
  }
}
