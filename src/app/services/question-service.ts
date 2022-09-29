import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Question, QuestionAnswer, QuestionType } from "../models/question.model";
import { FormUtils } from "../utils/form.utils";

@Injectable({providedIn: 'root'})
export class QuestionService {
    public questions$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);
    public questionAnswer: FormGroup = new FormGroup({
        answerValue: new FormArray([])
    })

    public addQuestion(question: Question) {
        const currentQuestions = this.questions$.getValue();
        const newQuestions = [...currentQuestions, question];
        this.questions$.next(newQuestions)
        this.initAnswer();
    }

    public initAnswer(): void {
        const currentQuestions = this.questions$.getValue();
        const currentAnswer: QuestionAnswer[] = (this.questionAnswer.controls['answerValue'] as FormArray).value;

        for (let question of currentQuestions) {
            if (currentAnswer.find(a => a.questionId === question.id)) {
                continue;
            } else {
                (this.questionAnswer.controls['answerValue'] as FormArray).push(
                    new FormGroup({
                        questionId: new FormControl(question.id),
                        answerValue: new FormControl(question.type === QuestionType.Checkbox ? [] : '', question.isRequired ? Validators.required : null)
                    })
                )
            }
        }
    }


    public validateAnswer(): boolean {
        const answerValue = (this.questionAnswer.controls['answerValue'] as FormArray);
        for (let i: number = 0; i < answerValue.length; i++) {
          if (!FormUtils.validateForm(answerValue.at(i) as FormGroup)) {
            return false;
          }
        }

        return true;
    }
}