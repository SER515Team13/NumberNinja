/**
 * @project NumberNinja
 * @authors Sukhpreet Singh Anand, Abhinaw Sarang, Sagar Khar, Smit Shah
 */

import { Injectable } from '@angular/core';
import { Question } from '../model/question';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionService {

    questionList: Question[] = [];

    constructor(private http: HttpClient) { }

    readonly rootUrl = 'http://localhost:3000';

    getQuestions(id: any): Observable<{}> {
        console.log("calling questions client service.");
        return this.http.get(this.rootUrl + '/questions/getquestions', {
            observe: 'body',
            params: new HttpParams().append('id', id)
        });
    }

    addQuestion(currentQuestion: Question): Observable<{}> {
        console.log("Sending request to server to Add question");
        console.log(currentQuestion);
        const reqHeader = new HttpHeaders({'No-Auth': 'True'});
        return this.http.post(this.rootUrl + '/questions/addquestion', currentQuestion, { headers: reqHeader });
    }

    editQuestion(currentQuestion: Question): Observable<{}>  {
        console.log("Sending request to server to Edit question"+currentQuestion);
        const reqHeader = new HttpHeaders({'No-Auth': 'True'});
        return this.http.post(this.rootUrl + '/questions/editquestion', currentQuestion, { headers: reqHeader });
    }

    deleteQuestion(id: string): Observable<{}> {
        const body : any = { Id : id};
        const reqHeader = new HttpHeaders({'No-Auth': 'True'});
        console.log("Inside delete service");
        return this.http.post(this.rootUrl + '/questions/deleterow', body, {headers: reqHeader });
        /*const currentQuestion = this.questionList.findIndex(index => index._id === id);
        this.questionList.splice(currentQuestion, 1);*/
    }

    evaluateExpression(expression: string): Observable<{}> {
        const body : any = { data : expression};
        const reqHeader = new HttpHeaders({'No-Auth': 'True'});
        console.log("Inside expression evlaution service");
        return this.http.post(this.rootUrl + '/questions/evaluateEquation', body, {headers: reqHeader });
    }

    getAllQuestion() {
        return this.questionList;
    }
}
