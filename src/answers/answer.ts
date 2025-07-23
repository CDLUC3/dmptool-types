import { z } from 'zod';
import { CURRENT_SCHEMA_VERSION, QuestionFormatsEnum } from '../questions/question';

// Abstract base schema for all answers
export const AnswerSchema = z.object({
  type: QuestionFormatsEnum,                                    // The type of answer
  meta: z.object({
    schemaVersion: z.string().default(CURRENT_SCHEMA_VERSION), // The schema version of the answer
  }).default({})
});

// This will ensure that object validations are against the Zod schemas defined above
export type AnswerType = z.infer<typeof AnswerSchema>;
