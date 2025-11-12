import { z } from "zod";
import { QuestionSchema } from "./question";

const BaseAttributes = QuestionSchema.shape.attributes;

const paginationOptions = z.object({
  type: z.enum(['OFFSET', 'CURSOR']).default('OFFSET'),  // Type of pagination to use
  limit: z.number().default(10),                         // Number of items per page
  offset: z.number().optional().default(0),              // Offset for pagination (if using offset-based pagination)
  cursor: z.string().optional(),                             // Cursor for pagination (if using cursor-based pagination)
  sortField: z.string().default('name'),                // Field to sort by
  sortOrder: z.enum(['ASC', 'DESC']).default('ASC'),    // Sort order
})

// An input variable for a GraphQL query
const GraphQLVariable = z.object({
  minLength: z.number().optional(),                         // A min length for the variable before executing the query
  label: z.string().optional(),                             // The label for the variable (default to the name)
  labelTranslationKey: z.string().optional(),               // The translation key for the label (DMP Tool only)
  name: z.string().default('search'),                  // MUST match the input variable name in the query
  type: z.string().default('string'),                  // The type of the variable (default is string)
  defaultValue: z.string().optional()                       // The default value for the variable (no default)
});

const GraphQLPaginationVariables = GraphQLVariable.extend({
  name: z.enum(['paginationOptions']).default('paginationOptions'),
  type: z.string().default('paginationOptions'),
  label: z.string().default('Pagination Options'),
  options: paginationOptions.default({
    type: 'OFFSET',
    limit: 10,
    offset: 0,
    sortField: 'name',
    sortOrder: 'ASC',
  })
});

// A property from a GraphQL query response that will be displayed to the user
const GraphQLDisplayField = z.object({
  propertyName: z.string().default('id'),              // MUST match a property name in the query response
  label: z.string().default('Id'),                     // The label for the field
  labelTranslationKey: z.string().optional()                // The translation key for the label (DMP Tool only)
});

// A GraphQL query object
const GraphQLQuery = z.object({
  displayFields: z.array(GraphQLDisplayField).default([{}]),  // The fields to display from the query response
  localQueryId: z.string().optional(),                        // The ID of the query (required if no query)
  query: z.string().optional(),                               // The GraphQL query to execute (required if no localQueryId)
  responseField: z.string().default('query.items'),      // How to get at the location of displayFields in the response
  variables: z.array(GraphQLVariable).default([{}])           // The variables for the query
});

// Filtered search question and answer

// TODO: This one is for future use to help build out the components of the
//       Research Outputs Question Type (e.g. License selector, Repository selector, etc.)
export const FilteredSearchQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('filteredSearch'),
  graphQL: GraphQLQuery.default({}),           // The GraphQL query options for the search
  attributes: BaseAttributes.merge(z.object({
    multiple: z.boolean().default(true)   // Whether to allow multiple selections
  })).default({})
}));

// Typeahead search question and answer
const TypeaheadSearchQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('typeaheadSearch'),                       // The type of question
  graphQL: GraphQLQuery,                                    // The GraphQL query options for the typeahead search
}));


export const affiliationQuery = '' +
  'query Affiliations($name: String!){ ' +
    'affiliations(name: $name) { ' +
      'totalCount ' +
      'nextCursor ' +
      'items { ' +
        'id ' +
        'displayName ' +
        'uri ' +
      '} ' +
    '} ' +
  '}';

export const AffiliationSearchQuestionSchema = TypeaheadSearchQuestionSchema.merge(z.object({
  type: z.literal('affiliationSearch'),
  attributes: BaseAttributes.default({}),
  graphQL: GraphQLQuery.merge(z.object({
    query: z.literal(affiliationQuery).default(affiliationQuery),
    queryId: z.string().default('useAffiliationsQuery').optional(),
    variables: z.array(z.object({
      name: z.literal("name").default('name'),
      type: z.string().default("string"),
      label: z.string().default("Search for your institution"),
      minLength: z.literal(3).default(3),
      labelTranslationKey: z.string().default("SignupPage.institutionHelp").optional(),
    })).default([{}]),
    answerField: z.literal('uri').default('uri'),
    displayFields: z.array(z.object({
      propertyName: z.literal("displayName").default('displayName'),
      label: z.string().default("Institution"),
      labelTranslationKey: z.string().default("SignupPage.institution").optional(),
    })).default([{}]),
    responseField: z.literal("affiliations.items").default('affiliations.items'),
  })).default({}),
}));

