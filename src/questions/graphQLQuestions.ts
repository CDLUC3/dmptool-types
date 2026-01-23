import { z } from "zod";
import {
  DefaultAttributes,
  DefaultMeta,
  QuestionSchema
} from "./question";

const PaginationOption = z.object({
  type: z.enum(['OFFSET', 'CURSOR']).default('OFFSET'),  // Type of pagination to use
  limit: z.number().default(10),                         // Number of items per page
  offset: z.number().optional().default(0),              // Offset for pagination (if using offset-based pagination)
  cursor: z.string().optional(),                             // Cursor for pagination (if using cursor-based pagination)
  sortField: z.string().default('name'),                // Field to sort by
  sortOrder: z.enum(['ASC', 'DESC']).default('ASC'),    // Sort order
})
const DefaultPaginationOption= PaginationOption.parse({});

// An input variable for a GraphQL query
const GraphQLVariable = z.object({
  minLength: z.number().optional(),                         // A min length for the variable before executing the query
  label: z.string().optional(),                             // The label for the variable (default to the name)
  labelTranslationKey: z.string().optional(),               // The translation key for the label (DMP Tool only)
  name: z.string().default('search'),                  // MUST match the input variable name in the query
  type: z.string().default('string'),                  // The type of the variable (default is string)
  defaultValue: z.string().optional()                       // The default value for the variable (no default)
});
const DefaultGraphQLVariable = GraphQLVariable.parse({});

const GraphQLPaginationVariables = z.object({
  ...GraphQLVariable.shape,
  name: z.enum(['paginationOptions']).default('paginationOptions'),
  type: z.enum(['CURSOR','OFFSET']).default('OFFSET'),
  label: z.string().default('Pagination Options'),
  labelTranslationKey: z.string().optional(),
  options: PaginationOption
});
const DefaultGraphQLPaginationVariables = GraphQLPaginationVariables.parse({
  name: 'paginationOptions',
  type: 'OFFSET',
  label: 'Pagination Options',
  labelTranslationKey: 'PaginationOptions.label',
  options: DefaultPaginationOption
});

// A property from a GraphQL query response that will be displayed to the user
const GraphQLDisplayField = z.object({
  propertyName: z.string().default('id'),              // MUST match a property name in the query response
  label: z.string().default('Id'),                     // The label for the field
  labelTranslationKey: z.string().optional()                // The translation key for the label (DMP Tool only)
});
const DefaultGraphQLDisplayField = GraphQLDisplayField.parse({});

// A GraphQL query object
const GraphQLQuery = z.object({
  displayFields: z.array(GraphQLDisplayField),                // The fields to display from the query response
  localQueryId: z.string().optional(),                        // The ID of the query (required if no query)
  query: z.string().optional(),                               // The GraphQL query to execute (required if no localQueryId)
  responseField: z.string().default('query.items'),      // How to get at the location of displayFields in the response
  variables: z.array(GraphQLVariable)                         // The variables for the query
});
const DefaultGraphQLQuery = GraphQLQuery.parse({
  displayFields: [DefaultGraphQLDisplayField],
  responseField: 'query.items',
  variables: [DefaultGraphQLVariable]
});

// Typeahead search question and answer
const TypeaheadSearchQuestionSchema = z.object({
  ...QuestionSchema.shape,
  type: z.literal('typeaheadSearch'),                  // The type of question
  graphQL: GraphQLQuery,                                     // The GraphQL query options for the typeahead search
});
export const DefaultTypeaheadSearchQuestion = TypeaheadSearchQuestionSchema.parse({
  type: 'typeaheadSearch',
  attributes: DefaultAttributes,
  meta: DefaultMeta,
  graphQL: DefaultGraphQLQuery,
})

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

const DefaultAffiliationSearchNameVariable = GraphQLVariable.parse({
  name: 'name',
  type: 'string',
  label: 'Search for your institution',
  minLength: 3,
  labelTranslationKey: 'SignupPage.institutionHelp',
});
const DefaultAffiliationSearchNameDisplayField = GraphQLDisplayField.parse({
  propertyName: 'displayName',
  label: 'Institution',
  labelTranslationKey: 'SignupPage.institution',
});

const AffiliationGraphQLQuery = z.object({
  ...GraphQLQuery.shape,
  query: z.literal(affiliationQuery),
  queryId: z.string().default('useAffiliationsQuery').optional(),
  variables: z.array(GraphQLVariable),
  answerField: z.literal('uri').default('uri'),
  responseField: z.literal("affiliations.items").default('affiliations.items'),
  displayFields: z.array(GraphQLDisplayField)
});
const DefaultAffiliationGraphQLQuery = AffiliationGraphQLQuery.parse({
  query: affiliationQuery,
  variables: [DefaultAffiliationSearchNameVariable],
  answerField: 'uri',
  responseField: 'affiliations.items',
  displayFields: [DefaultAffiliationSearchNameDisplayField]
});

