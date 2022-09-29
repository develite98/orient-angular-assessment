import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  TuiButtonModule,
  TuiDialogContext,
  TuiDialogService,
  TuiErrorModule,
} from '@taiga-ui/core';
import { FormQuestionBuilderDialogComponent } from 'src/app/components/form-question-builder-dialog/form-question-builder-dialog.component';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { QuestionService } from 'src/app/services/question-service';
import {
  TuiTextAreaModule,
  TuiFieldErrorPipeModule,
  TuiMultiSelectModule,
  TuiDataListWrapperModule,
} from '@taiga-ui/kit';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form.utils';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TuiButtonModule,
    FormQuestionBuilderDialogComponent,
    TuiTextAreaModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    ReactiveFormsModule,
    TuiMultiSelectModule,
    TuiDataListWrapperModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent {
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    public questionService: QuestionService,
    public route: Router
  ) {}

  public get questions() {
    return this.questionService.questions$;
  }

  public questionAnswerById(id: string) {
    return (
      this.questionService.questionAnswer.controls['answerValue'] as FormArray
    ).controls
      .find((x) => x.value.questionId === id)
      ?.get('answerValue');
  }

  public showQuestionBuilderDialog(
    content: PolymorpheusContent<TuiDialogContext>
  ): void {
    this.dialogService.open(content).subscribe();
  }

  public submitAnswer(): void {
    if (this.questionService.validateAnswer()) {
      this.route.navigateByUrl('/form/review');
    }
  }
}
