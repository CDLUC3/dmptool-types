import fs from 'fs';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Question imports
import { AnyQuestionSchema } from '../src/questions/index';
import {
  DateQuestionSchema,
  DateRangeQuestionSchema
} from "../src/questions/dateQuestions";
import {
  BooleanQuestionSchema,
  CheckboxesQuestionSchema,
  MultiselectBoxQuestionSchema,
  RadioButtonsQuestionSchema,
  SelectBoxQuestionSchema
} from '../src/questions/optionBasedQuestions'
import {
  AffiliationSearchQuestionSchema,
  // FilteredSearchQuestionSchema,
} from '../src/questions/graphQLQuestions'
import {
  AnyTableColumnQuestionSchema,
  TableQuestionSchema
} from '../src/questions/tableQuestions'
import {
  CurrencyQuestionSchema,
  NumberQuestionSchema,
  NumberRangeQuestionSchema
} from "../src/questions/numberQuestions";
import {
  EmailQuestionSchema,
  TextAreaQuestionSchema,
  TextQuestionSchema,
  URLQuestionSchema
} from "../src/questions/textQuestions";

// Answer imports
import { AnyAnswerSchema } from '../src/answers/index';
import {
  DateAnswerSchema,
  DateRangeAnswerSchema
} from '../src/answers/dateAnswers';

import {
  AffiliationSearchAnswerSchema,
  // FilteredSearchAnswerSchema,
} from '../src/answers/graphQLAnswers';
import {
  BooleanAnswerSchema,
  CheckboxesAnswerSchema,
  MultiselectBoxAnswerSchema,
  RadioButtonsAnswerSchema,
  SelectBoxAnswerSchema
} from '../src/answers/optionBasedAnswers';
import {
  AnyTableColumnAnswerSchema,
  TableAnswerSchema
} from '../src/answers/tableAnswers';
import {
  CurrencyAnswerSchema,
  NumberAnswerSchema,
  NumberRangeAnswerSchema
} from '../src/answers/numberAnswers';
import {
  EmailAnswerSchema,
  TextAreaAnswerSchema,
  TextAnswerSchema,
  URLAnswerSchema
} from '../src/answers/textAnswers';

// Convert the Zod schemas to JSON schemas and then write them to the /schemas folder
const AnyQuestionOutput = zodToJsonSchema(AnyQuestionSchema, 'AnyQuestion');
fs.writeFileSync('./schemas/anyQuestion.schema.json', JSON.stringify(AnyQuestionOutput, null, 2));
const AnyAnswerOutput = zodToJsonSchema(AnyAnswerSchema, 'AnyAnswer');
fs.writeFileSync('./schemas/anyAnswer.schema.json', JSON.stringify(AnyAnswerOutput, null, 2));

const AnyTableColumnQuestionOutput = zodToJsonSchema(AnyTableColumnQuestionSchema, 'AnyTableColumnQuestion');
fs.writeFileSync('./schemas/anyTableColumnQuestion.schema.json', JSON.stringify(AnyTableColumnQuestionOutput, null, 2));
const AnyTableColumnAnswerOutput = zodToJsonSchema(AnyTableColumnAnswerSchema, 'AnyTableColumnAnswer');
fs.writeFileSync('./schemas/anyTableColumnAnswer.schema.json', JSON.stringify(AnyTableColumnAnswerOutput, null, 2));

const AffiliationSearchOutput = zodToJsonSchema(AffiliationSearchQuestionSchema, 'AffiliationSearchQuestion');
fs.writeFileSync('./schemas/affiliationSearchQuestion.schema.json', JSON.stringify(AffiliationSearchOutput, null, 2));
const AffiliationSearchAnswerOutput = zodToJsonSchema(AffiliationSearchAnswerSchema, 'AffiliationSearchAnswer');
fs.writeFileSync('./schemas/affiliationSearchAnswer.schema.json', JSON.stringify(AffiliationSearchAnswerOutput, null, 2));

