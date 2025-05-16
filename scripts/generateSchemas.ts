import fs from 'fs';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { DatePickerQuestion, DateRangeQuestion } from "../src/questions/dateQuestions";
import { CheckboxesQuestion, RadioButtonsQuestion, SelectBoxQuestion } from '../src/questions/optionBasedQuestions'
import { FilteredSearchQuestion, TypeaheadSearchQuestion } from '../src/questions/graphQLQuestions'
import { AnyTableColumnQuestion, TableQuestion } from '../src/questions/tableQuestions'
import { AnyQuestion } from '../src/questions/index';
import {
  BooleanQuestion,
  CurrencyQuestion,
  EmailQuestion,
  NumberQuestion,
  TextAreaQuestion,
  TextQuestion,
  URLQuestion
} from "../src/questions/primitiveQuestions";
import { DatePickerAnswer, DateRangeAnswer } from '../src/answers/dateAnswers';
import { AnyAnswer } from '../src/answers/index';
import { FilteredSearchAnswer, TypeaheadSearchAnswer } from '../src/answers/graphQLAnswers';
import { CheckboxesAnswer, RadioButtonsAnswer, SelectBoxAnswer } from '../src/answers/optionBasedAnswers';
import { AnyTableColumnAnswer, TableAnswer } from '../src/answers/tableAnswers';
import {
  BooleanAnswer,
  CurrencyAnswer,
  EmailAnswer,
  NumberAnswer,
  TextAreaAnswer,
  TextAnswer,
  URLAnswer,
} from '../src/answers/primitiveAnswers';

// Convert the Zod schemas to JSON schemas and then write them to the /schemas folder
const AnyQuestionSchema = zodToJsonSchema(AnyQuestion, 'AnyQuestion');
fs.writeFileSync('./schemas/anyQuestion.schema.json', JSON.stringify(AnyQuestionSchema, null, 2));
const AnyAnswerSchema = zodToJsonSchema(AnyAnswer, 'AnyAnswer');
fs.writeFileSync('./schemas/anyAnswer.schema.json', JSON.stringify(AnyAnswerSchema, null, 2));

const AnyTableColumnQuestionSchema = zodToJsonSchema(AnyTableColumnQuestion, 'AnyTableColumnQuestion');
fs.writeFileSync('./schemas/anyTableColumnQuestion.schema.json', JSON.stringify(AnyTableColumnQuestionSchema, null, 2));
const AnyTableColumnAnswerSchema = zodToJsonSchema(AnyTableColumnAnswer, 'AnyTableColumnAnswer');
fs.writeFileSync('./schemas/anyTableColumnAnswer.schema.json', JSON.stringify(AnyTableColumnAnswerSchema, null, 2));

const BooleanSchema = zodToJsonSchema(BooleanQuestion, 'BooleanQuestion');
fs.writeFileSync('./schemas/booleanQuestion.schema.json', JSON.stringify(BooleanSchema, null, 2));
const BooleanAnswerSchema = zodToJsonSchema(BooleanAnswer, 'BooleanAnswer');
fs.writeFileSync('./schemas/booleanAnswer.schema.json', JSON.stringify(BooleanAnswerSchema, null, 2));

const CheckboxesSchema = zodToJsonSchema(CheckboxesQuestion, 'CheckboxesQuestion');
fs.writeFileSync('./schemas/checkboxesQuestion.schema.json', JSON.stringify(CheckboxesSchema, null, 2));
const CheckboxesAnswerSchema = zodToJsonSchema(CheckboxesAnswer, 'CheckboxesAnswer');
fs.writeFileSync('./schemas/checkboxesAnswer.schema.json', JSON.stringify(CheckboxesAnswerSchema, null, 2));

const CurrencySchema = zodToJsonSchema(CurrencyQuestion, 'CurrencyQuestion');
fs.writeFileSync('./schemas/currencyQuestion.schema.json', JSON.stringify(CurrencySchema, null, 2));
const CurrencyAnswerSchema = zodToJsonSchema(CurrencyAnswer, 'CurrencyAnswer');
fs.writeFileSync('./schemas/currencyAnswer.schema.json', JSON.stringify(CurrencyAnswerSchema, null, 2));

const DatePickerSchema = zodToJsonSchema(DatePickerQuestion, 'DatePickerQuestion');
fs.writeFileSync('./schemas/datePickerQuestion.schema.json', JSON.stringify(DatePickerSchema, null, 2));
const DatePickerAnswerSchema = zodToJsonSchema(DatePickerAnswer, 'DatePickerAnswer');
fs.writeFileSync('./schemas/datePickerAnswer.schema.json', JSON.stringify(DatePickerAnswerSchema, null, 2));

const DateRangeSchema = zodToJsonSchema(DateRangeQuestion, 'DateRangeQuestion');
fs.writeFileSync('./schemas/dateRangeQuestion.schema.json', JSON.stringify(DateRangeSchema, null, 2));
const DateRangeAnswerSchema = zodToJsonSchema(DateRangeAnswer, 'DateRangeAnswer');
fs.writeFileSync('./schemas/dateRangeAnswer.schema.json', JSON.stringify(DateRangeAnswerSchema, null, 2));

