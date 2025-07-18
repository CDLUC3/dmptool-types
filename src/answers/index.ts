import { z } from 'zod';
import {
  DateAnswerSchema, DateAnswerType,
  DateRangeAnswerSchema, DateRangeAnswerType
} from './dateAnswers';
import {
  FilteredSearchAnswerSchema, FilteredSearchAnswerType,
  TypeaheadSearchAnswerSchema, TypeaheadSearchAnswerType
} from './graphQLAnswers';
import {
  CheckboxesAnswerSchema, CheckboxesAnswerType,
  RadioButtonsAnswerSchema, RadioButtonsAnswerType,
  SelectBoxAnswerSchema, SelectBoxAnswerType
} from './optionBasedAnswers';
import {
  BooleanAnswerSchema, BooleanAnswerType,
  CurrencyAnswerSchema, CurrencyAnswerType,
  NumberAnswerSchema, NumberAnswerType,
  NumberRangeAnswerSchema, NumberRangeAnswerType
} from './numberAnswers';
import {
  TableAnswerSchema, TableAnswerType
} from './tableAnswers';
import {
  EmailAnswerSchema, EmailAnswerType,
  TextAnswerSchema, TextAnswerType,
  TextAreaAnswerSchema, TextAreaAnswerType,
  URLAnswerSchema, URLAnswerType
} from './textAnswers';
import { QuestionTypesEnum } from '../questions';

// reexport everything
export * from './answer';
export * from './dateAnswers';
export * from './graphQLAnswers';
export * from './numberAnswers';
export * from './optionBasedAnswers';
export * from './tableAnswers';
export * from './textAnswers';

// Union of all possible answers
export const AnyAnswerSchema = z.discriminatedUnion('type', [
  BooleanAnswerSchema,
  CheckboxesAnswerSchema,
  CurrencyAnswerSchema,
  DateAnswerSchema,
  DateRangeAnswerSchema,
  EmailAnswerSchema,
  FilteredSearchAnswerSchema,
  NumberAnswerSchema,
  RadioButtonsAnswerSchema,
  SelectBoxAnswerSchema,
  TableAnswerSchema,
  TextAnswerSchema,
  TextAreaAnswerSchema,
  TypeaheadSearchAnswerSchema,
  URLAnswerSchema
]);

// Export a mapping between question types and their corresponding answer schemas
export const AnswerSchemaMap: Record<z.infer<typeof QuestionTypesEnum>, z.ZodTypeAny> = {
  boolean: BooleanAnswerSchema,
  checkBoxes: CheckboxesAnswerSchema,
  currency: CurrencyAnswerSchema,
  date: DateAnswerSchema,
  dateRange: DateRangeAnswerSchema,
  email: EmailAnswerSchema,
  filteredSearch: FilteredSearchAnswerSchema,
  number: NumberAnswerSchema,
  numberRange: NumberRangeAnswerSchema,
  radioButtons: RadioButtonsAnswerSchema,
  selectBox: SelectBoxAnswerSchema,
  table: TableAnswerSchema,
  text: TextAnswerSchema,
  textArea: TextAreaAnswerSchema,
  typeaheadSearch: TypeaheadSearchAnswerSchema,
  url: URLAnswerSchema
};

// This will ensure that object validations are against the Zod schemas defined above
export type AnyAnswerType = z.infer<typeof AnyAnswerSchema>;

export interface AnswerTypeMap {
  boolean: BooleanAnswerType,
  checkBoxes: CheckboxesAnswerType,
  currency: CurrencyAnswerType,
  date: DateAnswerType,
  dateRange: DateRangeAnswerType,
  email: EmailAnswerType,
  filteredSearch: FilteredSearchAnswerType,
  number: NumberAnswerType,
  numberRange: NumberRangeAnswerType,
  radioButtons: RadioButtonsAnswerType,
  selectBox: SelectBoxAnswerType,
  table: TableAnswerType,
  text: TextAnswerType,
  textArea: TextAreaAnswerType,
  typeaheadSearch: TypeaheadSearchAnswerType,
  url: URLAnswerType
}
