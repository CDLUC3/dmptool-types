import { z } from "zod";
import { QuestionSchema } from "./question";

const BaseAttributes = QuestionSchema.shape.attributes;

const DateAttributesSchema = BaseAttributes.merge(z.object({
  max: z.string().optional(),
  min: z.string().optional(),
  step: z.number().default(1),
}));

// Date question and answer
export const DateQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('date'),
  attributes: DateAttributesSchema.default({})
}));

// Date range question and answer
export const DateRangeQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('dateRange'),
  attributes: BaseAttributes.default({}),
  columns: z.object({
    start: DateAttributesSchema.merge(z.object({
      label: z.string().default('From')
    })).default({}),
    end: DateAttributesSchema.merge(z.object({
      label: z.string().default('To')
    })).default({}),
  }).default({})
}));

// This will ensure that object validations are against the Zod schemas defined above
export type DateQuestionType = z.infer<typeof DateQuestionSchema>;
export type DateRangeQuestionType = z.infer<typeof DateRangeQuestionSchema>;
