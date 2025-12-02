import { z } from "zod";
import { QuestionSchema } from "./question";

const BaseAttributes = QuestionSchema.shape.attributes;

const NumberAttributesSchema = BaseAttributes.merge(z.object({
  max: z.number().optional(),
  min: z.number().default(0),
  step: z.number().default(1)   // For floats, use a decimal with the level of precision: 0.01
}))

export const CurrencyQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('currency'),
  attributes: NumberAttributesSchema.merge(z.object({
    denomination: z.string().default('USD')
  })).default({})
}));

export const NumberQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('number'),
  attributes: NumberAttributesSchema.default({})
}));

export const NumberRangeQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('numberRange'),
  attributes: BaseAttributes.default({}),
  columns: z.object({
    start: NumberAttributesSchema.default({ label: 'From' }),
    end: NumberAttributesSchema.default({ label: 'To' }),
  }).default({})
}));

export const NumberWithContextQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('numberWithContext'),
  attributes: NumberAttributesSchema.merge(z.object({
    // Additional context or description for the number input (e.g. units, explanation, etc.)
    context: z.array(z.object({
      label: z.string().default(''),
      labelTranslationKey: z.string().optional(),
      value: z.string().default('')
    })).default([])
  })).default({})
}));

export type CurrencyQuestionType = z.infer<typeof CurrencyQuestionSchema>;
export type NumberQuestionType = z.infer<typeof NumberQuestionSchema>;
export type NumberRangeQuestionType = z.infer<typeof NumberRangeQuestionSchema>;
export type NumberWithContextQuestionType = z.infer<typeof NumberWithContextQuestionSchema>;
