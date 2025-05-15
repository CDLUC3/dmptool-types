import { z } from "zod";
import {
  Question,
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

// Union types for all questions and answers (tables cannot be nested so no TableQuestion here!)
const ColumnQuestions = z.discriminatedUnion('type', [
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
  TextAreaQuestion,
  TextQuestion,
  TypeaheadSearchQuestion,
  URLQuestion
]);

// Table question and answer
export const TableQuestion = Question.merge(z.object({
  type: z.literal('table'),                                 // The type of question
  columns: z.array(ColumnQuestions),                        // The columns of the table (note: tables cannot be nested)
  attributes: z.object({
    canAddRows: z.boolean().optional(),                     // Whether to allow adding rows (default is true)
    canRemoveRows: z.boolean().optional(),                  // Whether to allow removing rows (default is true)
    initialRows: z.number().optional(),                     // The initial number of rows (default is 1)
    maxRows: z.number().optional(),                         // The maximum number of rows (no default)
    minRows: z.number().optional()                          // The minimum number of rows (no default)
  })
}));

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
export type TableQuestionType = z.infer<typeof TableQuestion>;
export type AnyQuestionType = z.infer<typeof AnyQuestion>;

