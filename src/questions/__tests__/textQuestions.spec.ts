import {
  DefaultEmailQuestion,
  DefaultTextAreaQuestion,
  DefaultTextQuestion,
  DefaultURLQuestion,
  EmailQuestionSchema,
  TextAreaQuestionSchema,
  TextQuestionSchema,
  URLQuestionSchema,
} from "../textQuestions";

describe("Primitive Questions Zod Schemas", () => {
  it("should validate a valid EmailQuestion", () => {
    const validEmailQuestion = {
      type: "email",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        label: "Email",
        help: "Enter your email address",
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

  it('returns the expected default email', () => {
    const expected = {
      type: "email",
      attributes: { maxLength: 255, multiple: false },
      meta: { schemaVersion: "1.0" }
    };
    expect(DefaultEmailQuestion).toEqual(expected);
  });

  it("should validate a valid TextAreaQuestion", () => {
    const validTextAreaQuestion = {
      type: "textArea",
      meta: {
        schemaVersion: "1.0",
        asRichText: true,
      },
      attributes: {
        label: "Description",
        help: "Enter a description of your project",
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

  it('returns the expected default textArea', () => {
    const expected = {
      type: "textArea",
      attributes: { maxLength: 10000, asRichText: true, cols: 20, rows: 2 },
      meta: { schemaVersion: "1.0" }
    };
    expect(DefaultTextAreaQuestion).toEqual(expected);
  });

  it("should validate a valid TextQuestion", () => {
    const validTextQuestion = {
      type: "text",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        label: "Name",
        help: "Enter your name",
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

  it('returns the expected default text', () => {
    const expected = {
      type: "text",
      attributes: { maxLength: 255 },
      meta: { schemaVersion: "1.0" }
    };
    expect(DefaultTextQuestion).toEqual(expected);
  });

  it("should validate a valid URLQuestion", () => {
    const validURLQuestion = {
      type: "url",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        label: "URL",
        help: "Enter a URL",
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

  it('returns the expected default url', () => {
    const expected = {
      type: "url",
      attributes: { maxLength: 255 },
      meta: { schemaVersion: "1.0" }
    };
    expect(DefaultURLQuestion).toEqual(expected);
  });
});
