import {z, ZodObject} from 'zod';
import {
  DateAnswerSchema,
  DateAnswerType,
  DateRangeAnswerSchema,
  DateRangeAnswerType,
  DefaultDateAnswer,
  DefaultDateRangeAnswer
} from './dateAnswers';
import {
  AffiliationSearchAnswerSchema,
  AffiliationSearchAnswerType,
  DefaultAffiliationSearchAnswer,
  DefaultLicenseSearchAnswer,
  DefaultMetadataStandardSearchAnswer,
  DefaultRepositorySearchAnswer,
  LicenseSearchAnswerSchema,
  LicenseSearchAnswerType,
  MetadataStandardSearchAnswerSchema,
  MetadataStandardSearchAnswerType,
  RepositorySearchAnswerSchema,
  RepositorySearchAnswerType,
} from './graphQLAnswers';
import {
  BooleanAnswerSchema,
  BooleanAnswerType,
  CheckboxesAnswerSchema,
  CheckboxesAnswerType,
  RadioButtonsAnswerSchema,
  RadioButtonsAnswerType,
  SelectBoxAnswerSchema,
  SelectBoxAnswerType,
  MultiselectBoxAnswerSchema,
  MultiselectBoxAnswerType,
  DefaultBooleanAnswer,
  DefaultCheckboxesAnswer,
  DefaultMultiselectBoxAnswer,
  DefaultSelectBoxAnswer,
  DefaultRadioButtonsAnswer,
} from './optionBasedAnswers';
import {
  CurrencyAnswerSchema,
  CurrencyAnswerType,
  DefaultCurrencyAnswer,
  DefaultNumberAnswer,
  DefaultNumberRangeAnswer,
  DefaultNumberWithContextAnswer,
  NumberAnswerSchema,
  NumberAnswerType,
  NumberRangeAnswerSchema,
  NumberRangeAnswerType,
  NumberWithContextAnswerSchema,
  NumberWithContextAnswerType
} from './numberAnswers';
import {
  DefaultResearchOutputAccessLevelAnswer,
  DefaultResearchOutputByteSizeAnswer,
  DefaultResearchOutputCustomTableAnswer,
  DefaultResearchOutputDataFlagsAnswer,
  DefaultResearchOutputDescriptionAnswer,
  DefaultResearchOutputLicenseAnswer,
  DefaultResearchOutputMetadataStandardAnswer,
  DefaultResearchOutputReleaseDateAnswer,
  DefaultResearchOutputRepositoryAnswer,
  DefaultResearchOutputTableAnswer,
  DefaultResearchOutputTitleAnswer,
  DefaultResearchOutputTypeAnswer,
  DefaultTableAnswer,
  ResearchOutputAccessLevelAnswerSchema,
  ResearchOutputAccessLevelColumnAnswerType,
  ResearchOutputByteSizeAnswerSchema,
  ResearchOutputByteSizeColumnAnswerType,
  ResearchOutputCustomTableAnswerSchema,
  ResearchOutputCustomTableColumnAnswerType,
  ResearchOutputDataFlagsAnswerSchema,
  ResearchOutputDataFlagsColumnAnswerType,
  ResearchOutputDescriptionAnswerSchema,
  ResearchOutputDescriptionColumnAnswerType,
  ResearchOutputLicenseAnswerSchema,
  ResearchOutputLicenseColumnAnswerType,
  ResearchOutputMetadataStandardAnswerSchema,
  ResearchOutputMetadataStandardColumnAnswerType,
  ResearchOutputReleaseDateAnswerSchema,
  ResearchOutputReleaseDateColumnAnswerType,
  ResearchOutputRepositoryAnswerSchema,
  ResearchOutputRepositoryColumnAnswerType,
  ResearchOutputTableAnswerSchema,
  ResearchOutputTableAnswerType,
  ResearchOutputTitleAnswerSchema,
  ResearchOutputTitleColumnAnswerType,
  ResearchOutputTypeAnswerSchema,
  ResearchOutputTypeColumnAnswerType,
  TableAnswerSchema,
  TableAnswerType
} from './tableAnswers';
import {
  DefaultEmailAnswer,
  DefaultTextAnswer,
  DefaultTextAreaAnswer,
  DefaultURLAnswer,
  EmailAnswerSchema,
  EmailAnswerType,
  TextAnswerSchema,
  TextAnswerType,
  TextAreaAnswerSchema,
  TextAreaAnswerType,
  URLAnswerSchema,
  URLAnswerType
} from './textAnswers';
import { QuestionFormatsEnum, ResearchOutputTableColumnsEnum } from "../questions";

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
  ResearchOutputTableAnswerSchema,
  SelectBoxAnswerSchema,
  TableAnswerSchema,
  TextAnswerSchema,
  TextAreaAnswerSchema,
  URLAnswerSchema
]);

export const AnyAnswerJSONSchema = z.toJSONSchema(AnyAnswerSchema);

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

