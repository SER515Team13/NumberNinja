import { Injectable } from '@angular/core';
import { Question } from '../model/question';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  questionList: Question[] = [];

  constructor(private http: HttpClient) { }

  readonly rootUrl = 'http://localhost:3000';

  getQuestions(id: any, email: string): Observable<{}> {
    console.log("calling questions client service.");
    return this.http.get(this.rootUrl + '/questions/getquestions', {
      observe: 'body',
      params: new HttpParams().append('id', id).append('email', email)
    });
  }

  getAllQuestion() {
    return this.questionList;
  }
}
