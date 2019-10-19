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
        return this.http.get(this.rootUrl + '/questions/getquestions', {
        observe: 'body',
        params: new HttpParams()
        });
    }

    addQuestion(currentQuestion: Question): Observable<{}> {
        console.log("Sending request to server to Add question");
        const reqHeader = new HttpHeaders({'No-Auth': 'True'});
        return this.http.post(this.rootUrl + '/questions/addquestion', currentQuestion, { headers: reqHeader });
    }

    editQuestion(currentQuestion: Question): Observable<{}>  {
        console.log("Sending request to server to Edit question");
        const reqHeader = new HttpHeaders({'No-Auth': 'True'});
        return this.http.post(this.rootUrl + '/questions/editquestion', currentQuestion, { headers: reqHeader });
    }

    deleteQuestion(id: string) {
        const currentQuestion = this.questionList.findIndex(index => index._id === id);
        this.questionList.splice(currentQuestion, 1);
    }

    getAllQuestion() {
        return this.questionList;
    }
}