const BooleanOutput = zodToJsonSchema(BooleanQuestionSchema, 'BooleanQuestion');
fs.writeFileSync('./schemas/booleanQuestion.schema.json', JSON.stringify(BooleanOutput, null, 2));
const BooleanAnswerOutput = zodToJsonSchema(BooleanAnswerSchema, 'BooleanAnswer');
fs.writeFileSync('./schemas/booleanAnswer.schema.json', JSON.stringify(BooleanAnswerOutput, null, 2));

const CheckboxesOutput = zodToJsonSchema(CheckboxesQuestionSchema, 'CheckboxesQuestion');
fs.writeFileSync('./schemas/checkboxesQuestion.schema.json', JSON.stringify(CheckboxesOutput, null, 2));
const CheckboxesAnswerOutput = zodToJsonSchema(CheckboxesAnswerSchema, 'CheckboxesAnswer');
fs.writeFileSync('./schemas/checkboxesAnswer.schema.json', JSON.stringify(CheckboxesAnswerOutput, null, 2));

const CurrencyOutput = zodToJsonSchema(CurrencyQuestionSchema, 'CurrencyQuestion');
fs.writeFileSync('./schemas/currencyQuestion.schema.json', JSON.stringify(CurrencyOutput, null, 2));
const CurrencyAnswerOutput = zodToJsonSchema(CurrencyAnswerSchema, 'CurrencyAnswer');
fs.writeFileSync('./schemas/currencyAnswer.schema.json', JSON.stringify(CurrencyAnswerOutput, null, 2));

const DateOutput = zodToJsonSchema(DateQuestionSchema, 'DateQuestion');
fs.writeFileSync('./schemas/dateQuestion.schema.json', JSON.stringify(DateOutput, null, 2));
const DateAnswerOutput = zodToJsonSchema(DateAnswerSchema, 'DateAnswer');
fs.writeFileSync('./schemas/dateAnswer.schema.json', JSON.stringify(DateAnswerOutput, null, 2));

const DateRangeOutput = zodToJsonSchema(DateRangeQuestionSchema, 'DateRangeQuestion');
fs.writeFileSync('./schemas/dateRangeQuestion.schema.json', JSON.stringify(DateRangeOutput, null, 2));
const DateRangeAnswerOutput = zodToJsonSchema(DateRangeAnswerSchema, 'DateRangeAnswer');
fs.writeFileSync('./schemas/dateRangeAnswer.schema.json', JSON.stringify(DateRangeAnswerOutput, null, 2));

const EmailOutput = zodToJsonSchema(EmailQuestionSchema, 'EmailQuestion');
fs.writeFileSync('./schemas/emailQuestion.schema.json', JSON.stringify(EmailOutput, null, 2));
const EmailAnswerOutput = zodToJsonSchema(EmailAnswerSchema, 'EmailAnswer');
fs.writeFileSync('./schemas/emailAnswer.schema.json', JSON.stringify(EmailAnswerOutput, null, 2));

// const FilteredSearchOutput = zodToJsonSchema(FilteredSearchQuestionSchema, 'FilteredSearchQuestion');
// fs.writeFileSync('./schemas/filteredSearchQuestion.schema.json', JSON.stringify(FilteredSearchOutput, null, 2));
// const FilteredSearchAnswerOutput = zodToJsonSchema(FilteredSearchAnswerSchema, 'FilteredSearchAnswer');
// fs.writeFileSync('./schemas/filteredSearchAnswer.schema.json', JSON.stringify(FilteredSearchAnswerOutput, null, 2));

const MultiselectBoxOutput = zodToJsonSchema(MultiselectBoxQuestionSchema, 'MultiselectBoxQuestion');
fs.writeFileSync('./schemas/multiselectBoxQuestion.schema.json', JSON.stringify(MultiselectBoxOutput, null, 2));
const MultiselectBoxAnswerOutput = zodToJsonSchema(MultiselectBoxAnswerSchema, 'MultiselectBoxAnswer');
fs.writeFileSync('./schemas/multiselectBoxAnswer.schema.json', JSON.stringify(MultiselectBoxAnswerOutput, null, 2));

