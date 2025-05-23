import fs from 'fs';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { DatePickerQuestionSchema, DateRangeQuestionSchema } from "../src/questions/dateQuestions";
import { CheckboxesQuestionSchema, RadioButtonsQuestionSchema, SelectBoxQuestionSchema } from '../src/questions/optionBasedQuestions'
import { FilteredSearchQuestionSchema, TypeaheadSearchQuestionSchema } from '../src/questions/graphQLQuestions'
import { AnyTableColumnQuestionSchema, TableQuestionSchema } from '../src/questions/tableQuestions'
import { AnyQuestionSchema } from '../src/questions/index';
import {
  BooleanQuestionSchema,
  CurrencyQuestionSchema,
  EmailQuestionSchema,
  NumberQuestionSchema,
  TextAreaQuestionSchema,
  TextQuestionSchema,
  URLQuestionSchema
} from "../src/questions/primitiveQuestions";
import { DatePickerAnswerSchema, DateRangeAnswerSchema } from '../src/answers/dateAnswers';
import { AnyAnswerSchema } from '../src/answers/index';
import { FilteredSearchAnswerSchema, TypeaheadSearchAnswerSchema } from '../src/answers/graphQLAnswers';
import { CheckboxesAnswerSchema, RadioButtonsAnswerSchema, SelectBoxAnswerSchema } from '../src/answers/optionBasedAnswers';
import { AnyTableColumnAnswerSchema, TableAnswerSchema } from '../src/answers/tableAnswers';
import {
  BooleanAnswerSchema,
  CurrencyAnswerSchema,
  EmailAnswerSchema,
  NumberAnswerSchema,
  TextAreaAnswerSchema,
  TextAnswerSchema,
  URLAnswerSchema,
} from '../src/answers/primitiveAnswers';

// Convert the Zod schemas to JSON schemas and then write them to the /schemas folder
const AnyQuestionOutput = zodToJsonSchema(AnyQuestionSchema, 'AnyQuestion');
fs.writeFileSync('./schemas/anyQuestion.schema.json', JSON.stringify(AnyQuestionOutput, null, 2));
const AnyAnswerOutput = zodToJsonSchema(AnyAnswerSchema, 'AnyAnswer');
fs.writeFileSync('./schemas/anyAnswer.schema.json', JSON.stringify(AnyAnswerOutput, null, 2));

const AnyTableColumnQuestionOutput = zodToJsonSchema(AnyTableColumnQuestionSchema, 'AnyTableColumnQuestion');
fs.writeFileSync('./schemas/anyTableColumnQuestion.schema.json', JSON.stringify(AnyTableColumnQuestionOutput, null, 2));
const AnyTableColumnAnswerOutput = zodToJsonSchema(AnyTableColumnAnswerSchema, 'AnyTableColumnAnswer');
fs.writeFileSync('./schemas/anyTableColumnAnswer.schema.json', JSON.stringify(AnyTableColumnAnswerOutput, null, 2));

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

const DatePickerOutput = zodToJsonSchema(DatePickerQuestionSchema, 'DatePickerQuestion');
fs.writeFileSync('./schemas/datePickerQuestion.schema.json', JSON.stringify(DatePickerOutput, null, 2));
const DatePickerAnswerOutput = zodToJsonSchema(DatePickerAnswerSchema, 'DatePickerAnswer');
fs.writeFileSync('./schemas/datePickerAnswer.schema.json', JSON.stringify(DatePickerAnswerOutput, null, 2));

const DateRangeOutput = zodToJsonSchema(DateRangeQuestionSchema, 'DateRangeQuestion');
fs.writeFileSync('./schemas/dateRangeQuestion.schema.json', JSON.stringify(DateRangeOutput, null, 2));
const DateRangeAnswerOutput = zodToJsonSchema(DateRangeAnswerSchema, 'DateRangeAnswer');
fs.writeFileSync('./schemas/dateRangeAnswer.schema.json', JSON.stringify(DateRangeAnswerOutput, null, 2));

const EmailOutput = zodToJsonSchema(EmailQuestionSchema, 'EmailQuestion');
fs.writeFileSync('./schemas/emailQuestion.schema.json', JSON.stringify(EmailOutput, null, 2));
const EmailAnswerOutput = zodToJsonSchema(EmailAnswerSchema, 'EmailAnswer');
fs.writeFileSync('./schemas/emailAnswer.schema.json', JSON.stringify(EmailAnswerOutput, null, 2));

const FilteredSearchOutput = zodToJsonSchema(FilteredSearchQuestionSchema, 'FilteredSearchQuestion');
fs.writeFileSync('./schemas/filteredSearchQuestion.schema.json', JSON.stringify(FilteredSearchOutput, null, 2));
const FilteredSearchAnswerOutput = zodToJsonSchema(FilteredSearchAnswerSchema, 'FilteredSearchAnswer');
fs.writeFileSync('./schemas/filteredSearchAnswer.schema.json', JSON.stringify(FilteredSearchAnswerOutput, null, 2));

const NumberOutput = zodToJsonSchema(NumberQuestionSchema, 'NumberQuestion');
fs.writeFileSync('./schemas/numberQuestion.schema.json', JSON.stringify(NumberOutput, null, 2));
const NumberAnswerOutput = zodToJsonSchema(NumberAnswerSchema, 'NumberAnswer');
fs.writeFileSync('./schemas/numberAnswer.schema.json', JSON.stringify(NumberAnswerOutput, null, 2));

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

const TypeaheadSearchOutput = zodToJsonSchema(TypeaheadSearchQuestionSchema, 'TypeaheadSearchQuestion');
fs.writeFileSync('./schemas/typeaheadSearchQuestion.schema.json', JSON.stringify(TypeaheadSearchOutput, null, 2));
const TypeaheadSearchAnswerOutput = zodToJsonSchema(TypeaheadSearchAnswerSchema, 'TypeaheadSearchAnswer');
fs.writeFileSync('./schemas/typeaheadSearchAnswer.schema.json', JSON.stringify(TypeaheadSearchAnswerOutput, null, 2));

const URLOutput = zodToJsonSchema(URLQuestionSchema, 'URLQuestion');
fs.writeFileSync('./schemas/urlQuestion.schema.json', JSON.stringify(URLOutput, null, 2));
const URLAnswerOutput = zodToJsonSchema(URLAnswerSchema, 'URLAnswer');
fs.writeFileSync('./schemas/urlAnswer.schema.json', JSON.stringify(URLAnswerOutput, null, 2));

console.log('JSON Schema generated!');