export const AffiliationSearchQuestionSchema = z.object({
  ...TypeaheadSearchQuestionSchema.shape,
  type: z.literal('affiliationSearch'),
  graphQL: AffiliationGraphQLQuery
});
export const DefaultAffiliationSearchQuestion = AffiliationSearchQuestionSchema.parse({
  type: 'affiliationSearch',
  attributes: DefaultAttributes,
  meta: DefaultMeta,
  graphQL: DefaultAffiliationGraphQLQuery,
});

export const repositoryQuery = '' +
  'query Repositories($term: String, $keywords: [String!], $repositoryType: String, $paginationOptions: PaginationOptions){ ' +
    'repositories(term: $term, keywords: $keywords, repositoryType: $repositoryType, paginationOptions: $paginationOptions) { ' +
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
        'keywords ' +
        'repositoryTypes ' +
      '} ' +
    '} ' +
  '}';

const DefaultRepositorySearchTermVariable = GraphQLVariable.parse({
  name: 'term',
  type: 'string',
  label: 'Search for a repository',
  minLength: 3,
  labelTranslationKey: 'RepositorySearch.term'
});

const DefaultRepositorySearchRepositoryTypeVariable = GraphQLVariable.parse({
  name: 'repositoryType',
  type: 'string',
  label: 'Repository type',
  minLength: 3,
  labelTranslationKey: 'RepositorySearch.repositoryType'
});

const DefaultRepositorySearchKeywordsVariable = GraphQLVariable.parse({
  name: 'keywords',
  type: 'string',
  label: 'Subject Areas',
  minLength: 3,
  labelTranslationKey: 'RepositorySearch.keywords'
});

const DefaultRepositorySearchNameDisplayField = GraphQLDisplayField.parse({
  propertyName: 'name',
  label: 'Name',
  labelTranslationKey: 'RepositorySearch.name'
});

const DefaultRepositorySearchDescriptionDisplayField = GraphQLDisplayField.parse({
  propertyName: 'description',
  label: 'Description',
  labelTranslationKey: 'RepositorySearch.description'
});

const DefaultRepositorySearchWebsiteDisplayField = GraphQLDisplayField.parse({
  propertyName: 'website',
  label: 'Website',
  labelTranslationKey: 'RepositorySearch.website'
});

const DefaultRepositorySearchKeywordsDisplayField = GraphQLDisplayField.parse({
  propertyName: 'keywords',
  label: 'Subject Areas',
  labelTranslationKey: 'RepositorySearch.keywords'
});

const RepositoryGraphQLQuery = z.object({
  ...GraphQLQuery.shape,
  query: z.literal(repositoryQuery),
  queryId: z.string().default('useRepositoriesQuery').optional(),
  variables: z.array(GraphQLVariable),
  answerField: z.literal('uri'),
  displayFields: z.array(GraphQLDisplayField),
  responseField: z.literal("repositories.items"),
});
export const DefaultRepositoryGraphQLQuery = RepositoryGraphQLQuery.parse({
  query: repositoryQuery,
  variables: [
    DefaultRepositorySearchTermVariable,
    DefaultRepositorySearchKeywordsVariable,
    DefaultRepositorySearchRepositoryTypeVariable,
    DefaultGraphQLPaginationVariables
  ],
  responseField: 'repositories.items',
  answerField: 'uri',
  displayFields: [
    DefaultRepositorySearchNameDisplayField,
    DefaultRepositorySearchDescriptionDisplayField,
    DefaultRepositorySearchWebsiteDisplayField,
    DefaultRepositorySearchKeywordsDisplayField
  ]
});

export const RepositorySearchQuestionSchema = z.object({
  ...TypeaheadSearchQuestionSchema.shape,
  type: z.literal('repositorySearch'),
  graphQL: RepositoryGraphQLQuery
});
export const DefaultRepositorySearchQuestion = RepositorySearchQuestionSchema.parse({
  type: 'repositorySearch',
  attributes: DefaultAttributes,
  meta: DefaultMeta,
  graphQL: DefaultRepositoryGraphQLQuery
});

export const metadataStandardQuery = '' +
  'query MetadataStandards($term: String, $keywords: [String!], $paginationOptions: PaginationOptions){ ' +
    'metadataStandards(term: $term, keywords: $keywords, paginationOptions: $paginationOptions) { ' +
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
        'keywords ' +
      '} ' +
    '} ' +
  '}';

const DefaultMetadataStandardSearchTermVariable = GraphQLVariable.parse({
  name: 'term',
  type: 'string',
  label: 'Search for a metadata standard',
  minLength: 3,
  labelTranslationKey: 'MetadataStandardSearch.term'
})

const DefaultMetadataStandardKeywordsAreasVariable = GraphQLVariable.parse({
  name: 'keywords',
  type: 'string',
  label: 'Subject Areas',
  minLength: 3,
  labelTranslationKey: 'MetadataStandardSearch.keywords'
})

const DefaultMetadataStandardNameDisplayField = GraphQLDisplayField.parse({
  propertyName: 'name',
  label: 'Name',
  labelTranslationKey: 'MetadataStandardSearch.name'
})

const DefaultMetadataStandardDescriptionDisplayField = GraphQLDisplayField.parse({
  propertyName: 'description',
  label: 'Description',
  labelTranslationKey: 'MetadataStandardSearch.description'
})

