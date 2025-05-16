import { z } from 'zod';
import { QuestionTypesEnum } from '../questions/question';

// Abstract base schema for all answers
export const Answer = z.object({
  type: QuestionTypesEnum,                                    // The type of answer
  answer: z.string(),                                         // The answer to the question (string)
});

// This will ensure that object validations are against the Zod schemas defined above
export type AnswerType = z.infer<typeof Answer>;
