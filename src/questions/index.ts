import { z } from 'zod';
import {
  BooleanQuestion,
  CurrencyQuestion,
  EmailQuestion,
  NumberQuestion,
  TextAreaQuestion,
  TextQuestion,
  URLQuestion,
} from "./primitiveQuestions";
import { DatePickerQuestion, DateRangeQuestion } from "./dateQuestions";
import { CheckboxesQuestion, RadioButtonsQuestion, SelectBoxQuestion } from './optionBasedQuestions';
import { FilteredSearchQuestion, TypeaheadSearchQuestion } from './graphQLQuestions';
import { TableQuestion } from './tableQuestions';

// Export all the questions
export * from './dateQuestions';
export * from './graphQLQuestions';
export * from './optionBasedQuestions';
export * from './primitiveQuestions';
export * from './tableQuestions';

// All of the possible questions
export const AnyQuestion = z.discriminatedUnion('type', [
  BooleanQuestion,
  CheckboxesQuestion,
  CurrencyQuestion,
  DatePickerQuestion,
  DateRangeQuestion,
  EmailQuestion,
  FilteredSearchQuestion,
  NumberQuestion,
  RadioButtonsQuestion,
  SelectBoxQuestion,
  TableQuestion,
  TextAreaQuestion,
  TextQuestion,
  TypeaheadSearchQuestion,
  URLQuestion
]);

// This will ensure that object validations are against the Zod schemas defined above
export type AnyQuestionType = z.infer<typeof AnyQuestion>;