const DefaultMetadataStandardWebsiteDisplayField = GraphQLDisplayField.parse({
  propertyName: 'website',
  label: 'Website',
  labelTranslationKey: 'MetadataStandardSearch.website'
})

const DefaultMetadataStandardKeywordsDisplayField = GraphQLDisplayField.parse({
  propertyName: 'keywords',
  label: 'Subject Areas',
  labelTranslationKey: 'MetadataStandardSearch.keywords'
})

export const MetadataStandardGraphQLQuery = z.object({
  ...GraphQLQuery.shape,
  query: z.literal(metadataStandardQuery),
  queryId: z.string().default('useMetadataStandardsQuery').optional(),
  variables: z.array(GraphQLVariable),
  answerField: z.literal('uri').default('uri'),
  displayFields: z.array(GraphQLDisplayField),
  responseField: z.literal("metadataStandards.items"),
});
export const DefaultMetadataStandardGraphQLQuery = MetadataStandardGraphQLQuery.parse({
  query: metadataStandardQuery,
  variables: [
    DefaultMetadataStandardSearchTermVariable,
    DefaultMetadataStandardKeywordsAreasVariable,
    DefaultGraphQLPaginationVariables
  ],
  responseField: 'metadataStandards.items',
  answerField: 'uri',
  displayFields: [
    DefaultMetadataStandardNameDisplayField,
    DefaultMetadataStandardDescriptionDisplayField,
    DefaultMetadataStandardWebsiteDisplayField,
    DefaultMetadataStandardKeywordsDisplayField
  ]
});

export const MetadataStandardSearchQuestionSchema = z.object({
  ...TypeaheadSearchQuestionSchema.shape,
  type: z.literal('metadataStandardSearch'),
  graphQL: MetadataStandardGraphQLQuery
});
export const DefaultMetadataStandardSearchQuestion = MetadataStandardSearchQuestionSchema.parse({
  type: 'metadataStandardSearch',
  attributes: DefaultAttributes,
  meta: DefaultMeta,
  graphQL: DefaultMetadataStandardGraphQLQuery,
});

export const licenseQuery = '' +
  'query Licenses{ ' +
    'licenses { ' +
       'id ' +
       'name ' +
       'uri ' +
       'description ' +
    '} ' +
  '}';

const DefaultLicenseNameDisplayField = GraphQLDisplayField.parse({
  propertyName: 'name',
  label: 'Name',
  labelTranslationKey: 'LicenseSearch.name'
});

const DefaultLicenseDescriptionDisplayField = GraphQLDisplayField.parse({
  propertyName: 'description',
  label: 'Description',
  labelTranslationKey: 'LicenseSearch.description'
});

const DefaultLicenseRecommendedDisplayField = GraphQLDisplayField.parse({
  propertyName: 'recommended',
  label: 'Recommended',
  labelTranslationKey: 'LicenseSearch.recommended'
});

export const LicenseGraphQLQuery = z.object({
  ...GraphQLQuery.shape,
  query: z.literal(licenseQuery),
  queryId: z.string().default('useLicensesQuery').optional(),
  variables: z.array(GraphQLVariable),
  answerField: z.literal('uri'),
  displayFields: z.array(GraphQLDisplayField),
  responseField: z.literal("licenses"),
});
export const DefaultLicenseGraphQLQuery = LicenseGraphQLQuery.parse({
  query: licenseQuery,
  variables: [],
  responseField: 'licenses',
  answerField: 'uri',
  displayFields: [
    DefaultLicenseNameDisplayField,
    DefaultLicenseDescriptionDisplayField,
    DefaultLicenseRecommendedDisplayField
  ]
});

export const LicenseSearchQuestionSchema = z.object({
  ...TypeaheadSearchQuestionSchema.shape,
  type: z.literal('licenseSearch'),
  graphQL: LicenseGraphQLQuery
});
export const DefaultLicenseSearchQuestion = LicenseSearchQuestionSchema.parse({
  type: 'licenseSearch',
  attributes: DefaultAttributes,
  meta: DefaultMeta,
  graphQL: DefaultLicenseGraphQLQuery,
});

// This will ensure that object validations are against the Zod schemas defined above
export type AffiliationSearchQuestionType = z.infer<typeof AffiliationSearchQuestionSchema>;
export type RepositorySearchQuestionType = z.infer<typeof RepositorySearchQuestionSchema>;
export type MetadataStandardSearchQuestionType = z.infer<typeof MetadataStandardSearchQuestionSchema>;
export type LicenseSearchQuestionType = z.infer<typeof LicenseSearchQuestionSchema>;

export const AffiliationSearchQuestionJSONSchema = z.toJSONSchema(AffiliationSearchQuestionSchema);
export const RepositorySearchQuestionJSONSchema = z.toJSONSchema(RepositorySearchQuestionSchema);
export const MetadataStandardSearchQuestionJSONSchema = z.toJSONSchema(MetadataStandardSearchQuestionSchema);
export const LicenseSearchQuestionJSONSchema = z.toJSONSchema(LicenseSearchQuestionSchema);
