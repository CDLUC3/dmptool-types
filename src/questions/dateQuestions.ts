import { z } from "zod";
import {
  BaseAttributesSchema,
  DefaultMeta,
  QuestionSchema
} from "./question";

const DateAttributesSchema = z.object({
  ...BaseAttributesSchema.shape,
  max: z.string().optional(),
  min: z.string().optional(),
  step: z.number().default(1),
});
const DefaultDateAttributes = DateAttributesSchema.parse({});

// Date question and answer
export const DateQuestionSchema = z.object({
  ...QuestionSchema.shape,
  type: z.literal('date'),
  attributes: DateAttributesSchema,
  showCommentField: z.boolean().optional()
});
export const DefaultDateQuestion = DateQuestionSchema.parse({
  type: 'date',
  attributes: DefaultDateAttributes,
  meta: DefaultMeta
})

const DateRangeStartColumnSchema = z.object({
  ...DateAttributesSchema.shape,
  label: z.string().default('From')
});
const DateRangeEndColumnSchema = z.object({
  ...DateAttributesSchema.shape,
  label: z.string().default('To')
})

// Date range question and answer
export const DateRangeQuestionSchema = z.object({
  ...QuestionSchema.shape,
  type: z.literal('dateRange'),
  columns: z.object({
    start: DateRangeStartColumnSchema,
    end: DateRangeEndColumnSchema,
  }),
  showCommentField: z.boolean().optional()
});
export const DefaultDateRangeQuestion = DateRangeQuestionSchema.parse({
  type: 'dateRange',
  attributes: BaseAttributesSchema.parse({}),
  meta: DefaultMeta,
  columns: {
    start: DateRangeStartColumnSchema.parse({}),
    end: DateRangeEndColumnSchema.parse({})
  }
})

// This will ensure that object validations are against the Zod schemas defined above
export type DateQuestionType = z.infer<typeof DateQuestionSchema>;
export type DateRangeQuestionType = z.infer<typeof DateRangeQuestionSchema>;

export const DateQuestionJSONSchema = z.toJSONSchema(DateQuestionSchema);
export const DateRangeQuestionJSONSchema = z.toJSONSchema(DateRangeQuestionSchema);
