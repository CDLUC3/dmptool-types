import { z } from "zod";
import { QuestionSchema } from "./question";

const BaseMeta = QuestionSchema.shape.meta;
const BaseAttributes = QuestionSchema.shape.attributes;

const TextAttributesSchema = BaseAttributes.unwrap().merge(z.object({
  maxLength: z.number().optional(),                       // The maximum length of the text (no default)
  minLength: z.number().optional(),                       // The minimum length of the text (no default)
  pattern: z.string().optional()                          // The regex pattern to match (no default)
}));

// Email question and answer
export const EmailQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('email'),                                 // The type of question
  attributes: TextAttributesSchema.merge(z.object({
    multiple: z.boolean().optional(),                       // Allow multiple emails (default is false; comma separated)
  })).optional(),
}));

// Text area question and answer
export const TextAreaQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('textArea'),                              // The type of question
  attributes: BaseAttributes.unwrap().merge(z.object({
    cols: z.number().optional(),                            // The number of columns (default is 20)
    maxLength: z.number().optional(),                       // The maximum length of the text (no default)
    minLength: z.number().optional(),                       // The minimum length of the text (no default)
    rows: z.number().optional()                             // The number of rows (default is 2)
  })).optional(),
  meta: BaseMeta.unwrap().extend({
    asRichText: z.boolean().optional()                      // Whether to use rich text (default is false)
  })
}));

// Text question and answer
export const TextQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('text'),                                  // The type of question
  attributes: TextAttributesSchema.optional(),
}));

// URL question and answer
export const URLQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('url'),                                   // The type of question
  attributes: TextAttributesSchema.optional(),
}));

// This will ensure that object validations are against the Zod schemas defined above
export type EmailQuestionType = z.infer<typeof EmailQuestionSchema>;
export type TextAreaQuestionType = z.infer<typeof TextAreaQuestionSchema>;
export type TextQuestionType = z.infer<typeof TextQuestionSchema>;
export type URLQuestionType = z.infer<typeof URLQuestionSchema>;
