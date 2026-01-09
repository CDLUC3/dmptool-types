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

// Use unknown for JSONValue to avoid circular recursive type aliases in tests
type JSONValue = unknown;

// Helper to only assert `comment` when both actual and expected include it anywhere in the structure.
function normalizeForCommentCheck(actualInput: JSONValue, expectedInput: JSONValue) {
  const actual = JSON.parse(JSON.stringify(actualInput)) as JSONValue;
  const expected = JSON.parse(JSON.stringify(expectedInput)) as JSONValue;

  const isPlainObject = (v: JSONValue): v is Record<string, unknown> =>
    v !== null && typeof v === 'object' && !Array.isArray(v as unknown[]);

  function prune(a: JSONValue, e: JSONValue): void {
    if (Array.isArray(e as unknown[]) && Array.isArray(a as unknown[])) {
      const aArr = a as unknown[];
      const eArr = e as unknown[];
      const len = Math.min(aArr.length, eArr.length);
      for (let i = 0; i < len; i++) prune(aArr[i], eArr[i]);
      return;
    }

    if (isPlainObject(e) && isPlainObject(a)) {
      const aObj = a as Record<string, unknown>;
      const eObj = e as Record<string, unknown>;

      // For keys in expected: if it's 'comment' but actual doesn't have it, remove from expected
      for (const key of Object.keys(eObj)) {
        if (key === 'comment') {
          if (!Object.prototype.hasOwnProperty.call(aObj, 'comment')) delete eObj['comment'];
        } else if (Object.prototype.hasOwnProperty.call(aObj, key)) {
          prune(aObj[key], eObj[key]);
        }
      }

      // For keys only in actual: if it's 'comment' but expected doesn't have it, remove from actual
      for (const key of Object.keys(aObj)) {
        if (key === 'comment' && !Object.prototype.hasOwnProperty.call(eObj, 'comment')) {
          delete aObj['comment'];
        }
      }
    }
  }

  prune(actual, expected);
  return { actual, expected };
}

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
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultAffiliationSearchAnswer, expected);
    expect(actual).toEqual(exp);
  });

  it('returns the expected default boolean', () => {
    const expected = {
      type: "boolean",
      answer: false,
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultBooleanAnswer, expected);
    expect(actual).toEqual(exp);
  });

  it('returns the expected default checkBoxes', () => {
    const expected = {
      type: "checkBoxes",
      answer: [],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultCheckboxesAnswer, expected);
    expect(actual).toEqual(exp);
  });

  it('returns the expected default currency', () => {
    const expected = {
      type: "currency",
      answer: 0,
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultCurrencyAnswer, expected);
    expect(actual).toEqual(exp);
  });

  it('returns the expected default date', () => {
    const expected = {
      type: "date",
      answer: "",
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultDateAnswer, expected);
    expect(actual).toEqual(exp);
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
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultDateRangeAnswer, expected);
    expect(actual).toEqual(exp);
  });

  it('returns the expected default email', () => {
    const expected = {
      type: "email",
      answer: "",
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultEmailAnswer, expected);
    expect(actual).toEqual(exp);
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
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultLicenseSearchAnswer, expected);
    expect(actual).toEqual(exp);
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
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultMetadataStandardSearchAnswer, expected);
    expect(actual).toEqual(exp);
  });

  it('returns the expected default multiselectBox', () => {
    const expected = {
      type: "multiselectBox",
      answer: [],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultMultiselectBoxAnswer, expected);
    expect(actual).toEqual(exp);
  });

  it('returns the expected default number', () => {
    const expected = {
      type: "number",
      answer: 0,
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultNumberAnswer, expected);
    expect(actual).toEqual(exp);
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
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultNumberRangeAnswer, expected);
    expect(actual).toEqual(exp);
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
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultNumberWithContextAnswer, expected);
    expect(actual).toEqual(exp);
  });

  it('returns the expected default radioButtons', () => {
    const expected = {
      type: "radioButtons",
      answer: "",
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultRadioButtonsAnswer, expected);
    expect(actual).toEqual(exp);
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
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultRepositorySearchAnswer, expected);
    expect(actual).toEqual(exp);
  });

  it('returns the expected default researchOutputTable', () => {
    const expected = {
      type: "researchOutputTable",
      columnHeadings: ["Title", "Type"],
      answer: [{
        columns: [
          {
            type: "text",
            commonStandardId: 'title',
            answer: "",
            meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
          },
          {
            type: "selectBox",
            commonStandardId: 'type',
            answer: "",
            meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
          }
        ]
      }],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultResearchOutputTableAnswer, expected);
    expect(actual).toEqual(exp);
  });

  it('returns the expected default selectBox', () => {
    const expected = {
      type: "selectBox",
      answer: "",
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultSelectBoxAnswer, expected);
    expect(actual).toEqual(exp);
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
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultTableAnswer, expected);
    expect(actual).toEqual(exp);
  });

  it('returns the expected default text', () => {
    const expected = {
      type: "text",
      answer: "",
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultTextAnswer, expected);
    expect(actual).toEqual(exp);
  });

  it('returns the expected default textArea', () => {
    const expected = {
      type: "textArea",
      answer: "",
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultTextAreaAnswer, expected);
    expect(actual).toEqual(exp);
  });

  it('returns the expected default url', () => {
    const expected = {
      type: "url",
      answer: "",
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    const { actual, expected: exp } = normalizeForCommentCheck(DefaultURLAnswer, expected);
    expect(actual).toEqual(exp);
  });
});
