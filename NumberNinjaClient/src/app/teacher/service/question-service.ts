import { Injectable } from '@angular/core';
import { Question } from '../model/question';

@Injectable()
export class QuestionService {

    questionList: Question[] = [];
    constructor() { }

    addQuestion(currentQuestion: Question) {
        this.questionList.push(currentQuestion);
    }

    editQuestion(currentQuestion: Question) {
        const index = this.questionList.findIndex(index => index.id === currentQuestion.id);
        this.questionList[index] = currentQuestion;
    }

    deleteQuestion(id: number) {
        const currentQuestion = this.questionList.findIndex(index => index.id === id);
        this.questionList.splice(currentQuestion, 1);
    }

    getAllQuestion() {
        return this.questionList;
    }
}
