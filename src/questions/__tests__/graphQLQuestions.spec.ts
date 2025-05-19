import { describe, it, expect } from "@jest/globals";
import { FilteredSearchQuestionSchema, TypeaheadSearchQuestionSchema } from "../graphQLQuestions";

describe("FilteredSearchQuestion schema", () => {
  it("should validate a correct FilteredSearchQuestion object", () => {
    const validData = {
      type: "filteredSearch",
      graphQL: {
        displayFields: [
          { propertyName: "name", label: "Name" },
          { propertyName: "age", label: "Age", labelTranslationKey: "age_key" },
        ],
        query: "query($searchTerm: String!, $minAge: Int!) { users(searchTerm: $searchTerm, minAge: $minAge) { name age } }",
        responseField: "data",
        variables: [
          { name: "searchTerm", type: "string", defaultValue: "default" },
          { name: "minAge", type: "number", minLength: 1 },
        ],
      },
      attributes: {
        multiple: true,
      },
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => FilteredSearchQuestionSchema.parse(validData)).not.toThrow();
  });

  it("should throw an error for an invalid FilteredSearchQuestion object", () => {
    const invalidData = {
      type: "filteredSearch",
      graphQL: {
        displayFields: [
          { propertyName: "name", label: "Name" },
        ],
        responseField: "data",
        variables: [
          { name: "searchTerm", type: "string" },
        ],
      },
      attributes: {
        multiple: "notABoolean", // Invalid type
      },
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => FilteredSearchQuestionSchema.parse(invalidData)).toThrow();
  });
});

describe("TypeaheadSearchQuestion schema", () => {
  it("should validate a correct TypeaheadSearchQuestion object", () => {
    const validData = {
      type: "typeaheadSearch",
      graphQL: {
        displayFields: [
          { propertyName: "title", label: "Title" },
        ],
        localQueryId: "12345",
        responseField: "results",
        variables: [
          { name: "query", type: "string" },
        ],
      },
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => TypeaheadSearchQuestionSchema.parse(validData)).not.toThrow();
  });

  it("should throw an error for an invalid TypeaheadSearchQuestion object", () => {
    const invalidData = {
      type: "typeaheadSearch",
      graphQL: {
        displayFields: [
          { propertyName: "title", label: "Title" },
        ],
        responseField: "results",
        variables: [
          { name: "query", type: 123 }, // Invalid type
        ],
      },
    };

    expect(() => TypeaheadSearchQuestionSchema.parse(invalidData)).toThrow();
  });
});
