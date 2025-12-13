import { z } from 'zod';
import { QuestionFormatsEnum } from './question';
import {
  CurrencyQuestionSchema, CurrencyQuestionType,
  NumberQuestionSchema, NumberQuestionType,
  NumberRangeQuestionSchema, NumberRangeQuestionType,
  NumberWithContextQuestionSchema, NumberWithContextQuestionType,
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
  SelectBoxQuestionSchema, SelectBoxQuestionType,
  MultiselectBoxQuestionSchema, MultiselectBoxQuestionType,
} from './optionBasedQuestions';
import {
  AffiliationSearchQuestionSchema, AffiliationSearchQuestionType,
  LicenseSearchQuestionSchema, LicenseSearchQuestionType,
  MetadataStandardSearchQuestionSchema, MetadataStandardSearchQuestionType,
  RepositorySearchQuestionSchema, RepositorySearchQuestionType,
} from './graphQLQuestions';
import {
  TableQuestionSchema, TableQuestionType,
  ResearchOutputTableQuestionSchema, ResearchOutputTableQuestionType,
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
  AffiliationSearchQuestionSchema,
  BooleanQuestionSchema,
  CheckboxesQuestionSchema,
  CurrencyQuestionSchema,
  DateQuestionSchema,
  DateRangeQuestionSchema,
  EmailQuestionSchema,
  LicenseSearchQuestionSchema,
  MetadataStandardSearchQuestionSchema,
  MultiselectBoxQuestionSchema,
  NumberQuestionSchema,
  NumberRangeQuestionSchema,
  RadioButtonsQuestionSchema,
  RepositorySearchQuestionSchema,
  ResearchOutputTableQuestionSchema,
  SelectBoxQuestionSchema,
  TableQuestionSchema,
  TextAreaQuestionSchema,
  TextQuestionSchema,
  URLQuestionSchema
]);

// Export a mapping between Zod Schemas and their corresponding question type label
export const QuestionSchemaMap: Record<z.infer<typeof QuestionFormatsEnum>, z.ZodTypeAny> = {
  affiliationSearch: AffiliationSearchQuestionSchema,
  boolean: BooleanQuestionSchema,
  checkBoxes: CheckboxesQuestionSchema,
  currency: CurrencyQuestionSchema,
  date: DateQuestionSchema,
  dateRange: DateRangeQuestionSchema,
  email: EmailQuestionSchema,
  licenseSearch: LicenseSearchQuestionSchema,
  metadataStandardSearch: MetadataStandardSearchQuestionSchema,
  multiselectBox: MultiselectBoxQuestionSchema,
  number: NumberQuestionSchema,
  numberRange: NumberRangeQuestionSchema,
  numberWithContext: NumberWithContextQuestionSchema,
  radioButtons: RadioButtonsQuestionSchema,
  repositorySearch: RepositorySearchQuestionSchema,
  researchOutputTable: ResearchOutputTableQuestionSchema,
  selectBox: SelectBoxQuestionSchema,
  table: TableQuestionSchema,
  text: TextQuestionSchema,
  textArea: TextAreaQuestionSchema,
  url: URLQuestionSchema
};

// Export a mapping between Types and their corresponding question type label
export interface QuestionTypeMap {
  affiliationSearch: AffiliationSearchQuestionType,
  boolean: BooleanQuestionType,
  checkBoxes: CheckboxesQuestionType,
  currency: CurrencyQuestionType,
  date: DateQuestionType,
  dateRange: DateRangeQuestionType,
  email: EmailQuestionType,
  licenseSearch: LicenseSearchQuestionType,
  metadataStandardSearch: MetadataStandardSearchQuestionType,
  multiselectBox: MultiselectBoxQuestionType,
  number: NumberQuestionType,
  numberRange: NumberRangeQuestionType,
  numberWithContext: NumberWithContextQuestionType,
  radioButtons: RadioButtonsQuestionType,
  repositorySearch: RepositorySearchQuestionType,
  researchOutputTable: ResearchOutputTableQuestionType,
  selectBox: SelectBoxQuestionType,
  table: TableQuestionType,
  text: TextQuestionType,
  textArea: TextAreaQuestionType,
  url: URLQuestionType
};

// This will ensure that object validations are against the Zod schemas defined above
export type AnyQuestionType = z.infer<typeof AnyQuestionSchema>;

export const AnyQuestionJSONSchema = z.toJSONSchema(AnyQuestionSchema);