export const repositoryQuery = '' +
  'query Repositories($term: String, $researchDomainId: Int, $repositoryType: String, $paginationOptions: PaginationOptions){ ' +
    'repositories(term: $term, researchDomainId: $researchDomainId, repositoryType: $repositoryType, paginationOptions: $paginationOptions) { ' +
      'totalCount ' +
      'currentOffset ' +
      'limit ' +
      'hasNextPage ' +
      'hasPreviousPage ' +
      'availableSortFields ' +
      'items { ' +
        'id ' +
        'name ' +
        'uri ' +
        'description ' +
        'website ' +
        'researchDomains { ' +
          'id ' +
          'name ' +
          'uri ' +
        '} ' +
        'keywords ' +
        'repositoryTypes ' +
      '} ' +
    '} ' +
  '}';

const RepositorySearchTermVariable = GraphQLVariable.extend({
  name: z.literal("term").default('term'),
  type: z.string().default("string"),
  label: z.string().default("Search for a repository"),
  minLength: z.literal(3).default(3),
  labelTranslationKey: z.string().default("RepositorySearch.term").optional(),
});

const RepositorySearchRepositoryTypeVariable = GraphQLVariable.extend({
  name: z.literal("repositoryType").default('repositoryType'),
  type: z.string().default("string"),
  label: z.string().default("Repository type"),
  minLength: z.literal(3).default(3),
  labelTranslationKey: z.string().default("RepositorySearch.repositoryType").optional(),
});

const RepositorySearchResearchDomainIdVariable = GraphQLVariable.extend({
  name: z.literal("researchDomainId").default('researchDomainId'),
  type: z.string().default("string"),
  label: z.string().default("Research domain"),
  minLength: z.literal(3).default(3),
  labelTranslationKey: z.string().default("RepositorySearch.researchDomain").optional(),
});

const RepositorySearchResultName = GraphQLDisplayField.extend({
  propertyName: z.literal("name").default('name'),
  label: z.string().default("Name"),
  labelTranslationKey: z.string().default("RepositorySearch.name").optional(),
});

const RepositorySearchResultDescription = GraphQLDisplayField.extend({
  propertyName: z.literal("description").default('description'),
  label: z.string().default("Description"),
  labelTranslationKey: z.string().default("RepositorySearch.description").optional(),
});

const RepositorySearchResultWebsite = GraphQLDisplayField.extend({
  propertyName: z.literal("website").default('website'),
  label: z.string().default("Website"),
  labelTranslationKey: z.string().default("RepositorySearch.website").optional(),
});

const RepositorySearchResultKeywords = GraphQLDisplayField.extend({
  propertyName: z.literal("keywords").default('keywords'),
  label: z.string().default("Keywords"),
  labelTranslationKey: z.string().default("RepositorySearch.keywords").optional(),
});

const defaultRepositorySearchTerm = RepositorySearchTermVariable.parse({});
const defaultRepositorySearchType = RepositorySearchRepositoryTypeVariable.parse({});
const defaultRepositorySearchResearchDomainId = RepositorySearchResearchDomainIdVariable.parse({});
const defaultRepositorySearchName = RepositorySearchResultName.parse({});
const defaultRepositorySearchDescription = RepositorySearchResultDescription.parse({});
const defaultRepositorySearchWebsite = RepositorySearchResultWebsite.parse({});
const defaultRepositorySearchKeywords = RepositorySearchResultKeywords.parse({});
const defaultRepositoryPaginationOptions = GraphQLPaginationVariables.parse({});

// Repository search question and answer

