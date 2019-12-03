/**
 * @project NumberNinja
 * @authors Sukhpreet Singh Anand, Abhinaw Sarang
 */

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

  getQuestions(assignmentId: any, email: string): Observable<{}> {
    console.log("calling questions client service.");
    return this.http.get(this.rootUrl + '/questions/getquestions', {
      observe: 'body',
      params: new HttpParams().append('id', assignmentId).append('email', email)
    });
  }

  getQuestionCanvas(id: any, email: any): Observable<{}> {
    console.log("Fetching question using questionID and email.");
    return this.http.get(this.rootUrl + '/questions/getquestionscanvas', {
      observe: 'body',
      params: new HttpParams().append('id', id).append('email', email)
    });
  }

  submitSolutionCanvas(id: any, email: any, isCorrect: any): Observable<{}> {
    console.log("Storing question solution");
    return this.http.get(this.rootUrl + '/questions/submitsolution', {
      observe: 'body',
      params: new HttpParams().append('id', id).append('email', email).append('isCorrect', isCorrect)
    });
  }

  saveCanvasHistory(id: any, email: any, history: any): Observable<{}> {
    console.log("Saving question history");
    return this.http.get(this.rootUrl + '/questions/saveCanvasHistory', {
      observe: 'body',
      params: new HttpParams().append('id', id).append('email', email).append('history', history)
    });
  }

  getAllQuestion() {
    return this.questionList;
  }
}
