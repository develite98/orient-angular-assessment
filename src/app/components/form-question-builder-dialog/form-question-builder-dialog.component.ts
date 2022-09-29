import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-question-builder-dialog',
  templateUrl: './form-question-builder-dialog.component.html',
  styleUrls: ['./form-question-builder-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormQuestionBuilderDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
