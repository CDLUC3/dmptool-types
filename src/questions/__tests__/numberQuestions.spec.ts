import {
  BooleanQuestionSchema,
  CurrencyQuestionSchema,
  NumberQuestionSchema,
  NumberRangeQuestionSchema,
} from "../numberQuestions";

describe("Primitive Questions Zod Schemas", () => {
  it('optional fields should not throw an error if the value is undefined', () => {
    const validBooleanQuestion = {
      type: "boolean",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        checked: undefined, // Valid value
      },
    };
    expect(() => BooleanQuestionSchema.parse(validBooleanQuestion)).not.toThrow();
  });

  it('optional fields should throw an error if the value is null', () => {
    const invalidBooleanQuestion = {
      type: "boolean",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        checked: null, // Invalid value
      },
    };
    expect(() => BooleanQuestionSchema.parse(invalidBooleanQuestion)).toThrow();
  });

  it("should validate a valid BooleanQuestion", () => {
    const validBooleanQuestion = {
      type: "boolean",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        checked: true,
      },
    };
    expect(() => BooleanQuestionSchema.parse(validBooleanQuestion)).not.toThrow();
  });

  it("should invalidate an invalid BooleanQuestion", () => {
    const invalidBooleanQuestion = {
      type: "boolean",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        checked: "true", // Invalid type
      },
    };
    expect(() => BooleanQuestionSchema.parse(invalidBooleanQuestion)).toThrow();
  });

  it("should validate a valid CurrencyQuestion", () => {
    const validCurrencyQuestion = {
      type: "currency",
      meta: {
        schemaVersion: "1.0",
        denomination: "USD",
      },
      attributes: {
        max: 100,
        min: 1,
        step: 0.01,
      },
    };
    expect(() => CurrencyQuestionSchema.parse(validCurrencyQuestion)).not.toThrow();
  });

  it("should invalidate an invalid CurrencyQuestion", () => {
    const invalidCurrencyQuestion = {
      type: "currency",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        max: "100", // Invalid type
      },
    };
    expect(() => CurrencyQuestionSchema.parse(invalidCurrencyQuestion)).toThrow();
  });

  it("should validate a valid NumberQuestion", () => {
    const validNumberQuestion = {
      type: "number",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        max: 100,
        min: 0,
        step: 1,
      },
    };
    expect(() => NumberQuestionSchema.parse(validNumberQuestion)).not.toThrow();
  });

  it("should invalidate an invalid NumberQuestion", () => {
    const invalidNumberQuestion = {
      type: "number",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        step: "1", // Invalid type
      },
    };
    expect(() => NumberQuestionSchema.parse(invalidNumberQuestion)).toThrow();
  });

  it("should validate a valid NumberRangeQuestion", () => {
    const validNumberRangeQuestion = {
      type: "numberRange",
      meta: {
        schemaVersion: "1.0",
      },
      columns: {
        start: {
          type: "number",
          attributes: {
            label: "Start",
            min: 0,
            max: 50,
            step: 1,
          },
          meta: {
            schemaVersion: "1.0",
          },
        },
        end: {
          type: "number",
          attributes: {
            label: "End",
            min: 50,
            max: 100,
            step: 1,
          },
          meta: {
            schemaVersion: "1.0",
          },
        },
      },
    };
    expect(() => NumberRangeQuestionSchema.parse(validNumberRangeQuestion)).not.toThrow();
  });

  it("should invalidate an invalid NumberRangeQuestion", () => {
    const invalidNumberRangeQuestion = {
      type: "numberRange",
      meta: {
        schemaVersion: "1.0",
      },
      columns: {
        start: {
          type: "number",
          attributes: {
            min: 0,
            max: 50,
          },
          meta: {
            schemaVersion: "1.0",
          },
        },
        end: {
          type: "number",
          attributes: {
            label: "End",
            min: 50,
            max: 100,
            step: 1,
          },
          meta: {
            schemaVersion: "1.0",
          },
        },
      },
    };
    expect(() => NumberRangeQuestionSchema.parse(invalidNumberRangeQuestion)).toThrow();
  });
});
