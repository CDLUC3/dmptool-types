import fs from 'fs';

// Question imports
import {
  AnyQuestionJSONSchema,
  AnyTableColumnQuestionJSONSchema,

  AffiliationSearchQuestionJSONSchema,
  BooleanQuestionJSONSchema,
  CheckboxesQuestionJSONSchema,
  CurrencyQuestionJSONSchema,
  DateQuestionJSONSchema,
  DateRangeQuestionJSONSchema,
  EmailQuestionJSONSchema,
  LicenseSearchQuestionJSONSchema,
  MetadataStandardSearchQuestionJSONSchema,
  MultiselectBoxQuestionJSONSchema,
  NumberQuestionJSONSchema,
  NumberRangeQuestionJSONSchema,
  NumberWithContextQuestionJSONSchema,
  RadioButtonsQuestionJSONSchema,
  RepositorySearchQuestionJSONSchema,
  ResearchOutputTableQuestionJSONSchema,
  SelectBoxQuestionJSONSchema,
  TableQuestionJSONSchema,
  TextAreaQuestionJSONSchema,
  TextQuestionJSONSchema,
  URLQuestionJSONSchema
} from "../src";

// Answer imports
import {
  AnyAnswerJSONSchema,
  AnyTableColumnAnswerJSONSchema,

  AffiliationSearchAnswerJSONSchema,
  BooleanAnswerJSONSchema,
  CheckboxesAnswerJSONSchema,
  CurrencyAnswerJSONSchema,
  DateAnswerJSONSchema,
  DateRangeAnswerJSONSchema,
  EmailAnswerJSONSchema,
  LicenseSearchAnswerJSONSchema,
  MetadataStandardSearchAnswerJSONSchema,
  MultiselectBoxAnswerJSONSchema,
  NumberAnswerJSONSchema,
  NumberRangeAnswerJSONSchema,
  NumberWithContextAnswerJSONSchema,
  RadioButtonsAnswerJSONSchema,
  RepositorySearchAnswerJSONSchema,
  ResearchOutputTableAnswerSchema,
  SelectBoxAnswerJSONSchema,
  TableAnswerJSONSchema,
  TextAreaAnswerJSONSchema,
  TextAnswerJSONSchema,
  URLAnswerJSONSchema
} from '../src';
import { ExtensionJSONSchema } from "../src/dmp";

// Convert the Zod schemas to JSON schemas and then write them to the /schemas folder
fs.writeFileSync('./schemas/anyQuestion.schema.json', JSON.stringify(AnyQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/anyAnswer.schema.json', JSON.stringify(AnyAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/anyTableColumnQuestion.schema.json', JSON.stringify(AnyTableColumnQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/anyTableColumnAnswer.schema.json', JSON.stringify(AnyTableColumnAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/affiliationSearchQuestion.schema.json', JSON.stringify(AffiliationSearchQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/affiliationSearchAnswer.schema.json', JSON.stringify(AffiliationSearchAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/booleanQuestion.schema.json', JSON.stringify(BooleanQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/booleanAnswer.schema.json', JSON.stringify(BooleanAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/checkboxesQuestion.schema.json', JSON.stringify(CheckboxesQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/checkboxesAnswer.schema.json', JSON.stringify(CheckboxesAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/currencyQuestion.schema.json', JSON.stringify(CurrencyQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/currencyAnswer.schema.json', JSON.stringify(CurrencyAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/dateQuestion.schema.json', JSON.stringify(DateQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/dateAnswer.schema.json', JSON.stringify(DateAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/dateRangeQuestion.schema.json', JSON.stringify(DateRangeQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/dateRangeAnswer.schema.json', JSON.stringify(DateRangeAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/emailQuestion.schema.json', JSON.stringify(EmailQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/emailAnswer.schema.json', JSON.stringify(EmailAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/licenseSearchQuestion.schema.json', JSON.stringify(LicenseSearchQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/licenseSearchAnswer.schema.json', JSON.stringify(LicenseSearchAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/metadataStandardSearchQuestion.schema.json', JSON.stringify(MetadataStandardSearchQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/metadataStandardSearchAnswer.schema.json', JSON.stringify(MetadataStandardSearchAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/multiselectBoxQuestion.schema.json', JSON.stringify(MultiselectBoxQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/multiselectBoxAnswer.schema.json', JSON.stringify(MultiselectBoxAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/numberQuestion.schema.json', JSON.stringify(NumberQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/numberAnswer.schema.json', JSON.stringify(NumberAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/numberRangeQuestion.schema.json', JSON.stringify(NumberRangeQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/numberRangeAnswer.schema.json', JSON.stringify(NumberRangeAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/numberWithContextQuestion.schema.json', JSON.stringify(NumberWithContextQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/numberWithContextAnswer.schema.json', JSON.stringify(NumberWithContextAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/radioButtonsQuestion.schema.json', JSON.stringify(RadioButtonsQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/radioButtonsAnswer.schema.json', JSON.stringify(RadioButtonsAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/repositorySearchQuestion.schema.json', JSON.stringify(RepositorySearchQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/repositorySearchAnswer.schema.json', JSON.stringify(RepositorySearchAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/researchOutputTableQuestion.schema.json', JSON.stringify(ResearchOutputTableQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/researchOutputTableAnswer.schema.json', JSON.stringify(ResearchOutputTableAnswerSchema, null, 2));

fs.writeFileSync('./schemas/selectBoxQuestion.schema.json', JSON.stringify(SelectBoxQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/selectBoxAnswer.schema.json', JSON.stringify(SelectBoxAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/tableQuestion.schema.json', JSON.stringify(TableQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/tableAnswer.schema.json', JSON.stringify(TableAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/textAreaQuestion.schema.json', JSON.stringify(TextAreaQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/textAreaAnswer.schema.json', JSON.stringify(TextAreaAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/textQuestion.schema.json', JSON.stringify(TextQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/textAnswer.schema.json', JSON.stringify(TextAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/urlQuestion.schema.json', JSON.stringify(URLQuestionJSONSchema, null, 2));
fs.writeFileSync('./schemas/urlAnswer.schema.json', JSON.stringify(URLAnswerJSONSchema, null, 2));

fs.writeFileSync('./schemas/dmpExtension.schema.json', JSON.stringify(ExtensionJSONSchema, null, 2));

console.log('JSON Schema generated!');
