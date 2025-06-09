import { z } from 'zod';
import { DateAnswerSchema, DateRangeAnswerSchema } from './dateAnswers';
import { FilteredSearchAnswerSchema, TypeaheadSearchAnswerSchema } from './graphQLAnswers';
import { CheckboxesAnswerSchema, RadioButtonsAnswerSchema, SelectBoxAnswerSchema } from './optionBasedAnswers';
import {
  BooleanAnswerSchema,
  CurrencyAnswerSchema,
  EmailAnswerSchema,
  NumberAnswerSchema,
  TextAnswerSchema,
  TextAreaAnswerSchema,
  URLAnswerSchema
} from './primitiveAnswers';
import { TableAnswerSchema } from './tableAnswers';
import { QuestionTypesEnum } from '../questions';

// reexport everything
export * from './answer';
export * from './dateAnswers';
export * from './graphQLAnswers';
export * from './optionBasedAnswers';
export * from './primitiveAnswers';
export * from './tableAnswers';

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
