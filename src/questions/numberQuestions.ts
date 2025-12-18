import { z } from "zod";
import {
  BaseAttributesSchema,
  DefaultMeta,
  QuestionSchema
} from "./question";

const NumberAttributesSchema = z.object({
  ...BaseAttributesSchema.shape,
  max: z.number().optional(),
  min: z.number().default(0),
  step: z.number().default(1)   // For floats, use a decimal with the level of precision: 0.01
});
const DefaultNumberAttributes = NumberAttributesSchema.parse({});

export const CurrencyQuestionSchema = z.object({
  ...QuestionSchema.shape,
  type: z.literal('currency'),
  attributes: z.object({
    ...NumberAttributesSchema.shape,
    denomination: z.string().default('USD')
  }),
  showCommentField: z.boolean().optional().default(false)
});
export const DefaultCurrencyQuestion = CurrencyQuestionSchema.parse({
  type: 'currency',
  attributes: DefaultNumberAttributes,
  meta: DefaultMeta,
  showCommentField: false
})

export const NumberQuestionSchema = z.object({
  ...QuestionSchema.shape,
  type: z.literal('number'),
  attributes: NumberAttributesSchema,
  showCommentField: z.boolean().optional().default(false)
});
export const DefaultNumberQuestion = NumberQuestionSchema.parse({
  type: 'number',
  attributes: DefaultNumberAttributes,
  meta: DefaultMeta,
  showCommentField: false
});

const NumberRangeStartColumnSchema = z.object({
  ...NumberAttributesSchema.shape,
  label: z.string().default('From'),
  labelTranslationKey: z.string().optional(),
});

const NumberRangeEndColumnSchema = z.object({
  ...NumberAttributesSchema.shape,
  label: z.string().default('To'),
  labelTranslationKey: z.string().optional(),
})

export const NumberRangeQuestionSchema = z.object({
  ...QuestionSchema.shape,
  type: z.literal('numberRange'),
  columns: z.object({
    start: NumberRangeStartColumnSchema,
    end: NumberRangeEndColumnSchema
  }),
  showCommentField: z.boolean().optional().default(false)
});
export const DefaultNumberRangeQuestion = NumberRangeQuestionSchema.parse({
  type: 'numberRange',
  attributes: BaseAttributesSchema.parse({}),
  meta: DefaultMeta,
  columns: {
    start: NumberRangeStartColumnSchema.parse({}),
    end: NumberRangeEndColumnSchema.parse({})
  },
  showCommentField: false
})

const NumberWithContextAttributesSchema = z.object({
  ...NumberAttributesSchema.shape,
  // Additional context or description for the number input (e.g. units, explanation, etc.)
  context: z.array(z.object({
    label: z.string().default(''),
    labelTranslationKey: z.string().optional(),
    value: z.string().default(''),
    selected: z.boolean().default(false)
  }))
});
const DefaultNumberWithContextAttributes = NumberWithContextAttributesSchema.parse({
  ...DefaultNumberQuestion.attributes,
  context: [],
});

export const NumberWithContextQuestionSchema = z.object({
  ...QuestionSchema.shape,
  type: z.literal('numberWithContext'),
  attributes: NumberWithContextAttributesSchema,
  showCommentField: z.boolean().optional().default(false)
});
export const DefaultNumberWithContextQuestion = NumberWithContextQuestionSchema.parse({
  type: 'numberWithContext',
  attributes: DefaultNumberWithContextAttributes,
  meta: DefaultMeta,
  showCommentField: false
});

export type CurrencyQuestionType = z.infer<typeof CurrencyQuestionSchema>;
export type NumberQuestionType = z.infer<typeof NumberQuestionSchema>;
export type NumberRangeQuestionType = z.infer<typeof NumberRangeQuestionSchema>;
export type NumberWithContextQuestionType = z.infer<typeof NumberWithContextQuestionSchema>;

export const CurrencyQuestionJSONSchema = z.toJSONSchema(CurrencyQuestionSchema);
export const NumberQuestionJSONSchema = z.toJSONSchema(NumberQuestionSchema);
export const NumberRangeQuestionJSONSchema = z.toJSONSchema(NumberRangeQuestionSchema);
export const NumberWithContextQuestionJSONSchema = z.toJSONSchema(NumberWithContextQuestionSchema);
