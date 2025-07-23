import { z } from "zod";
import { QuestionSchema } from "./question";

const BaseAttributes = QuestionSchema.shape.attributes;

const TextAttributesSchema = BaseAttributes.merge(z.object({
  maxLength: z.number().default(255),
  minLength: z.number().optional(),
  pattern: z.string().optional()
}));

// Email question and answer
export const EmailQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('email'),
  attributes: TextAttributesSchema.merge(z.object({
    multiple: z.boolean().default(false),
  })).default({})
}));

// Text area question and answer
export const TextAreaQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('textArea'),
  attributes: BaseAttributes.merge(z.object({
    cols: z.number().default(20),
    maxLength: z.number().optional(),
    minLength: z.number().optional(),
    rows: z.number().default(2),
    asRichText: z.boolean().default(true),
  })).default({})
}));

// Text question and answer
export const TextQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('text'),
  attributes: TextAttributesSchema.default({})
}));

// URL question and answer
export const URLQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('url'),
  attributes: TextAttributesSchema.default({})
}));

// This will ensure that object validations are against the Zod schemas defined above
export type EmailQuestionType = z.infer<typeof EmailQuestionSchema>;
export type TextAreaQuestionType = z.infer<typeof TextAreaQuestionSchema>;
export type TextQuestionType = z.infer<typeof TextQuestionSchema>;
export type URLQuestionType = z.infer<typeof URLQuestionSchema>;
