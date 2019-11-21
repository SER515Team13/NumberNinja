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
        console.log(id)
        const reqHeader = new HttpHeaders({'No-Auth': 'True'});
        console.log("Inside delete service");
        const params = new HttpParams().append('questionId', id);
        return this.http.post(this.rootUrl + '/questions/deleterow', body, {headers: reqHeader ,params:params});
    
    }

    getAllQuestion() {
        return this.questionList;
    }

    addStudentQuestion(email: string, assignmentId: string, questionId: string) {
        console.log("Sending request to add question for each students");
        const body : any ={};
        const reqHeader = new HttpHeaders({'No-Auth': 'True'}).append('email', email)
        const params = new HttpParams().append('email', email).append('assignmentId', assignmentId).append('questionId', questionId);
        return this.http.post(this.rootUrl + '/questions/addStudentQuestion', body, { headers: reqHeader, params: params });
    }
}
