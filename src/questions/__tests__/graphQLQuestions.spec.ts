import {describe, expect, it} from "@jest/globals";
import {
  affiliationQuery,
  AffiliationSearchQuestionSchema,
  AffiliationSearchQuestionType,
  FilteredSearchQuestionSchema,
  FilteredSearchQuestionType
} from "../graphQLQuestions";

describe("FilteredSearchQuestion schema", () => {
  it("should validate a correct FilteredSearchQuestion object", () => {
    const validData: FilteredSearchQuestionType = {
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
        label: "Search",
        help: "Search for a user",
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

describe("AffiliationSearchQuestion schema", () => {
  it("should validate a correct AffiliationSearchQuestion object", () => {
    const validData: AffiliationSearchQuestionType = {
      type: "affiliationSearch",
      attributes: {
        label: "Search",
        help: "Search for a institution",
      },
      graphQL: {
        query: affiliationQuery,
        displayFields: [
          { propertyName: "displayName", label: "Name" },
        ],
        localQueryId: "12345",
        answerField: "uri",
        responseField: "affiliations.items",
        variables: [
          { type: "string", name: "name", label: "Term", minLength: 3 },
        ],
      },
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => AffiliationSearchQuestionSchema.parse(validData)).not.toThrow();
  });

  it("should throw an error for an invalid AffiliationSearchQuestion object", () => {
    const invalidData = {
      type: "affiliationSearch",
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

    expect(() => AffiliationSearchQuestionSchema.parse(invalidData)).toThrow();
  });
});
