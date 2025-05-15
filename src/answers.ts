import { z } from 'zod';
import { QuestionTypesEnum } from './primitiveQuestions';

const Answer = z.object({
  type: QuestionTypesEnum,                                    // The type of answer
  answer: z.string(),                                         // The answer to the question (string)
});

export const BooleanAnswer = z.object({
  type: z.literal('boolean'),                                 // The type of answer
  answer: z.boolean()                                         // The answer to the question (true/false)
});

export const CheckboxesAnswer = z.object({
  type: z.literal('checkBoxes'),                              // The type of answer
  answer: z.array(z.string())                                 // The answer to the question (array of strings)
});

export const CurrencyAnswer = z.object({
  type: z.literal('currency'),                                // The type of answer
  answer: z.number()                                          // The answer to the question (number)
});

export const DatePickerAnswer = Answer.merge(z.object({
  type: z.literal('datePicker'),                              // The type of question
}));

export const DateRangeAnswer = Answer.merge(z.object({
  type: z.literal('dateRange'),                               // The type of answer
  answer: z.object({
    start: z.string(),                                        // The start date (string)
    end: z.string()                                           // The end date (string)
  })
}));

export const EmailAnswer = z.object({
  type: z.literal('email'),                                   // The type of question
  answer: z.string()                                          // The answer to the question (string)
});

export const FilteredSearchAnswer = Answer.merge(z.object({
  type: z.literal('filteredSearch'),                          // The type of answer
  answer: z.array(z.string())                                 // The answer to the filtered search (array of strings)
}));

export const NumberAnswer = z.object({
  type: z.literal('number'),                                  // The type of answer
  answer: z.number()                                          // The answer to the question (number)
});

export const RadioButtonsAnswer = z.object({
  type: z.literal('radioButtons'),                            // The type of answer
  answer: z.string()                                          // The answer to the question (string)
});

export const SelectBoxAnswer = z.object({
  type: z.literal('selectBox'),                               // The type of answer
  answer: z.string()                                          // The answer to the question (string)
});

export const TextAnswer = z.object({
  type: z.literal('text'),                                  // The type of answer
  answer: z.string()                                        // The answer to the question (string)
});

export const TextAreaAnswer = z.object({
  type: z.literal('textArea'),                                // The type of answer
  answer: z.string()                                          // The answer to the question (string)
});

export const TypeaheadSearchAnswer = z.object({
  type: z.literal('typeaheadSearch'),                         // The type of answer
  answer: z.string()                                          // The answer to the typeahead search (string)
});

export const URLAnswer = z.object({
  type: z.literal('url'),                                   // The type of answer
  answer: z.string()                                        // The answer to the question (string)
});

export const AnyAnswer = z.discriminatedUnion('type', [
  BooleanAnswer,
  CheckboxesAnswer,
  CurrencyAnswer,
  DatePickerAnswer,
  DateRangeAnswer,
  EmailAnswer,
  FilteredSearchAnswer,
  NumberAnswer,
  RadioButtonsAnswer,
  SelectBoxAnswer,
  TextAreaAnswer,
  TextAnswer,
  TypeaheadSearchAnswer,
  URLAnswer
]);

export const TableAnswer = z.object({
  type: z.literal('table'),                                   // The type of answer
  answer: z.array(AnyAnswer)                                  // The answer to the question (array of answers)
});

// This will ensure that object validations are against the Zod schemas defined above
export type AnyAnswerType = z.infer<typeof AnyAnswer>;
export type BooleanAnswerType = z.infer<typeof BooleanAnswer>;
export type CheckboxesAnswerType = z.infer<typeof CheckboxesAnswer>;
export type CurrencyAnswerType = z.infer<typeof CurrencyAnswer>;
export type DatePickerAnswerType = z.infer<typeof DatePickerAnswer>;
export type DateRangeAnswerType = z.infer<typeof DateRangeAnswer>;
export type EmailAnswerType = z.infer<typeof EmailAnswer>;
export type FilteredSearchAnswerType = z.infer<typeof FilteredSearchAnswer>
export type NumberAnswerType = z.infer<typeof NumberAnswer>;
export type RadioButtonsAnswerType = z.infer<typeof RadioButtonsAnswer>;
export type SelectBoxAnswerType = z.infer<typeof SelectBoxAnswer>;
export type TableAnswerType = z.infer<typeof TableAnswer>;
export type TextAnswerType = z.infer<typeof TextAnswer>;
export type TextAreaAnswerType = z.infer<typeof TextAreaAnswer>;
export type TypeaheadSearchAnswerType = z.infer<typeof TypeaheadSearchAnswer>;
export type URLAnswerType = z.infer<typeof URLAnswer>;
