import { CURRENT_SCHEMA_VERSION } from "../../questions";
import {
  DefaultAffiliationSearchAnswer,
  DefaultBooleanAnswer,
  DefaultCheckboxesAnswer,
  DefaultCurrencyAnswer,
  DefaultDateAnswer,
  DefaultDateRangeAnswer,
  DefaultEmailAnswer,
  DefaultLicenseSearchAnswer,
  DefaultMetadataStandardSearchAnswer,
  DefaultMultiselectBoxAnswer,
  DefaultNumberAnswer,
  DefaultNumberRangeAnswer,
  DefaultNumberWithContextAnswer,
  DefaultRadioButtonsAnswer,
  DefaultRepositorySearchAnswer,
  DefaultResearchOutputTableAnswer,
  DefaultSelectBoxAnswer,
  DefaultTableAnswer,
  DefaultTextAnswer,
  DefaultTextAreaAnswer,
  DefaultURLAnswer,
} from "../index";

describe('Get question answer defaultJSON', () => {
  it('returns the expected default affiliationSearch', () => {
    const expected = {
      type: "affiliationSearch",
      answer: {
        affiliationId: "",
        affiliationName: "",
      },
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultAffiliationSearchAnswer).toEqual(expected);
  });

  it('returns the expected default boolean', () => {
    const expected = {
      type: "boolean",
      answer: false,
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultBooleanAnswer).toEqual(expected);
  });

  it('returns the expected default checkBoxes', () => {
    const expected = {
      type: "checkBoxes",
      answer: [],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultCheckboxesAnswer).toEqual(expected);
  });

  it('returns the expected default currency', () => {
    const expected = {
      type: "currency",
      answer: 0,
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultCurrencyAnswer).toEqual(expected);
  });

  it('returns the expected default date', () => {
    const expected = {
      type: "date",
      answer: "",
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultDateAnswer).toEqual(expected);
  });

  it('returns the expected default dateRange', () => {
    const expected = {
      type: "dateRange",
      answer: {
        start: "",
        end: "",
      },
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultDateRangeAnswer).toEqual(expected);
  });

  it('returns the expected default email', () => {
    const expected = {
      type: "email",
      answer: "",
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultEmailAnswer).toEqual(expected);
  });

  it('returns the expected default licenseSearch', () => {
    const expected = {
      type: "licenseSearch",
      answer: [{
        licenseId: "",
        licenseName: "",
      }],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultLicenseSearchAnswer).toEqual(expected);
  });

  it('returns the expected default metadataStandardSearch', () => {
    const expected = {
      type: "metadataStandardSearch",
      answer: [{
        metadataStandardId: "",
        metadataStandardName: "",
      }],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultMetadataStandardSearchAnswer).toEqual(expected);
  });

  it('returns the expected default multiselectBox', () => {
    const expected = {
      type: "multiselectBox",
      answer: [],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultMultiselectBoxAnswer).toEqual(expected);
  });

  it('returns the expected default number', () => {
    const expected = {
      type: "number",
      answer: 0,
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultNumberAnswer).toEqual(expected);
  });

  it('returns the expected default numberRange', () => {
    const expected = {
      type: "numberRange",
      answer: {
        start: 0,
        end: 0,
      },
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultNumberRangeAnswer).toEqual(expected);
  });

  it('returns the expected default numberWithContext', () => {
    const expected = {
      type: "numberWithContext",
      answer: {
        value: 0,
        context: "",
      },
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultNumberWithContextAnswer).toEqual(expected);
  });

  it('returns the expected default radioButtons', () => {
    const expected = {
      type: "radioButtons",
      answer: "",
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultRadioButtonsAnswer).toEqual(expected);
  });

  it('returns the expected default repositorySearch', () => {
    const expected = {
      type: "repositorySearch",
      answer: [{
        repositoryId: "",
        repositoryName: "",
      }],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultRepositorySearchAnswer).toEqual(expected);
  });

  it('returns the expected default researchOutputTable', () => {
    const expected = {
      type: "researchOutputTable",
      columnHeadings: ["Title", "Type"],
      answer: [{
        columns: [
          {
            type: "text",
            answer: "",
            meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
          },
          {
            type: "selectBox",
            answer: "",
            meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
          }
        ]
      }],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultResearchOutputTableAnswer).toEqual(expected);
  });

  it('returns the expected default selectBox', () => {
    const expected = {
      type: "selectBox",
      answer: "",
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultSelectBoxAnswer).toEqual(expected);
  });

  it('returns the expected default table', () => {
    const expected = {
      type: "table",
      columnHeadings: ["Column A"],
      answer: [{
        columns: [{
          type: "textArea",
          answer: "",
          meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
        }]
      }],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultTableAnswer).toEqual(expected);
  });

  it('returns the expected default text', () => {
    const expected = {
      type: "text",
      answer: "",
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultTextAnswer).toEqual(expected);
  });

  it('returns the expected default textArea', () => {
    const expected = {
      type: "textArea",
      answer: "",
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultTextAreaAnswer).toEqual(expected);
  });

  it('returns the expected default url', () => {
    const expected = {
      type: "url",
      answer: "",
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(DefaultURLAnswer).toEqual(expected);
  });
});