const EmailSchema = zodToJsonSchema(EmailQuestion, 'EmailQuestion');
fs.writeFileSync('./schemas/emailQuestion.schema.json', JSON.stringify(EmailSchema, null, 2));
const EmailAnswerSchema = zodToJsonSchema(EmailAnswer, 'EmailAnswer');
fs.writeFileSync('./schemas/emailAnswer.schema.json', JSON.stringify(EmailAnswerSchema, null, 2));

const FilteredSearchSchema = zodToJsonSchema(FilteredSearchQuestion, 'FilteredSearchQuestion');
fs.writeFileSync('./schemas/filteredSearchQuestion.schema.json', JSON.stringify(FilteredSearchSchema, null, 2));
const FilteredSearchAnswerSchema = zodToJsonSchema(FilteredSearchAnswer, 'FilteredSearchAnswer');
fs.writeFileSync('./schemas/filteredSearchAnswer.schema.json', JSON.stringify(FilteredSearchAnswerSchema, null, 2));

const NumberSchema = zodToJsonSchema(NumberQuestion, 'NumberQuestion');
fs.writeFileSync('./schemas/numberQuestion.schema.json', JSON.stringify(NumberSchema, null, 2));
const NumberAnswerSchema = zodToJsonSchema(NumberAnswer, 'NumberAnswer');
fs.writeFileSync('./schemas/numberAnswer.schema.json', JSON.stringify(NumberAnswerSchema, null, 2));

const RadioButtonsSchema = zodToJsonSchema(RadioButtonsQuestion, 'RadioButtonsQuestion');
fs.writeFileSync('./schemas/radioButtonsQuestion.schema.json', JSON.stringify(RadioButtonsSchema, null, 2));
const RadioButtonsAnswerSchema = zodToJsonSchema(RadioButtonsAnswer, 'RadioButtonsAnswer');
fs.writeFileSync('./schemas/radioButtonsAnswer.schema.json', JSON.stringify(RadioButtonsAnswerSchema, null, 2));

const SelectBoxSchema = zodToJsonSchema(SelectBoxQuestion, 'SelectBoxQuestion');
fs.writeFileSync('./schemas/selectBoxQuestion.schema.json', JSON.stringify(SelectBoxSchema, null, 2));
const SelectBoxAnswerSchema = zodToJsonSchema(SelectBoxAnswer, 'SelectBoxAnswer');
fs.writeFileSync('./schemas/selectBoxAnswer.schema.json', JSON.stringify(SelectBoxAnswerSchema, null, 2));

const TableSchema = zodToJsonSchema(TableQuestion, 'TableQuestion');
fs.writeFileSync('./schemas/tableQuestion.schema.json', JSON.stringify(TableSchema, null, 2));
const TableAnswerSchema = zodToJsonSchema(TableAnswer, 'TableAnswer');
fs.writeFileSync('./schemas/tableAnswer.schema.json', JSON.stringify(TableAnswerSchema, null, 2));

const TextAreaSchema = zodToJsonSchema(TextAreaQuestion, 'TextAreaQuestion');
fs.writeFileSync('./schemas/textAreaQuestion.schema.json', JSON.stringify(TextAreaSchema, null, 2));
const TextAreaAnswerSchema = zodToJsonSchema(TextAreaAnswer, 'TextAreaAnswer');
fs.writeFileSync('./schemas/textAreaAnswer.schema.json', JSON.stringify(TextAreaAnswerSchema, null, 2));

const TextSchema = zodToJsonSchema(TextQuestion, 'TextQuestion');
fs.writeFileSync('./schemas/textQuestion.schema.json', JSON.stringify(TextSchema, null, 2));
const TextAnswerSchema = zodToJsonSchema(TextAnswer, 'TextAnswer');
fs.writeFileSync('./schemas/textAnswer.schema.json', JSON.stringify(TextAnswerSchema, null, 2));

const TypeaheadSearchSchema = zodToJsonSchema(TypeaheadSearchQuestion, 'TypeaheadSearchQuestion');
fs.writeFileSync('./schemas/typeaheadSearchQuestion.schema.json', JSON.stringify(TypeaheadSearchSchema, null, 2));
const TypeaheadSearchAnswerSchema = zodToJsonSchema(TypeaheadSearchAnswer, 'TypeaheadSearchAnswer');
fs.writeFileSync('./schemas/typeaheadSearchAnswer.schema.json', JSON.stringify(TypeaheadSearchAnswerSchema, null, 2));

const URLSchema = zodToJsonSchema(URLQuestion, 'URLQuestion');
fs.writeFileSync('./schemas/urlQuestion.schema.json', JSON.stringify(URLSchema, null, 2));
const URLAnswerSchema = zodToJsonSchema(URLAnswer, 'URLAnswer');
fs.writeFileSync('./schemas/urlAnswer.schema.json', JSON.stringify(URLAnswerSchema, null, 2));

console.log('JSON Schema generated!');
