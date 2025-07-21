import { z } from "zod";
import { QuestionSchema } from "./question";

const BaseAttributes = QuestionSchema.shape.attributes;

const NumberAttributesSchema = BaseAttributes.unwrap().merge(z.object({
  max: z.number().optional(),                          // The highest value allowed (default no max)
  min: z.number().optional(),                               // The lowest amount allowed (default 0)
  step: z.number().optional()    // The amount to increment. To allow decimals, use 0.01 (default 1)
}))

export const CurrencyQuestionSchema = QuestionSchema.merge(z.object({
    type: z.literal('currency'),
    attributes: NumberAttributesSchema.merge(z.object({
      denomination: z.string().optional(),                  // The currency type (default is "USD")
    })).optional(),
}));

export const NumberQuestionSchema = QuestionSchema.merge(z.object({
    type: z.literal('number'),
    attributes: NumberAttributesSchema.optional(),
}));

export const NumberRangeQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('numberRange'),
  columns: z.object({
    start: NumberAttributesSchema.optional(),
    end: NumberAttributesSchema.optional()
  })
}));

export type CurrencyQuestionType = z.infer<typeof CurrencyQuestionSchema>;
export type NumberQuestionType = z.infer<typeof NumberQuestionSchema>;
export type NumberRangeQuestionType = z.infer<typeof NumberRangeQuestionSchema>;
