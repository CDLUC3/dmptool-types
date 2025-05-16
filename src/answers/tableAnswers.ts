import { z } from 'zod';
import { Answer } from './answer';
import { CheckboxesAnswer, RadioButtonsAnswer, SelectBoxAnswer } from './optionBasedAnswers';
import { DatePickerAnswer, DateRangeAnswer } from './dateAnswers';
import { FilteredSearchAnswer, TypeaheadSearchAnswer } from './graphQLAnswers';
import {
  BooleanAnswer,
  CurrencyAnswer,
  EmailAnswer,
  NumberAnswer,
  TextAreaAnswer,
  TextAnswer,
  URLAnswer
} from './primitiveAnswers';

// Answers to Table Column Question Types (note that TableAnswer is not included here because we don't allow nested tables)
export const AnyTableColumnAnswer = z.discriminatedUnion('type', [
  BooleanAnswer,
  CheckboxesAnswer,
  CurrencyAnswer,
  DatePickerAnswer,
  DateRangeAnswer,
  EmailAnswer,
  FilteredSearchAnswer,
  NumberAnswer,
  RadioButtonsAnswer,
  SelectBoxAnswer,
  TextAnswer,
  TextAreaAnswer,
  TypeaheadSearchAnswer,
  URLAnswer
]);

// Answers to Table Question Types
export const TableAnswer = Answer.merge(z.object({
  type: z.literal('table'),                                   // The type of answer
  answer: z.array(AnyTableColumnAnswer)                                     // The answer to the question (array of answers)
}));

// This will ensure that object validations are against the Zod schemas defined above
export type TableAnswerType = z.infer<typeof TableAnswer>;
export type AnyTableColumnAnswerType = z.infer<typeof AnyTableColumnAnswer>;
