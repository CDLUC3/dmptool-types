import { z } from 'zod';
import { QuestionTypesEnum } from './question';
import {
  CurrencyQuestionSchema, CurrencyQuestionType,
  NumberQuestionSchema, NumberQuestionType,
  NumberRangeQuestionSchema, NumberRangeQuestionType,
} from "./numberQuestions";
import {
  EmailQuestionSchema, EmailQuestionType,
  TextAreaQuestionSchema, TextAreaQuestionType,
  TextQuestionSchema, TextQuestionType,
  URLQuestionSchema, URLQuestionType
} from "./textQuestions";
import {
  DateQuestionSchema, DateQuestionType,
  DateRangeQuestionSchema, DateRangeQuestionType
} from "./dateQuestions";
import {
  BooleanQuestionSchema, BooleanQuestionType,
  CheckboxesQuestionSchema, CheckboxesQuestionType,
  RadioButtonsQuestionSchema, RadioButtonsQuestionType,
  SelectBoxQuestionSchema, SelectBoxQuestionType
} from './optionBasedQuestions';
import {
  FilteredSearchQuestionSchema, FilteredSearchQuestionType,
  TypeaheadSearchQuestionSchema, TypeaheadSearchQuestionType
} from './graphQLQuestions';
import {
  TableQuestionSchema, TableQuestionType
} from './tableQuestions';

// Export all the questions
export * from './question';
export * from './dateQuestions';
export * from './graphQLQuestions';
export * from './numberQuestions';
export * from './optionBasedQuestions';
export * from './tableQuestions';
export * from './textQuestions';


export const AnyQuestionSchema = z.discriminatedUnion('type', [
  BooleanQuestionSchema,
  CheckboxesQuestionSchema,
  CurrencyQuestionSchema,
  DateQuestionSchema,
  DateRangeQuestionSchema,
  EmailQuestionSchema,
  FilteredSearchQuestionSchema,
  NumberQuestionSchema,
  NumberRangeQuestionSchema,
  RadioButtonsQuestionSchema,
  SelectBoxQuestionSchema,
  TableQuestionSchema,
  TextAreaQuestionSchema,
  TextQuestionSchema,
  TypeaheadSearchQuestionSchema,
  URLQuestionSchema
]);

// Export a mapping between Zod Schemas and their corresponding question type label
export const QuestionSchemaMap: Record<z.infer<typeof QuestionTypesEnum>, z.ZodTypeAny> = {
  boolean: BooleanQuestionSchema,
  checkBoxes: CheckboxesQuestionSchema,
  currency: CurrencyQuestionSchema,
  date: DateQuestionSchema,
  dateRange: DateRangeQuestionSchema,
  email: EmailQuestionSchema,
  filteredSearch: FilteredSearchQuestionSchema,
  number: NumberQuestionSchema,
  numberRange: NumberRangeQuestionSchema,
  radioButtons: RadioButtonsQuestionSchema,
  selectBox: SelectBoxQuestionSchema,
  table: TableQuestionSchema,
  text: TextQuestionSchema,
  textArea: TextAreaQuestionSchema,
  typeaheadSearch: TypeaheadSearchQuestionSchema,
  url: URLQuestionSchema
};

// Export a mapping between Types and their corresponding question type label
export interface QuestionTypeMap {
  boolean: BooleanQuestionType,
  checkBoxes: CheckboxesQuestionType,
  currency: CurrencyQuestionType,
  date: DateQuestionType,
  dateRange: DateRangeQuestionType,
  email: EmailQuestionType,
  filteredSearch: FilteredSearchQuestionType,
  number: NumberQuestionType,
  numberRange: NumberRangeQuestionType,
  radioButtons: RadioButtonsQuestionType,
  selectBox: SelectBoxQuestionType,
  table: TableQuestionType,
  text: TextQuestionType,
  textArea: TextAreaQuestionType,
  typeaheadSearch: TypeaheadSearchQuestionType,
  url: URLQuestionType
};

// This will ensure that object validations are against the Zod schemas defined above
export type AnyQuestionType = z.infer<typeof AnyQuestionSchema>;

