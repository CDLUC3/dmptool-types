import { describe, it, expect } from "@jest/globals";
import { DateAnswerSchema, DateRangeAnswerSchema } from '../dateAnswers';
import { FilteredSearchAnswerSchema, AffiliationSearchAnswerSchema } from '../graphQLAnswers';
import {
  BooleanAnswerSchema,
  CheckboxesAnswerSchema,
  MultiselectBoxAnswerSchema,
  RadioButtonsAnswerSchema,
  SelectBoxAnswerSchema
} from '../optionBasedAnswers';
import { CurrencyAnswerSchema, NumberAnswerSchema, NumberRangeAnswerSchema,} from '../numberAnswers';
import { EmailAnswerSchema, TextAnswerSchema, TextAreaAnswerSchema, URLAnswerSchema } from '../textAnswers';
import { TableAnswerSchema } from '../tableAnswers';
import { AnyAnswerSchema } from "..";
import { CURRENT_SCHEMA_VERSION } from "../../questions";

describe('Answer Type Validations', () => {
  it('should validate BooleanAnswer', () => {
    const validData = { type: 'boolean', answer: true, meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => BooleanAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = { type: 'boolean', answer: 'true' };
    expect(() => BooleanAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate CheckboxesAnswer', () => {
    const validData = { type: 'checkBoxes', answer: ['option1', 'option2'], meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => CheckboxesAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = { type: 'checkBoxes', answer: 'option1', meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => CheckboxesAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate CurrencyAnswer', () => {
    const validData = { type: 'currency', answer: 100.5, meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => CurrencyAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = { type: 'currency', answer: '100.5', meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => CurrencyAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate DateAnswer', () => {
    const validData = { type: 'date', answer: '2023-10-01', meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => DateAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = { type: 'date', answer: 12345, meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => DateAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate DateRangeAnswer', () => {
    const validData = {
      type: 'dateRange',
      answer: { start: '2023-10-01', end: '2023-10-31' },
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
    };
    expect(() => DateRangeAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = {
      type: 'dateRange',
      answer: { start: '2023-10-01', end: 12345 },
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
    };
    expect(() => DateRangeAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate EmailAnswer', () => {
    const validData = { type: 'email', answer: 'test@example.com', meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => EmailAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = { type: 'email', answer: 12345 };
    expect(() => EmailAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate FilteredSearchAnswer', () => {
    const validData = { type: 'filteredSearch', answer: ['item1', 'item2'], meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => FilteredSearchAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = { type: 'filteredSearch', answer: 'item1', meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => FilteredSearchAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate NumberAnswer', () => {
    const validData = { type: 'number', answer: 42, meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => NumberAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = { type: 'number', answer: '42', meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => NumberAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate NumberRangeAnswer', () => {
    const validData = {
      type: 'numberRange',
      answer: { start: 1, end: 10 },
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
    };
    expect(() => NumberRangeAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = {
      type: 'numberRange',
      answer: { start: '1', end: 10 },
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
    };
    expect(() => NumberRangeAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate RadioButtonsAnswer', () => {
    const validData = { type: 'radioButtons', answer: 'option1', meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => RadioButtonsAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = { type: 'radioButtons', answer: ['option1'], meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => RadioButtonsAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate SelectBoxAnswer', () => {
    const validData = { type: 'selectBox', answer: 'option1', meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => SelectBoxAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = { type: 'selectBox', answer: ['option1'], meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => SelectBoxAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate MultiselectBoxAnswer', () => {
    const validData = { type: 'multiselectBox', answer: ['option1'], meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => MultiselectBoxAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = { type: 'multiselectBox', answer: 'option1', meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => MultiselectBoxAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate TextAnswer', () => {
    const validData = { type: 'text', answer: 'Some text', meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => TextAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = { type: 'text', answer: 12345, meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => TextAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate TextAreaAnswer', () => {
    const validData = { type: 'textArea', answer: 'Some long text', meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => TextAreaAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = { type: 'textArea', answer: 12345, meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => TextAreaAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate AffiliationSearchAnswer', () => {
    const validData = {
      type: 'affiliationSearch',
      answer: {
        affiliationId: '12345',
        affilationName: 'Search term'
      },
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
    };
    expect(() => AffiliationSearchAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = { type: 'affiliationSearch', answer: 12345, meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => AffiliationSearchAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate URLAnswer', () => {
    const validData = { type: 'url', answer: 'https://example.com', meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => URLAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = { type: 'url', answer: 12345, meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => URLAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate TableAnswer', () => {
    const validData = {
      type: 'table',
      columnHeadings: [
        'Name',
        'Age',
      ],
      answer: [
        {
          columns: [
            {
              type: 'text',
              answer: 'Leia Organa',
              meta: {schemaVersion: CURRENT_SCHEMA_VERSION},
            },
            {
              type: 'number',
              answer: 28,
              meta: {schemaVersion: CURRENT_SCHEMA_VERSION},
            },
          ]
        },
        {
          columns: [
            {
              type: 'text',
              answer: 'Han Solo',
              meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
            },
            {
              type: 'number',
              answer: 35,
              meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
            }
          ]
        }
      ],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
    };
    expect(() => TableAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = {
      type: 'table',
      answer: [{ type: 'text', answer: 12345 }],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
    };
    expect(() => TableAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate AnyAnswer', () => {
    const validData = { type: 'text', answer: 'Some text', meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => AnyAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = { type: 'unknown', answer: 'Some text', meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => AnyAnswerSchema.parse(invalidData)).toThrow();
  });
});
