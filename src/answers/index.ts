import { z } from 'zod';
import { DatePickerAnswer, DateRangeAnswer } from './dateAnswers';
import { FilteredSearchAnswer, TypeaheadSearchAnswer } from './graphQLAnswers';
import { CheckboxesAnswer, RadioButtonsAnswer, SelectBoxAnswer } from './optionBasedAnswers';
import {
  BooleanAnswer,
  CurrencyAnswer,
  EmailAnswer,
  NumberAnswer,
  TextAnswer,
  TextAreaAnswer,
  URLAnswer
} from './primitiveAnswers';
import { TableAnswer } from './tableAnswers';

// reexport everything
export * from './dateAnswers';
export * from './graphQLAnswers';
export * from './optionBasedAnswers';
export * from './primitiveAnswers';
export * from './tableAnswers';

// Union of all possible answers
export const AnyAnswer = z.discriminatedUnion('type', [
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
  TableAnswer,
  TextAnswer,
  TextAreaAnswer,
  TypeaheadSearchAnswer,
  URLAnswer
]);

// This will ensure that object validations are against the Zod schemas defined above
export type AnyAnswerType = z.infer<typeof AnyAnswer>;
