import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Question } from "../models/question.model";

@Injectable({providedIn: 'root'})
export class QuestionService {
    public questions$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);


    public addQuestion(question: Question) {
        const currentQuestions = this.questions$.getValue();
        const newQuestions = [...currentQuestions, question];
        this.questions$.next(newQuestions)
    }
}