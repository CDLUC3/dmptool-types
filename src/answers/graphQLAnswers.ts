import { z } from 'zod';
import { AnswerSchema } from './answer';

// Answers to GraphQL Question Types

export const FilteredSearchAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('filteredSearch'),
  answer: z.array(z.string()).default([''])        // The answer to the filtered search
}));

export const AffiliationSearchAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('affiliationSearch'),
  answer: z.object({
    affiliationId: z.string().default(''),   // The unique id of the affiliation (e.g. ROR URI)
    affiliationName: z.string().default('')  // The name of the affiliation
  }).default({})
}));

// This will ensure that object validations are against the Zod schemas defined above
export type FilteredSearchAnswerType = z.infer<typeof FilteredSearchAnswerSchema>;
export type AffiliationSearchAnswerType = z.infer<typeof AffiliationSearchAnswerSchema>;