export type AllDefaultAnswerTypes =
  | typeof DefaultAffiliationSearchAnswer
  | typeof DefaultBooleanAnswer
  | typeof DefaultCheckboxesAnswer
  | typeof DefaultCurrencyAnswer
  | typeof DefaultDateAnswer
  | typeof DefaultDateRangeAnswer
  | typeof DefaultEmailAnswer
  | typeof DefaultLicenseSearchAnswer
  | typeof DefaultMetadataStandardSearchAnswer
  | typeof DefaultMultiselectBoxAnswer
  | typeof DefaultNumberAnswer
  | typeof DefaultNumberRangeAnswer
  | typeof DefaultNumberWithContextAnswer
  | typeof DefaultRadioButtonsAnswer
  | typeof DefaultRepositorySearchAnswer
  | typeof DefaultResearchOutputTableAnswer
  | typeof DefaultSelectBoxAnswer
  | typeof DefaultTableAnswer
  | typeof DefaultTextAnswer
  | typeof DefaultTextAreaAnswer
  | typeof DefaultURLAnswer;

// Export a mapping between the Types and their corresponding default structures
export const AnswerDefaultMap: Record<z.infer<typeof QuestionFormatsEnum>, AllDefaultAnswerTypes> = {
  affiliationSearch: DefaultAffiliationSearchAnswer,
  boolean: DefaultAffiliationSearchAnswer,
  checkBoxes: DefaultCheckboxesAnswer,
  currency: DefaultCurrencyAnswer,
  date: DefaultDateAnswer,
  dateRange: DefaultDateRangeAnswer,
  email: DefaultEmailAnswer,
  licenseSearch: DefaultLicenseSearchAnswer,
  metadataStandardSearch: DefaultMetadataStandardSearchAnswer,
  multiselectBox: DefaultMultiselectBoxAnswer,
  number: DefaultNumberAnswer,
  numberRange: DefaultNumberRangeAnswer,
  numberWithContext: DefaultNumberWithContextAnswer,
  radioButtons: DefaultRadioButtonsAnswer,
  repositorySearch: DefaultRepositorySearchAnswer,
  researchOutputTable: DefaultResearchOutputTableAnswer,
  selectBox: DefaultSelectBoxAnswer,
  table: DefaultResearchOutputTableAnswer,
  text: DefaultTextAnswer,
  textArea: DefaultTextAreaAnswer,
  url: DefaultURLAnswer,
};

export type AllDefaultResearchOutputTableColumnAnswerTypes =
  | typeof DefaultResearchOutputTitleAnswer
  | typeof DefaultResearchOutputDescriptionAnswer
  | typeof DefaultResearchOutputTypeAnswer
  | typeof DefaultResearchOutputDataFlagsAnswer
  | typeof DefaultResearchOutputAccessLevelAnswer
  | typeof DefaultResearchOutputReleaseDateAnswer
  | typeof DefaultResearchOutputByteSizeAnswer
  | typeof DefaultResearchOutputRepositoryAnswer
  | typeof DefaultResearchOutputMetadataStandardAnswer
  | typeof DefaultResearchOutputLicenseAnswer
  | typeof DefaultResearchOutputCustomTableAnswer;

export interface ResearchOutputTableColumnAnswerTypeMap {
  title: ResearchOutputTitleColumnAnswerType;
  description: ResearchOutputDescriptionColumnAnswerType;
  type: ResearchOutputTypeColumnAnswerType;
  data_flags: ResearchOutputDataFlagsColumnAnswerType;
  data_access: ResearchOutputAccessLevelColumnAnswerType;
  issued: ResearchOutputReleaseDateColumnAnswerType;
  byte_size: ResearchOutputByteSizeColumnAnswerType;
  host: ResearchOutputRepositoryColumnAnswerType;
  metadata: ResearchOutputMetadataStandardColumnAnswerType;
  license_ref: ResearchOutputLicenseColumnAnswerType;
  custom: ResearchOutputCustomTableColumnAnswerType;
}

export const ResearchOutputTableColumnAnswerMap: Record<string, ZodObject> = {
  title: ResearchOutputTitleAnswerSchema,
  description: ResearchOutputDescriptionAnswerSchema,
  type: ResearchOutputTypeAnswerSchema,
  data_flags: ResearchOutputDataFlagsAnswerSchema,
  data_access: ResearchOutputAccessLevelAnswerSchema,
  issued: ResearchOutputReleaseDateAnswerSchema,
  byte_size: ResearchOutputByteSizeAnswerSchema,
  host: ResearchOutputRepositoryAnswerSchema,
  metadata: ResearchOutputMetadataStandardAnswerSchema,
  license_ref: ResearchOutputLicenseAnswerSchema,
  custom: ResearchOutputCustomTableAnswerSchema,
}

export const DefaultResearchOutputTableColumnAnswerMap: Record<z.infer<typeof ResearchOutputTableColumnsEnum>, AllDefaultResearchOutputTableColumnAnswerTypes> = {
  title: DefaultResearchOutputTitleAnswer,
  description: DefaultResearchOutputDescriptionAnswer,
  type: DefaultResearchOutputTypeAnswer,
  data_flags: DefaultResearchOutputDataFlagsAnswer,
  data_access: DefaultResearchOutputAccessLevelAnswer,
  issued: DefaultResearchOutputReleaseDateAnswer,
  byte_size: DefaultResearchOutputByteSizeAnswer,
  host: DefaultResearchOutputRepositoryAnswer,
  metadata: DefaultResearchOutputMetadataStandardAnswer,
  license_ref: DefaultResearchOutputLicenseAnswer,
  custom: DefaultResearchOutputCustomTableAnswer
}
