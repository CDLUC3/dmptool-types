import { z } from 'zod';
import { CURRENT_SCHEMA_VERSION, QuestionTypesEnum } from '../questions/question';

// Abstract base schema for all answers
export const AnswerSchema = z.object({
  type: QuestionTypesEnum,                                    // The type of answer
  answer: z.string(),                                         // The answer to the question (string)
  meta: z.object({
    schemaVersion: z.literal(CURRENT_SCHEMA_VERSION),         // The schema version of the answer
  })
});

// This will ensure that object validations are against the Zod schemas defined above
export type AnswerType = z.infer<typeof AnswerSchema>;