export const RepositorySearchQuestionSchema = TypeaheadSearchQuestionSchema.merge(z.object({
  type: z.literal('repositorySearch'),
  attributes: BaseAttributes.default({}),
  graphQL: GraphQLQuery.merge(z.object({
    query: z.literal(repositoryQuery).default(repositoryQuery),
    queryId: z.string().default('useRepositoriesQuery').optional(),
    variables: z.array(GraphQLVariable).default([
      defaultRepositorySearchTerm,
      defaultRepositorySearchResearchDomainId,
      defaultRepositorySearchType,
      defaultRepositoryPaginationOptions,
    ]),
    answerField: z.literal('uri').default('uri'),
    displayFields: z.array(GraphQLDisplayField).default([
      defaultRepositorySearchName,
      defaultRepositorySearchDescription,
      defaultRepositorySearchWebsite,
      defaultRepositorySearchKeywords,
    ]),
    responseField: z.literal("repositories.items").default('repositories.items'),
  })).default({}),
}));

export const metadataStandardQuery = '' +
  'query MetadataStandards($term: String, $paginationOptions: PaginationOptions){ ' +
    'metadataStandards(term: $term, paginationOptions: $paginationOptions) { ' +
      'totalCount ' +
      'currentOffset ' +
      'limit ' +
      'hasNextPage ' +
      'hasPreviousPage ' +
      'availableSortFields ' +
      'items { ' +
        'id ' +
        'name ' +
        'uri ' +
        'description ' +
        'researchDomains { ' +
          'id ' +
          'name ' +
          'uri ' +
        '} ' +
        'keywords ' +
      '} ' +
    '} ' +
  '}';

const MetadataStandardSearchTermVariable = GraphQLVariable.extend({
  name: z.literal("term").default('term'),
  type: z.string().default("string"),
  label: z.string().default("Search for a metadata standard"),
  minLength: z.literal(3).default(3),
  labelTranslationKey: z.string().default("MetadataStandardSearch.term").optional(),
});

const MetadataStandardSearchResearchDomainIdVariable = GraphQLVariable.extend({
  name: z.literal("researchDomainId").default('researchDomainId'),
  type: z.string().default("string"),
  label: z.string().default("Research domain"),
  minLength: z.literal(3).default(3),
  labelTranslationKey: z.string().default("MetadataStandardSearch.researchDomain").optional(),
})

const MetadataStandardSearchResultName = GraphQLDisplayField.extend({
  propertyName: z.literal("name").default('name'),
  label: z.string().default("Name"),
  labelTranslationKey: z.string().default("MetadataStandardSearch.name").optional(),
});

const MetadataStandardSearchResultDescription = GraphQLDisplayField.extend({
  propertyName: z.literal("description").default('description'),
  label: z.string().default("Description"),
  labelTranslationKey: z.string().default("MetadataStandardSearch.description").optional(),
});

const MetadataStandardSearchResultWebsite = GraphQLDisplayField.extend({
  propertyName: z.literal("website").default('website'),
  label: z.string().default("Website"),
  labelTranslationKey: z.string().default("MetadataStandardSearch.website").optional(),
});

const MetadataStandardSearchResultKeywords = GraphQLDisplayField.extend({
  propertyName: z.literal("keywords").default('keywords'),
  label: z.string().default("Keywords"),
  labelTranslationKey: z.string().default("MetadataStandardSearch.keywords").optional(),
});

const defaultMetadataStandardSearchTerm = MetadataStandardSearchTermVariable.parse({});
const defaultMetadataStandardSearchResearchDomainId = MetadataStandardSearchResearchDomainIdVariable.parse({});
const defaultMetadataStandardPaginationOptions = GraphQLPaginationVariables.parse({});

const defaultMetadataStandardName = MetadataStandardSearchResultName.parse({});
const defaultMetadataStandardDescription = MetadataStandardSearchResultDescription.parse({});
const defaultMetadataStandardWebsite = MetadataStandardSearchResultWebsite.parse({});
const defaultMetadataStandardKeywords = MetadataStandardSearchResultKeywords.parse({});

