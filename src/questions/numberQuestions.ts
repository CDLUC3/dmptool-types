import { z } from "zod/index";
import { QuestionSchema} from "./question";

const BaseAttributes = QuestionSchema.shape.attributes;

const NumberAttributesSchema = BaseAttributes.merge(z.object({
  max: z.number().optional(),
  min: z.number().optional(),
  step: z.number().optional(),
}));

// A Yes/No True/False question and answer
export const BooleanQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('boolean'),                               // The type of question
  attributes: BaseAttributes.merge(z.object({
    checked: z.boolean().optional(),                        // If it is checked by default when rendered (default is false)
  })),
}));

// A number question and answer
export const NumberQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('number'),                                // The type of question
  attributes: NumberAttributesSchema.optional(),
}));

// Currency question and answer
export const CurrencyQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('currency'),
  attributes: BaseAttributes.merge(z.object({// The type of question
    denomination: z.string().optional()                     // The currency denomination (default is USD)
  })),
}));

// A range of numbers question and answer
export const NumberRangeQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('numberRange'),                           // The type of question
  columns: z.object({
    start: NumberQuestionSchema,
    end: NumberQuestionSchema,
  })
}));

export type BooleanQuestionType = z.infer<typeof BooleanQuestionSchema>;
export type CurrencyQuestionType = z.infer<typeof CurrencyQuestionSchema>;
export type NumberQuestionType = z.infer<typeof NumberQuestionSchema>;
export type NumberRangeQuestionType = z.infer<typeof NumberRangeQuestionSchema>;
