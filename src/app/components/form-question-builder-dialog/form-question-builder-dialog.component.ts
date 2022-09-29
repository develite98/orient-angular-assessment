import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiGroupModule,
} from '@taiga-ui/core';
import {
  TuiCheckboxLabeledModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiRadioBlockModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit';
import { Question, QuestionType } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question-service';
import { FormUtils } from 'src/app/utils/form.utils';

@Component({
  selector: 'app-form-question-builder-dialog',
  templateUrl: './form-question-builder-dialog.component.html',
  styleUrls: ['./form-question-builder-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiRadioBlockModule,
    TuiButtonModule,
    TuiGroupModule,
    TuiCheckboxLabeledModule,
    TuiTextAreaModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormQuestionBuilderDialogComponent {
  @Output() public complete: EventEmitter<void> = new EventEmitter();

  public questionForm: FormGroup = new FormGroup({
    type: new FormControl(QuestionType.Pagragraph),
    title: new FormControl('', Validators.required),
    isRequired: new FormControl(false),
    options: new FormArray([]),
  });

  public get answerOptions(): FormArray {
    return this.questionForm.controls['options'] as FormArray;
  }

  public get isCheckBox(): boolean {
    return this.questionForm.controls['type'].value === QuestionType.Checkbox;
  }

  public get canAddOption(): boolean {
    return (
      this.questionForm.controls['type'].value === QuestionType.Checkbox &&
      this.answerOptions.length < 5
    );
  }

  constructor(public questionService: QuestionService) {}

  public addNewAnswerOption(): void {
    (this.questionForm.controls['options'] as FormArray).push(
      new FormControl('', Validators.required)
    );
  }

  public addQuestion(): void {
    if (FormUtils.validateForm(this.questionForm)) {
      const rawFormValue =  this.questionForm.getRawValue();
      const question: Question = {
        id: new Date().toISOString(),
        title: rawFormValue.title,
        type: rawFormValue.type,
        isRequired: rawFormValue.isRequired,
        options: rawFormValue.options.map((value: string) => ({ value: value }))
      };

      this.questionService.addQuestion(question);
      this.complete.emit()
    } else {
      if (!this.isCheckBox) return;
      if (!this.answerOptions?.length) return;

      for (let i: number = 0; i < this.answerOptions.length; i++) {
        FormUtils.validateForm(this.answerOptions.at(i) as FormGroup);
      }
    }
  }
}
