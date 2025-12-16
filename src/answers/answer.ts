import { z } from 'zod';
import {
  CURRENT_SCHEMA_VERSION,
  DefaultMeta,
  QuestionFormatsEnum
} from '../questions';

// Abstract base schema for all answers
export const AnswerSchema = z.object({
  type: QuestionFormatsEnum,                                    // The type of answer
  meta: z.object({
    schemaVersion: z.string().default(CURRENT_SCHEMA_VERSION), // The schema version of the answer
  })
});
export const DefaultAnswer = AnswerSchema.parse({
  type: 'textArea',
  answer: "",
  meta: DefaultMeta
});

// This will ensure that object validations are against the Zod schemas defined above
export type AnswerType = z.infer<typeof AnswerSchema>;

export const AnswerJSONSchema = z.toJSONSchema(AnswerSchema);
