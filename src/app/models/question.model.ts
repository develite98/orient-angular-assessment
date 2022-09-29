import { QuestionOption } from './question-option.model';

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  options?: QuestionOption[];
  isRequired?: boolean;
}

export enum QuestionType {
  Pagragraph = 'Pagragraph',
  Checkbox = 'Checkbox',
}
