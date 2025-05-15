import { describe, it, expect } from "@jest/globals";
import {
  BooleanAnswer,
  CheckboxesAnswer,
  CurrencyAnswer,
  DatePickerAnswer,
  DateRangeAnswer,
  EmailAnswer,
  FilteredSearchAnswer,
  NumberAnswer,
  RadioButtonsAnswer,
  SelectBoxAnswer,
  TableAnswer,
  TextAnswer,
  TextAreaAnswer,
  TypeaheadSearchAnswer,
  URLAnswer,
  AnyAnswer,
} from '../answers';

describe('Answer Type Validations', () => {
it('should validate BooleanAnswer', () => {
  const validData = { type: 'boolean', answer: true };
  expect(() => BooleanAnswer.parse(validData)).not.toThrow();

  const invalidData = { type: 'boolean', answer: 'true' };
  expect(() => BooleanAnswer.parse(invalidData)).toThrow();
});

it('should validate CheckboxesAnswer', () => {
  const validData = { type: 'checkBoxes', answer: ['option1', 'option2'] };
  expect(() => CheckboxesAnswer.parse(validData)).not.toThrow();

  const invalidData = { type: 'checkBoxes', answer: 'option1' };
  expect(() => CheckboxesAnswer.parse(invalidData)).toThrow();
});

it('should validate CurrencyAnswer', () => {
  const validData = { type: 'currency', answer: 100.5 };
  expect(() => CurrencyAnswer.parse(validData)).not.toThrow();

  const invalidData = { type: 'currency', answer: '100.5' };
  expect(() => CurrencyAnswer.parse(invalidData)).toThrow();
});

it('should validate DatePickerAnswer', () => {
  const validData = { type: 'datePicker', answer: '2023-10-01' };
  expect(() => DatePickerAnswer.parse(validData)).not.toThrow();

  const invalidData = { type: 'datePicker', answer: 12345 };
  expect(() => DatePickerAnswer.parse(invalidData)).toThrow();
});

it('should validate DateRangeAnswer', () => {
  const validData = {
    type: 'dateRange',
    answer: { start: '2023-10-01', end: '2023-10-31' },
  };
  expect(() => DateRangeAnswer.parse(validData)).not.toThrow();

  const invalidData = {
    type: 'dateRange',
    answer: { start: '2023-10-01', end: 12345 },
  };
  expect(() => DateRangeAnswer.parse(invalidData)).toThrow();
});

it('should validate EmailAnswer', () => {
  const validData = { type: 'email', answer: 'test@example.com' };
  expect(() => EmailAnswer.parse(validData)).not.toThrow();

  const invalidData = { type: 'email', answer: 12345 };
  expect(() => EmailAnswer.parse(invalidData)).toThrow();
});

it('should validate FilteredSearchAnswer', () => {
  const validData = { type: 'filteredSearch', answer: ['item1', 'item2'] };
  expect(() => FilteredSearchAnswer.parse(validData)).not.toThrow();

  const invalidData = { type: 'filteredSearch', answer: 'item1' };
  expect(() => FilteredSearchAnswer.parse(invalidData)).toThrow();
});

it('should validate NumberAnswer', () => {
  const validData = { type: 'number', answer: 42 };
  expect(() => NumberAnswer.parse(validData)).not.toThrow();

  const invalidData = { type: 'number', answer: '42' };
  expect(() => NumberAnswer.parse(invalidData)).toThrow();
});

it('should validate RadioButtonsAnswer', () => {
  const validData = { type: 'radioButtons', answer: 'option1' };
  expect(() => RadioButtonsAnswer.parse(validData)).not.toThrow();

  const invalidData = { type: 'radioButtons', answer: ['option1'] };
  expect(() => RadioButtonsAnswer.parse(invalidData)).toThrow();
});

it('should validate SelectBoxAnswer', () => {
  const validData = { type: 'selectBox', answer: 'option1' };
  expect(() => SelectBoxAnswer.parse(validData)).not.toThrow();

  const invalidData = { type: 'selectBox', answer: ['option1'] };
  expect(() => SelectBoxAnswer.parse(invalidData)).toThrow();
});

it('should validate TextAnswer', () => {
  const validData = { type: 'text', answer: 'Some text' };
  expect(() => TextAnswer.parse(validData)).not.toThrow();

  const invalidData = { type: 'text', answer: 12345 };
  expect(() => TextAnswer.parse(invalidData)).toThrow();
});

it('should validate TextAreaAnswer', () => {
  const validData = { type: 'textArea', answer: 'Some long text' };
  expect(() => TextAreaAnswer.parse(validData)).not.toThrow();

  const invalidData = { type: 'textArea', answer: 12345 };
  expect(() => TextAreaAnswer.parse(invalidData)).toThrow();
});

it('should validate TypeaheadSearchAnswer', () => {
  const validData = { type: 'typeaheadSearch', answer: 'Search term' };
  expect(() => TypeaheadSearchAnswer.parse(validData)).not.toThrow();

  const invalidData = { type: 'typeaheadSearch', answer: 12345 };
  expect(() => TypeaheadSearchAnswer.parse(invalidData)).toThrow();
});

it('should validate URLAnswer', () => {
  const validData = { type: 'url', answer: 'https://example.com' };
  expect(() => URLAnswer.parse(validData)).not.toThrow();

  const invalidData = { type: 'url', answer: 12345 };
  expect(() => URLAnswer.parse(invalidData)).toThrow();
});

it('should validate TableAnswer', () => {
  const validData = {
    type: 'table',
    answer: [
      { type: 'text', answer: 'Row 1' },
      { type: 'number', answer: 42 },
    ],
  };
  expect(() => TableAnswer.parse(validData)).not.toThrow();

  const invalidData = {
    type: 'table',
    answer: [{ type: 'text', answer: 12345 }],
  };
  expect(() => TableAnswer.parse(invalidData)).toThrow();
});

it('should validate AnyAnswer', () => {
  const validData = { type: 'text', answer: 'Some text' };
  expect(() => AnyAnswer.parse(validData)).not.toThrow();

  const invalidData = { type: 'unknown', answer: 'Some text' };
  expect(() => AnyAnswer.parse(invalidData)).toThrow();
});
});
