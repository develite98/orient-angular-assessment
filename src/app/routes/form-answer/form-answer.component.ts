import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-answer',
  templateUrl: './form-answer.component.html',
  styleUrls: ['./form-answer.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormAnswerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
