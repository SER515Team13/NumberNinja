import { Injectable } from '@angular/core';
import { Question } from '../model/question';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response, XHRBackend } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { async, inject } from '@angular/core/testing';


@Injectable()
export class QuestionService {

    questionList: Question[] = [];

    constructor(private http: HttpClient) { }

  readonly rootUrl = 'http://localhost:3000';

  getQuestions(): Observable<{}> {
    console.log("calling questions client service.");
    return this.http.get(this.rootUrl + '/questions/getQuestions', {
      observe: 'body',
      params: new HttpParams()
    });
  }

    addQuestion(currentQuestion: Question) {
        this.questionList.push(currentQuestion);
    }

    deleteQuestion(id: number) {
        const currentQuestion = this.questionList.findIndex(index => index.id = id);
        this.questionList.splice(currentQuestion, 1);
    }

    getAllQuestion() {
        return this.questionList;
    }
}
