import {
  CurrencyQuestionSchema,
  NumberQuestionSchema,
  NumberRangeQuestionSchema, NumberWithContextQuestionSchema,
} from "../numberQuestions";

describe("Number Questions Zod Schemas", () => {
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
        attributes: {
          label: "Range",
          help: "Enter a range"
        },
        columns: {
          start: {
            label: "Start",
            help: "Enter a starting number",
            min: 0,
            max: 50,
            step: 1,
          },
          end: {
            label: "End",
            help: "Enter an ending number",
            min: 50,
            max: 100,
            step: 1,
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
            min: 0,
            max: 50,
          },
          end: {
            label: "End",
            min: 50,
            max: "100",
            step: 1,
          },
        },
      };
      expect(() => NumberRangeQuestionSchema.parse(invalidNumberRangeQuestion)).toThrow();
    });

    it("should validate a valid NumberWithContext", () => {
      const validNumberQuestion = {
        type: "numberWithContext",
        meta: {
          schemaVersion: "1.0",
        },
        attributes: {
          max: 100,
          min: 0,
          step: 1,
          context: [
            {
              label: "MB (megabytes)",
              value: "mb",
            },
            {
              label: "GB (gigabytes)",
              value: "gb",
            },
          ]
        },
      };
      expect(() => NumberWithContextQuestionSchema.parse(validNumberQuestion)).not.toThrow();
    });

    it("should invalidate an invalid NumberWithContext", () => {
      const invalidNumberQuestion = {
        type: "numberWithContext",
        meta: {
          schemaVersion: "1.0",
        },
        attributes: {
          step: "1", // Invalid type
        },
      };
      expect(() => NumberWithContextQuestionSchema.parse(invalidNumberQuestion)).toThrow();
    });
});