const NumberOutput = zodToJsonSchema(NumberQuestionSchema, 'NumberQuestion');
fs.writeFileSync('./schemas/numberQuestion.schema.json', JSON.stringify(NumberOutput, null, 2));
const NumberAnswerOutput = zodToJsonSchema(NumberAnswerSchema, 'NumberAnswer');
fs.writeFileSync('./schemas/numberAnswer.schema.json', JSON.stringify(NumberAnswerOutput, null, 2));

const NumberRangeOutput = zodToJsonSchema(NumberRangeQuestionSchema, 'NumberRangeQuestion');
fs.writeFileSync('./schemas/numberRangeQuestion.schema.json', JSON.stringify(NumberRangeOutput, null, 2));
const NumberRangeAnswerOutput = zodToJsonSchema(NumberRangeAnswerSchema, 'NumberRangeAnswer');
fs.writeFileSync('./schemas/numberRangeAnswer.schema.json', JSON.stringify(NumberRangeAnswerOutput, null, 2));

const RadioButtonsOutput = zodToJsonSchema(RadioButtonsQuestionSchema, 'RadioButtonsQuestion');
fs.writeFileSync('./schemas/radioButtonsQuestion.schema.json', JSON.stringify(RadioButtonsOutput, null, 2));
const RadioButtonsAnswerOutput = zodToJsonSchema(RadioButtonsAnswerSchema, 'RadioButtonsAnswer');
fs.writeFileSync('./schemas/radioButtonsAnswer.schema.json', JSON.stringify(RadioButtonsAnswerOutput, null, 2));

const SelectBoxOutput = zodToJsonSchema(SelectBoxQuestionSchema, 'SelectBoxQuestion');
fs.writeFileSync('./schemas/selectBoxQuestion.schema.json', JSON.stringify(SelectBoxOutput, null, 2));
const SelectBoxAnswerOutput = zodToJsonSchema(SelectBoxAnswerSchema, 'SelectBoxAnswer');
fs.writeFileSync('./schemas/selectBoxAnswer.schema.json', JSON.stringify(SelectBoxAnswerOutput, null, 2));

const TableOutput = zodToJsonSchema(TableQuestionSchema, 'TableQuestion');
fs.writeFileSync('./schemas/tableQuestion.schema.json', JSON.stringify(TableOutput, null, 2));
const TableAnswerOutput = zodToJsonSchema(TableAnswerSchema, 'TableAnswer');
fs.writeFileSync('./schemas/tableAnswer.schema.json', JSON.stringify(TableAnswerOutput, null, 2));

const TextAreaOutput = zodToJsonSchema(TextAreaQuestionSchema, 'TextAreaQuestion');
fs.writeFileSync('./schemas/textAreaQuestion.schema.json', JSON.stringify(TextAreaOutput, null, 2));
const TextAreaAnswerOutput = zodToJsonSchema(TextAreaAnswerSchema, 'TextAreaAnswer');
fs.writeFileSync('./schemas/textAreaAnswer.schema.json', JSON.stringify(TextAreaAnswerOutput, null, 2));

const TextOutput = zodToJsonSchema(TextQuestionSchema, 'TextQuestion');
fs.writeFileSync('./schemas/textQuestion.schema.json', JSON.stringify(TextOutput, null, 2));
const TextAnswerOutput = zodToJsonSchema(TextAnswerSchema, 'TextAnswer');
fs.writeFileSync('./schemas/textAnswer.schema.json', JSON.stringify(TextAnswerOutput, null, 2));

const URLOutput = zodToJsonSchema(URLQuestionSchema, 'URLQuestion');
fs.writeFileSync('./schemas/urlQuestion.schema.json', JSON.stringify(URLOutput, null, 2));
const URLAnswerOutput = zodToJsonSchema(URLAnswerSchema, 'URLAnswer');
fs.writeFileSync('./schemas/urlAnswer.schema.json', JSON.stringify(URLAnswerOutput, null, 2));

console.log('JSON Schema generated!');
