import { z } from "zod";
import { Question } from "./primitiveQuestions";

// Date picker question and answer
export const DatePickerQuestion = Question.merge(z.object({
  type: z.literal('datePicker'),                            // The type of question
  attributes: z.object({
    max: z.string().optional(),                             // The maximum date (no default)
    min: z.string().optional(),                             // The minimum date (no default)
    step: z.number().optional()                             // The step value (default is 1 day)
  })
}));

// Date range question and answer
export const DateRangeQuestion = Question.merge(z.object({
  type: z.literal('dateRange'),                             // The type of question
  columns: z.object({
    start: DatePickerQuestion.merge(z.object({
      attributes: z.object({
        label: z.string()                                   // The label for the start date picker
      })
    })),
    end: DatePickerQuestion.merge(z.object({
      attributes: z.object({
        label: z.string()                                   // The label for the end date picker
      })
    }))
  })
}));

// This will ensure that object validations are against the Zod schemas defined above
export type DatePickerQuestionType = z.infer<typeof DatePickerQuestion>;
export type DateRangeQuestionType = z.infer<typeof DateRangeQuestion>;
