import { z } from "zod";
import { QuestionSchema } from "./question";

// A Yes/No True/False question and answer
export const BooleanQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('boolean'),                               // The type of question
  attributes: z.object({
    checked: z.boolean().optional()                         // If it is checked by default when rendered (default is false)
  })
}));

// A number question and answer
export const NumberQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('number'),                                // The type of question
  attributes: z.object({
    max: z.number().optional(),                             // The maximum value (no default)
    min: z.number().optional(),                             // The minimum value (default is 0)
    step: z.number().optional()                             // The step value (use 0.01 or similar for float)
  })
}));

// Currency question and answer
export const CurrencyQuestionSchema = NumberQuestionSchema.merge(z.object({
  type: z.literal('currency'),                              // The type of question
  meta: z.object({
    denomination: z.string().optional()                     // The currency denomination (default is USD)
  })
}));

// Email question and answer
export const EmailQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('email'),                                 // The type of question
  attributes: z.object({
    maxLength: z.number().optional(),                       // The maximum length of the email (no default)
    minLength: z.number().optional(),                       // The minimum length of the email (no default)
    multiple: z.boolean().optional(),                       // Allow multiple emails (default is false; comma separated)
    pattern: z.string().optional()                          // The regex pattern to match (no default)
  })
}));

// Text area question and answer
export const TextAreaQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('textArea'),                              // The type of question
  attributes: z.object({
    cols: z.number().optional(),                            // The number of columns (default is 20)
    maxLength: z.number().optional(),                       // The maximum length of the text (no default)
    minLength: z.number().optional(),                       // The minimum length of the text (no default)
    rows: z.number().optional()                             // The number of rows (default is 2)
  }),
  meta: z.object({
    asRichText: z.boolean().optional()                      // Whether to use rich text (default is false)
  })
}));

// Text question and answer
export const TextQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('text'),                                  // The type of question
  attributes: z.object({
    maxLength: z.number().optional(),                       // The maximum length of the text (no default)
    minLength: z.number().optional(),                       // The minimum length of the text (no default)
    pattern: z.string().optional()                          // The regex pattern to match (no default)
  }),
}));

// URL question and answer
export const URLQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('url'),                                   // The type of question
  attributes: z.object({
    maxLength: z.number().optional(),                       // The maximum length of the URL (no default)
    minLength: z.number().optional(),                       // The minimum length of the URL (no default)
    pattern: z.string().optional()                          // The regex pattern to match (no default)
  })
}));

// This will ensure that object validations are against the Zod schemas defined above
export type BooleanQuestionType = z.infer<typeof BooleanQuestionSchema>;
export type CurrencyQuestionType = z.infer<typeof CurrencyQuestionSchema>;
export type EmailQuestionType = z.infer<typeof EmailQuestionSchema>;
export type NumberQuestionType = z.infer<typeof NumberQuestionSchema>;
export type TextAreaQuestionType = z.infer<typeof TextAreaQuestionSchema>;
export type TextQuestionType = z.infer<typeof TextQuestionSchema>;
export type URLQuestionType = z.infer<typeof URLQuestionSchema>;
