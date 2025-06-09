import { z } from 'zod';
import {
  BooleanQuestionSchema,
  CurrencyQuestionSchema,
  EmailQuestionSchema,
  NumberQuestionSchema,
  TextAreaQuestionSchema,
  TextQuestionSchema,
  URLQuestionSchema,
} from "./primitiveQuestions";
import { DateQuestionSchema, DateRangeQuestionSchema } from "./dateQuestions";
import { CheckboxesQuestionSchema, RadioButtonsQuestionSchema, SelectBoxQuestionSchema } from './optionBasedQuestions';
import { FilteredSearchQuestionSchema, TypeaheadSearchQuestionSchema } from './graphQLQuestions';
import { TableQuestionSchema } from './tableQuestions';
import { QuestionTypesEnum } from './question';

// Export all the questions
export * from './question';
export * from './dateQuestions';
export * from './graphQLQuestions';
export * from './optionBasedQuestions';
export * from './primitiveQuestions';
export * from './tableQuestions';

// All of the possible questions
export const AnyQuestionSchema = z.discriminatedUnion('type', [
  BooleanQuestionSchema,
  CheckboxesQuestionSchema,
  CurrencyQuestionSchema,
  DateQuestionSchema,
  DateRangeQuestionSchema,
  EmailQuestionSchema,
  FilteredSearchQuestionSchema,
  NumberQuestionSchema,
  RadioButtonsQuestionSchema,
  SelectBoxQuestionSchema,
  TableQuestionSchema,
  TextAreaQuestionSchema,
  TextQuestionSchema,
  TypeaheadSearchQuestionSchema,
  URLQuestionSchema
]);

// Export a mapping between question types and their corresponding question schemas
export const QuestionSchemaMap: Record<z.infer<typeof QuestionTypesEnum>, z.ZodTypeAny> = {
  boolean: BooleanQuestionSchema,
  checkBoxes: CheckboxesQuestionSchema,
  currency: CurrencyQuestionSchema,
  date: DateQuestionSchema,
  dateRange: DateRangeQuestionSchema,
  email: EmailQuestionSchema,
  filteredSearch: FilteredSearchQuestionSchema,
  number: NumberQuestionSchema,
  radioButtons: RadioButtonsQuestionSchema,
  selectBox: SelectBoxQuestionSchema,
  table: TableQuestionSchema,
  text: TextQuestionSchema,
  textArea: TextAreaQuestionSchema,
  typeaheadSearch: TypeaheadSearchQuestionSchema,
  url: URLQuestionSchema
};

// This will ensure that object validations are against the Zod schemas defined above
export type AnyQuestionType = z.infer<typeof AnyQuestionSchema>;
