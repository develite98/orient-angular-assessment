import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { TuiButtonModule, TuiDataListModule, TuiDialogService } from '@taiga-ui/core';
import { QuestionAnswer } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question-service';

@Component({
  selector: 'app-form-answer',
  templateUrl: './form-answer.component.html',
  styleUrls: ['./form-answer.component.scss'],
  standalone: true,
  imports: [CommonModule, TuiButtonModule, TuiDataListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAnswerComponent implements OnInit {
  public answerReviews: {
    questionTitle: string;
    answerValue: string[]
  }[] = [];

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    public questionService: QuestionService,
    public route: Router
  ) {}

  public ngOnInit(): void {
    if (this.questionService.questions$.getValue().length <= 0) {
      this.backToFormBuilder();
      return;
    }

    if (!this.questionService.validateAnswer()) {
      this.backToFormBuilder();
      return;
    }

    this.initAnswerReview();
  }

  public initAnswerReview(): void {
    const questions = this.questionService.questions$.getValue();
    const answers: QuestionAnswer[] = this.questionService.questionAnswer.controls['answerValue'].getRawValue();
    this.answerReviews = [];

    for (let question of questions) {
      const answerValue = answers.find(v => v.questionId === question.id)?.answerValue;
      let reviewData = {
        questionTitle: question.title,
        answerValue: answerValue ? answerValue instanceof Array ? [...answerValue] : [answerValue] : ['']
      }
      
      this.answerReviews.push(reviewData);
    }
  }

  public backToFormBuilder(): void {
    this.route.navigateByUrl('/form/builder');
  }
}
