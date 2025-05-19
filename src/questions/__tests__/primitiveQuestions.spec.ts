import {
  BooleanQuestionSchema,
  CurrencyQuestionSchema,
  EmailQuestionSchema,
  NumberQuestionSchema,
  TextAreaQuestionSchema,
  TextQuestionSchema,
  URLQuestionSchema,
} from "../primitiveQuestions";

describe("Primitive Questions Zod Schemas", () => {
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

  it("should validate a valid EmailQuestion", () => {
    const validEmailQuestion = {
      type: "email",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        maxLength: 50,
        minLength: 5,
        multiple: true,
        pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
      },
    };
    expect(() => EmailQuestionSchema.parse(validEmailQuestion)).not.toThrow();
  });

  it("should invalidate an invalid EmailQuestion", () => {
    const invalidEmailQuestion = {
      type: "email",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        maxLength: "50", // Invalid type
      },
    };
    expect(() => EmailQuestionSchema.parse(invalidEmailQuestion)).toThrow();
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

  it("should validate a valid TextAreaQuestion", () => {
    const validTextAreaQuestion = {
      type: "textArea",
      meta: {
        schemaVersion: "1.0",
        asRichText: true,
      },
      attributes: {
        cols: 30,
        rows: 5,
        maxLength: 500,
        minLength: 10,
      },
    };
    expect(() => TextAreaQuestionSchema.parse(validTextAreaQuestion)).not.toThrow();
  });

  it("should invalidate an invalid TextAreaQuestion", () => {
    const invalidTextAreaQuestion = {
      type: "textArea",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        cols: "30", // Invalid type
      },
    };
    expect(() => TextAreaQuestionSchema.parse(invalidTextAreaQuestion)).toThrow();
  });

  it("should validate a valid TextQuestion", () => {
    const validTextQuestion = {
      type: "text",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        maxLength: 100,
        minLength: 1,
        pattern: "^[a-zA-Z]+$",
      },
    };
    expect(() => TextQuestionSchema.parse(validTextQuestion)).not.toThrow();
  });

  it("should invalidate an invalid TextQuestion", () => {
    const invalidTextQuestion = {
      type: "text",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        maxLength: "100", // Invalid type
      },
    };
    expect(() => TextQuestionSchema.parse(invalidTextQuestion)).toThrow();
  });

  it("should validate a valid URLQuestion", () => {
    const validURLQuestion = {
      type: "url",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        maxLength: 200,
        minLength: 10,
        pattern: "https?://.+",
      },
    };
    expect(() => URLQuestionSchema.parse(validURLQuestion)).not.toThrow();
  });

  it("should invalidate an invalid URLQuestion", () => {
    const invalidURLQuestion = {
      type: "url",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        maxLength: "200", // Invalid type
      },
    };
    expect(() => URLQuestionSchema.parse(invalidURLQuestion)).toThrow();
  });
});
