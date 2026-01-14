import { describe, it, expect } from "@jest/globals";
import { DateAnswerSchema, DateRangeAnswerSchema } from '../dateAnswers';
import {
  AffiliationSearchAnswerSchema,
  RepositorySearchAnswerSchema,
  MetadataStandardSearchAnswerSchema,
  LicenseSearchAnswerSchema
} from '../graphQLAnswers';
import {
  BooleanAnswerSchema,
  CheckboxesAnswerSchema,
  MultiselectBoxAnswerSchema,
  RadioButtonsAnswerSchema,
  SelectBoxAnswerSchema
} from '../optionBasedAnswers';
import {
  CurrencyAnswerSchema,
  NumberAnswerSchema,
  NumberRangeAnswerSchema
} from '../numberAnswers';
import {
  EmailAnswerSchema,
  TextAnswerSchema,
  TextAreaAnswerSchema,
  URLAnswerSchema
} from '../textAnswers';
import {
  ResearchOutputTableAnswerSchema,
  TableAnswerSchema
} from '../tableAnswers';
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

  it('should validate LicenseSearchAnswerSchema', () => {
    const validData = {
      type: 'licenseSearch',
      answer: [
        { licenseId: 'license1', licenseName: 'License One' },
        { licenseId: 'license2', licenseName: 'License Two' }
      ],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
    };
    expect(() => LicenseSearchAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = { type: 'licenseSearch', answer: 'license1', meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => LicenseSearchAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate MetadataStandardSearchAnswerSchema', () => {
    const validData = {
      type: 'metadataStandardSearch',
      answer: [
        { metadataStandardId: 'standard1', metadataStandardName: 'Standard Two' },
        { metadataStandardId: 'standard2', metadataStandardName: 'Standard Two' }
      ],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
    };
    expect(() => MetadataStandardSearchAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = { type: 'metadataStandardSearch', answer: 'standard1', meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => MetadataStandardSearchAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate RepositorySearchAnswerSchema', () => {
    const validData = {
      type: 'repositorySearch',
      answer: [
        { repositoryId: 'repo1', repositoryName: 'Repository One' },
        { repositoryId: 'repo2', repositoryName: 'Repository Two' }
      ],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => RepositorySearchAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = { type: 'repositorySearch', answer: 'repo1', meta: { schemaVersion: CURRENT_SCHEMA_VERSION } };
    expect(() => RepositorySearchAnswerSchema.parse(invalidData)).toThrow();
  });

  it('should validate ResearchOutputTableAnswerSchema', () => {
    const validData = {
      type: 'researchOutputTable',
      answer: [{
        columns: [
          {
            type: 'text',
            commonStandardId: 'title',
            answer: 'This is a test',
            meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
          },
          {
            type: 'textArea',
            commonStandardId: 'description',
            answer: 'This is a longer text answer',
            meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
          },
          {
            type: 'selectBox',
            commonStandardId: 'type',
            answer: 'dataset',
            meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
          },
          {
            type: 'checkBoxes',
            commonStandardId: 'data_flags',
            answer: ['sensitive'],
            meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
          },
          {
            type: 'selectBox',
            commonStandardId: 'data_access',
            answer: 'open',
            meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
          },
          {
            type: 'date',
            commonStandardId: 'issued',
            answer: '2025-11-13',
            meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
          },
          {
            type: 'numberWithContext',
            commonStandardId: 'byte_size',
            answer: { value: 12345, context: 'gb' },
            meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
          },
          {
            type: 'repositorySearch',
            commonStandardId: 'host',
            answer: [{ repositoryId: 'repo1', repositoryName: 'Repository One' }],
            meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
          },
          {
            type: 'metadataStandardSearch',
            commonStandardId: 'metadata',
            answer: [
              { metadataStandardId: 'standard1', metadataStandardName: 'Standard One' },
              { metadataStandardId: 'standard2', metadataStandardName: 'Standard Two' }
            ],
            meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
          },
          {
            type: 'licenseSearch',
            commonStandardId: 'license_ref',
            answer: [{ licenseId: 'license1', licenseName: 'License One' }],
            meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
          }
        ],
      }],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
    };
    expect(() => ResearchOutputTableAnswerSchema.parse(validData)).not.toThrow();

    const invalidData = {
      type: 'researchOutputTable',
      columnHeadings: ['Title', 'Output Type'],
      answer: [{
        columns: [
          {
            type: 'text',
            commonStandardId: 'title',
            answer: 12345,
            meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
          },
          {
            type: 'selectBox',
            commonStandardId: 'type',
            answer: 'dataset',
            meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
          }
        ],
      }],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
    };
    expect(() => ResearchOutputTableAnswerSchema.parse(invalidData)).toThrow();
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
