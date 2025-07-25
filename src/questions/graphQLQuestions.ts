import { z } from "zod";
import { QuestionSchema } from "./question";

const BaseAttributes = QuestionSchema.shape.attributes;

// An input variable for a GraphQL query
const GraphQLVariable = z.object({
  minLength: z.number().optional(),                         // A min length for the variable before executing the query
  label: z.string().optional(),                             // The label for the variable (default to the name)
  labelTranslationKey: z.string().optional(),               // The translation key for the label (DMP Tool only)
  name: z.string().default('search'),                  // MUST match the input variable name in the query
  type: z.string().default('string'),                  // The type of the variable (default is string)
  defaultValue: z.string().optional()                       // The default value for the variable (no default)
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
  'query Affiliations($name: String!){' +
    'affiliations(name: $name) {' +
      'totalCount' +
      'nextCursor' +
      'items {' +
        'id' +
        'displayName' +
        'uri' +
      '}' +
    '}' +
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
}))

// This will ensure that object validations are against the Zod schemas defined above
export type FilteredSearchQuestionType = z.infer<typeof FilteredSearchQuestionSchema>;
export type AffiliationSearchQuestionType = z.infer<typeof AffiliationSearchQuestionSchema>;
