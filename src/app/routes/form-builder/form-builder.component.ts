import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiButtonModule, TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { FormQuestionBuilderDialogComponent } from 'src/app/components/form-question-builder-dialog/form-question-builder-dialog.component';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  standalone: true,
  imports: [CommonModule, TuiButtonModule, FormQuestionBuilderDialogComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent {
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
  ) {}

  showQuestionBuilderDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogService.open(content).subscribe();
  }
}
