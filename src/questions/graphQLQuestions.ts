import { z } from "zod";
import { QuestionSchema } from "./question";

const BaseAttributes = QuestionSchema.shape.attributes;

// An input variable for a GraphQL query
const GraphQLVariable = z.object({
  minLength: z.number().optional(),                         // A min length for the variable before executing the query
  label: z.string().optional(),                             // The label for the variable (default to the name)
  labelTranslationKey: z.string().optional(),               // The translation key for the label (DMP Tool only)
  name: z.string(),                                         // MUST match the input variable name in the query
  type: z.string(),                                         // The type of the variable (default is string)
  defaultValue: z.string().optional()                       // The default value for the variable (no default)
});

// A property from a GraphQL query response that will be displayed to the user
const GraphQLDisplayField = z.object({
  propertyName: z.string(),                                 // MUST match a property name in the query response
  label: z.string(),                                        // The label for the field
  labelTranslationKey: z.string().optional()                // The translation key for the label (DMP Tool only)
});

// A GraphQL query object
const GraphQLQuery = z.object({
  displayFields: z.array(GraphQLDisplayField),              // The fields to display from the query response
  localQueryId: z.string().optional(),                      // The ID of the query (required if no query)
  query: z.string().optional(),                             // The GraphQL query to execute (required if no localQueryId)
  responseField: z.string(),                                // How to get at the location of displayFields in the response
  variables: z.array(GraphQLVariable).optional()            // The variables for the query
});


// Filtered search question and answer
export const FilteredSearchQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('filteredSearch'),                        // The type of question
  graphQL: GraphQLQuery,                                    // The GraphQL query options for the filtered search
  attributes: BaseAttributes.unwrap().merge(z.object({
    multiple: z.boolean().optional()                        // Whether to allow multiple selections (default is true)
  })).optional()
}));

// Typeahead search question and answer
export const TypeaheadSearchQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('typeaheadSearch'),                       // The type of question
  graphQL: GraphQLQuery,                                    // The GraphQL query options for the typeahead search
}));

// This will ensure that object validations are against the Zod schemas defined above
export type FilteredSearchQuestionType = z.infer<typeof FilteredSearchQuestionSchema>;
export type TypeaheadSearchQuestionType = z.infer<typeof TypeaheadSearchQuestionSchema>;