export const MetadataStandardSearchQuestionSchema = TypeaheadSearchQuestionSchema.merge(z.object({
  type: z.literal('metadataStandardSearch'),
  attributes: BaseAttributes.default({}),
  graphQL: GraphQLQuery.merge(z.object({
    query: z.literal(metadataStandardQuery).default(metadataStandardQuery),
    queryId: z.string().default('useMetadataStandardsQuery').optional(),
    variables: z.array(GraphQLVariable).default([
      defaultMetadataStandardSearchTerm,
      defaultMetadataStandardSearchResearchDomainId,
      defaultMetadataStandardPaginationOptions,
    ]),
    answerField: z.literal('uri').default('uri'),
    displayFields: z.array(GraphQLDisplayField).default([
      defaultMetadataStandardName,
      defaultMetadataStandardDescription,
      defaultMetadataStandardWebsite,
      defaultMetadataStandardKeywords,
    ]),
    responseField: z.literal("metadataStandards.items").default('metadataStandards.items'),
  })).default({}),
}));

export const licenseQuery = '' +
  'query Licenses($term: String, $paginationOptions: PaginationOptions){ ' +
    'license(term: $term, paginationOptions: $paginationOptions) { ' +
       'totalCount ' +
       'currentOffset ' +
       'limit ' +
       'hasNextPage ' +
       'hasPreviousPage ' +
       'availableSortFields ' +
       'items { ' +
         'id ' +
         'name ' +
         'uri ' +
         'description ' +
       '} ' +
    '} ' +
  '}';

const LicenseSearchTermVariable = GraphQLVariable.extend({
  name: z.literal("term").default('term'),
  type: z.string().default("string"),
  label: z.string().default("Search for a license"),
  minLength: z.literal(3).default(3),
  labelTranslationKey: z.string().default("LicenseSearch.term").optional(),
});

const LicenseSearchResultName = GraphQLDisplayField.extend({
  propertyName: z.literal("name").default('name'),
  label: z.string().default("Name"),
  labelTranslationKey: z.string().default("License.name").optional(),
});

const LicenseSearchResultDescription = GraphQLDisplayField.extend({
  propertyName: z.literal("description").default('description'),
  label: z.string().default("Description"),
  labelTranslationKey: z.string().default("License.description").optional(),
});

const LicenseSearchResultRecommended = GraphQLDisplayField.extend({
  propertyName: z.literal("recommended").default('recommended'),
  label: z.string().default("Recommended"),
  labelTranslationKey: z.string().default("License.recommended").optional(),
});
const defaultLicenseSearchTerm = LicenseSearchTermVariable.parse({});
const defaultLicensePaginationOptions = GraphQLPaginationVariables.parse({});

const defaultLicenseName = LicenseSearchResultName.parse({});
const defaultLicenseDescription = LicenseSearchResultDescription.parse({});
const defaultLicenseRecommended = LicenseSearchResultRecommended.parse({});

export const LicenseSearchQuestionSchema = TypeaheadSearchQuestionSchema.merge(z.object({
  type: z.literal('licenseSearch'),
  attributes: BaseAttributes.default({}),
  graphQL: GraphQLQuery.merge(z.object({
    query: z.literal(licenseQuery).default(licenseQuery),
    queryId: z.string().default('useLicensesQuery').optional(),
    variables: z.array(GraphQLVariable).default([
      defaultLicenseSearchTerm,
      defaultLicensePaginationOptions,
    ]),
    answerField: z.literal('uri').default('uri'),
    displayFields: z.array(GraphQLDisplayField).default([
      defaultLicenseName,
      defaultLicenseDescription,
      defaultLicenseRecommended,
    ]),
    responseField: z.literal("licenses.items").default('licenses.items'),
  })).default({}),
}));

// This will ensure that object validations are against the Zod schemas defined above
export type FilteredSearchQuestionType = z.infer<typeof FilteredSearchQuestionSchema>;
export type AffiliationSearchQuestionType = z.infer<typeof AffiliationSearchQuestionSchema>;
export type RepositorySearchQuestionType = z.infer<typeof RepositorySearchQuestionSchema>;
export type MetadataStandardSearchQuestionType = z.infer<typeof MetadataStandardSearchQuestionSchema>;
export type LicenseSearchQuestionType = z.infer<typeof LicenseSearchQuestionSchema>;
