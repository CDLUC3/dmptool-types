import { z } from "zod";
import {
  BaseAttributesSchema,
  DefaultMeta,
  QuestionSchema
} from "./question";

const TextAttributesSchema = z.object({
  ...BaseAttributesSchema.shape,
  maxLength: z.number().default(255),
  minLength: z.number().optional(),
  pattern: z.string().optional(),
  defaultValue: z.string().optional()
});

const DefaultTextAttributes = TextAttributesSchema.parse({});

// Email question and answer
export const EmailQuestionSchema = z.object({
  ...QuestionSchema.shape,
  type: z.literal('email'),
  attributes: z.object({
    ...TextAttributesSchema.shape,
    multiple: z.boolean().default(false),
  }),
  showCommentField: z.boolean().optional()
});
export const DefaultEmailQuestion = EmailQuestionSchema.parse({
  type: 'email',
  attributes: EmailQuestionSchema.shape.attributes,
  meta: DefaultMeta
});

// Text area question and answer
export const TextAreaQuestionSchema = z.object({
  ...QuestionSchema.shape,
  type: z.literal('textArea'),
  attributes: z.object({
    ...TextAttributesSchema.shape,
    cols: z.number().default(20),
    rows: z.number().default(2),
    asRichText: z.boolean().default(true),
    maxLength: z.number().default(10000),
  })
});
export const DefaultTextAreaQuestion = TextAreaQuestionSchema.parse({
  type: 'textArea',
  attributes: TextAreaQuestionSchema.shape.attributes,
  meta: DefaultMeta
});

// Text question and answer
export const TextQuestionSchema = z.object({
  ...QuestionSchema.shape,
  type: z.literal('text'),
  attributes: TextAttributesSchema
});
export const DefaultTextQuestion = TextQuestionSchema.parse({
  type: 'text',
  attributes: DefaultTextAttributes,
  meta: DefaultMeta
});

// URL question and answer
export const URLQuestionSchema = z.object({
  ...QuestionSchema.shape,
  type: z.literal('url'),
  attributes: TextAttributesSchema,
  showCommentField: z.boolean().optional()
});
export const DefaultURLQuestion = URLQuestionSchema.parse({
  type: 'url',
  attributes: DefaultTextAttributes,
  meta: DefaultMeta
});

// This will ensure that object validations are against the Zod schemas defined above
export type EmailQuestionType = z.infer<typeof EmailQuestionSchema>;
export type TextAreaQuestionType = z.infer<typeof TextAreaQuestionSchema>;
export type TextQuestionType = z.infer<typeof TextQuestionSchema>;
export type URLQuestionType = z.infer<typeof URLQuestionSchema>;

export const EmailQuestionJSONSchema = z.toJSONSchema(EmailQuestionSchema);
export const TextAreaQuestionJSONSchema = z.toJSONSchema(TextAreaQuestionSchema);
export const TextQuestionJSONSchema = z.toJSONSchema(TextQuestionSchema);
export const URLQuestionJSONSchema = z.toJSONSchema(URLQuestionSchema);
