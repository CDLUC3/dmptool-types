import { z } from 'zod';
import { Answer } from './answer';

// Answers to GraphQL Question Types

export const FilteredSearchAnswer = Answer.merge(z.object({
  type: z.literal('filteredSearch'),                          // The type of answer
  answer: z.array(z.string())                                 // The answer to the filtered search (array of strings)
}));

export const TypeaheadSearchAnswer = Answer.merge(z.object({
  type: z.literal('typeaheadSearch'),                         // The type of answer
  answer: z.string()                                          // The answer to the typeahead search (string)
}));

// This will ensure that object validations are against the Zod schemas defined above
export type FilteredSearchAnswerType = z.infer<typeof FilteredSearchAnswer>;
export type TypeaheadSearchAnswerType = z.infer<typeof TypeaheadSearchAnswer>;
