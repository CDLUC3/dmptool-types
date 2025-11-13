import { z } from 'zod';
import {
  DateAnswerSchema, DateAnswerType,
  DateRangeAnswerSchema, DateRangeAnswerType
} from './dateAnswers';
import {
  AffiliationSearchAnswerSchema, AffiliationSearchAnswerType,
  LicenseSearchAnswerSchema, LicenseSearchAnswerType,
  MetadataStandardSearchAnswerSchema, MetadataStandardSearchAnswerType,
  RepositorySearchAnswerSchema, RepositorySearchAnswerType,
} from './graphQLAnswers';
import {
  BooleanAnswerSchema, BooleanAnswerType,
  CheckboxesAnswerSchema, CheckboxesAnswerType,
  RadioButtonsAnswerSchema, RadioButtonsAnswerType,
  SelectBoxAnswerSchema, SelectBoxAnswerType,
  MultiselectBoxAnswerSchema, MultiselectBoxAnswerType,
} from './optionBasedAnswers';
import {
  CurrencyAnswerSchema, CurrencyAnswerType,
  NumberAnswerSchema, NumberAnswerType,
  NumberRangeAnswerSchema, NumberRangeAnswerType,
  NumberWithContextAnswerSchema, NumberWithContextAnswerType
} from './numberAnswers';
import {
  ResearchOutputTableAnswerSchema, ResearchOutputTableAnswerType,
  TableAnswerSchema, TableAnswerType
} from './tableAnswers';
import {
  EmailAnswerSchema, EmailAnswerType,
  TextAnswerSchema, TextAnswerType,
  TextAreaAnswerSchema, TextAreaAnswerType,
  URLAnswerSchema, URLAnswerType
} from './textAnswers';
import {
  QuestionFormatsEnum
} from '../questions';

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
  AffiliationSearchAnswerSchema,
  BooleanAnswerSchema,
  CheckboxesAnswerSchema,
  CurrencyAnswerSchema,
  DateAnswerSchema,
  DateRangeAnswerSchema,
  EmailAnswerSchema,
  LicenseSearchAnswerSchema,
  MetadataStandardSearchAnswerSchema,
  MultiselectBoxAnswerSchema,
  NumberAnswerSchema,
  NumberRangeAnswerSchema,
  RadioButtonsAnswerSchema,
  RepositorySearchAnswerSchema,
  SelectBoxAnswerSchema,
  TableAnswerSchema,
  TextAnswerSchema,
  TextAreaAnswerSchema,
  URLAnswerSchema
]);

// Export a mapping between question types and their corresponding answer schemas
export const AnswerSchemaMap: Record<z.infer<typeof QuestionFormatsEnum>, z.ZodTypeAny> = {
  affiliationSearch: AffiliationSearchAnswerSchema,
  boolean: BooleanAnswerSchema,
  checkBoxes: CheckboxesAnswerSchema,
  currency: CurrencyAnswerSchema,
  date: DateAnswerSchema,
  dateRange: DateRangeAnswerSchema,
  email: EmailAnswerSchema,
  licenseSearch: LicenseSearchAnswerSchema,
  metadataStandardSearch: MetadataStandardSearchAnswerSchema,
  multiselectBox: MultiselectBoxAnswerSchema,
  number: NumberAnswerSchema,
  numberRange: NumberRangeAnswerSchema,
  numberWithContext: NumberWithContextAnswerSchema,
  radioButtons: RadioButtonsAnswerSchema,
  repositorySearch: RepositorySearchAnswerSchema,
  researchOutputTable: ResearchOutputTableAnswerSchema,
  selectBox: SelectBoxAnswerSchema,
  table: TableAnswerSchema,
  text: TextAnswerSchema,
  textArea: TextAreaAnswerSchema,
  url: URLAnswerSchema
};

// This will ensure that object validations are against the Zod schemas defined above
export type AnyAnswerType = z.infer<typeof AnyAnswerSchema>;

export interface AnswerTypeMap {
  affiliationSearch: AffiliationSearchAnswerType,
  boolean: BooleanAnswerType,
  checkBoxes: CheckboxesAnswerType,
  currency: CurrencyAnswerType,
  date: DateAnswerType,
  dateRange: DateRangeAnswerType,
  email: EmailAnswerType,
  licenseSearch: LicenseSearchAnswerType,
  metadataStandardSearch: MetadataStandardSearchAnswerType,
  multiselectBox: MultiselectBoxAnswerType,
  number: NumberAnswerType,
  numberRange: NumberRangeAnswerType,
  numberWithContext: NumberWithContextAnswerType,
  radioButtons: RadioButtonsAnswerType,
  repositorySearch: RepositorySearchAnswerType,
  researchOutputTable: ResearchOutputTableAnswerType,
  selectBox: SelectBoxAnswerType,
  table: TableAnswerType,
  text: TextAnswerType,
  textArea: TextAreaAnswerType,
  url: URLAnswerType
}
