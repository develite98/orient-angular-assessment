
export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  options: string[];
  isRequired?: boolean;
}

export interface QuestionAnswer {
  questionId: string;
  answerValue: string[] | string;
}

export enum QuestionType {
  Pagragraph = 'Pagragraph',
  Checkbox = 'Checkbox',
}
