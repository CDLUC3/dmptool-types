import { z } from "zod";
import { QuestionSchema } from "./question";

const BaseAttributes = QuestionSchema.shape.attributes;

const DateAttributesSchema = BaseAttributes.unwrap().merge(z.object({
  max: z.string().optional(),                             // The maximum date (no default)
  min: z.string().optional(),                             // The minimum date (no default)
  step: z.number().optional()                             // The step value (default is 1 day)
}));

// Date question and answer
export const DateQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('date'),                                  // The type of question
  attributes: DateAttributesSchema.optional(),
}));

// Date range question and answer
export const DateRangeQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('dateRange'),                             // The type of question
  columns: z.object({
    start: DateAttributesSchema.optional(),
    end: DateAttributesSchema.optional()
  })
}));

// This will ensure that object validations are against the Zod schemas defined above
export type DateQuestionType = z.infer<typeof DateQuestionSchema>;
export type DateRangeQuestionType = z.infer<typeof DateRangeQuestionSchema>;
