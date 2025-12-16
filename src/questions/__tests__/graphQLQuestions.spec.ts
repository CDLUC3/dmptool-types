import { describe, expect, it } from "@jest/globals";
import {
  affiliationQuery,
  AffiliationSearchQuestionSchema,
  AffiliationSearchQuestionType,
  LicenseSearchQuestionSchema,
  MetadataStandardSearchQuestionSchema,
  RepositorySearchQuestionSchema
} from "../graphQLQuestions";

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

describe("LicenseSearchQuestion schema", () => {
  it("should validate a correct LicenseSearchQuestion object", () => {
    const validData = {
      type: "licenseSearch",
      attributes: {
        label: "License Search",
        help: "Search for a license",
      },
      graphQL: {
        query: "query Licenses($term: String, $paginationOptions: PaginationOptions){ license(term: $term, paginationOptions: $paginationOptions) { totalCount currentOffset limit hasNextPage hasPreviousPage availableSortFields items { id name uri description } } }",
        displayFields: [
          {
            propertyName: "name",
            label: "Name"
          },
          {
            propertyName: "description",
            label: "Description"
          },
          {
            propertyName: "recommended",
            label: "Recommended"
          }
        ],
        answerField: "uri",
        responseField: "licenses.items",
        variables: [
          {
            type: "string",
            name: "term",
            label: "Search term",
            minLength: 2
          },
        ],
      },
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => LicenseSearchQuestionSchema.parse(validData)).not.toThrow();
  });

  it("should throw an error for an invalid LicenseSearchQuestion object", () => {
    const invalidData = {
      type: "licenseSearch",
      graphQL: {
        displayFields: [],
        query: 'myInvalidQuery { licenses { id name } }',
        variables: [
          {
            name: "term",
            type: "invalid"
          },
        ],
      },
    };

    expect(() => LicenseSearchQuestionSchema.parse(invalidData)).toThrow();
  });
});


describe("MetadataStandardSearchQuestion schema", () => {
  it("should validate a correct MetadataStandardSearchQuestion object", () => {
    const validData = {
      type: "metadataStandardSearch",
      attributes: {
        label: "Metadata Standard Search",
        help: "Search for a metadata standard",
      },
      graphQL: {
        query: "query MetadataStandards($term: String, $keywords: [String!], $paginationOptions: PaginationOptions){ metadataStandards(term: $term, keywords: $keywords, paginationOptions: $paginationOptions) { totalCount currentOffset limit hasNextPage hasPreviousPage availableSortFields items { id name uri description keywords } } }",
        displayFields: [
          {
            propertyName: "name",
            label: "Name"
          },
          {
            propertyName: "description",
            label: "Description"
          },
          {
            propertyName: "website",
            label: "Website"
          },
          {
            propertyName: "keywords",
            label: "Subject Areas"
          }
        ],
        answerField: "uri",
        responseField: "metadataStandards.items",
        variables: [
          {
            type: "string",
            name: "term",
            label: "Search term",
            minLength: 2
          },
          {
            type: "string",
            name: "keywords",
            label: "Subject Areas"
          }
        ],
      },
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => MetadataStandardSearchQuestionSchema.parse(validData)).not.toThrow();
  });

  it("should throw an error for an invalid MetadataStandardSearchQuestion object", () => {
    const invalidData = {
      type: "metadataStandardSearch",
      graphQL: {
        query: 123,
        variables: [],
      },
    };

    expect(() => MetadataStandardSearchQuestionSchema.parse(invalidData)).toThrow();
  });
});

describe("RepositorySearchQuestion schema", () => {
  it("should validate a correct RepositorySearchQuestion object", () => {
    const validData = {
      type: "repositorySearch",
      attributes: {
        label: "Repository Search",
        help: "Search for a repository",
      },
      graphQL: {
        query: "query Repositories($term: String, $keywords: [String!], $repositoryType: String, $paginationOptions: PaginationOptions){ repositories(term: $term, keywords: $keywords, repositoryType: $repositoryType, paginationOptions: $paginationOptions) { totalCount currentOffset limit hasNextPage hasPreviousPage availableSortFields items { id name uri description website keywords repositoryTypes } } }",
        displayFields: [
          {
            propertyName: "name",
            label: "Name"
          },
          {
            propertyName: "description",
            label: "Description"
          },
          {
            propertyName: "website",
            label: "Website"
          },
          {
            propertyName: "keywords",
            label: "Subject Areas"
          }
        ],
        answerField: "uri",
        responseField: "repositories.items",
        variables: [
          {
            type: "string",
            name: "term",
            label: "Search term",
            minLength: 2
          },
          {
            type: "string",
            name: "repositoryType",
            label: "Repository Type"
          },
          {
            type: "string",
            name: "keywords",
            label: "Subject Areas"
          }
        ],
      },
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => RepositorySearchQuestionSchema.parse(validData)).not.toThrow();
  });

  it("should throw an error for an invalid RepositorySearchQuestion object", () => {
    const invalidData = {
      type: "repositorySearch",
      graphQL: {
        responseField: 123,
        variables: [
          {type: "unknown"},
        ],
      },
    };

    expect(() => RepositorySearchQuestionSchema.parse(invalidData)).toThrow();
  });
});
