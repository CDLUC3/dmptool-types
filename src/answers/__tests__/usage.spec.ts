import { z } from "zod";
import { CURRENT_SCHEMA_VERSION, QuestionFormatsEnum } from "../../questions";
import {
  AnyAnswerType,
  AnswerSchemaMap,
} from "../index";

type AnswerType = z.infer<typeof QuestionFormatsEnum>

// Parse the Zod schema with no input to generate the default JSON schemas
function defaultJSON(name: string): AnyAnswerType | null {
  if (name in AnswerSchemaMap) {
    const schema: z.ZodTypeAny = AnswerSchemaMap[name as AnswerType];
    return schema.parse({ type: name });
  } else {
    return null;
  }
}

describe('Get question answer defaultJSON', () => {
  it('for affiliationSearch question format', () => {
    const json: AnyAnswerType | null = defaultJSON('affiliationSearch');

    const expectedJSON = {
      type: 'affiliationSearch',
      answer: {
        affiliationId: '',
        affiliationName: '',
      },
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(json).toEqual(expectedJSON);
  });

  it('for boolean question format', () => {
    const json: AnyAnswerType | null = defaultJSON('boolean');
    const expectedJSON = {
      type: 'boolean',
      answer: false,
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(json).toEqual(expectedJSON);
  });

  it('for checkBoxes question format', () => {
    const json: AnyAnswerType | null = defaultJSON('checkBoxes');
    const expectedJSON = {
      type: 'checkBoxes',
      answer: [''],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(json).toEqual(expectedJSON);
  });

  it('for currency question format', () => {
    const json: AnyAnswerType | null = defaultJSON('currency');
    const expectedJSON = {
      type: 'currency',
      answer: 0,
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(json).toEqual(expectedJSON);
  });
});

it('for date question format', () => {
  const json: AnyAnswerType | null = defaultJSON('date');
  const expectedJSON = {
    type: 'date',
    answer: '',
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(json).toEqual(expectedJSON);
});

it('for dateRange question format', () => {
  const json: AnyAnswerType | null = defaultJSON('dateRange');
  const expectedJSON = {
    type: 'dateRange',
    answer: {
      start: '',
      end: '',
    },
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(json).toEqual(expectedJSON);
});

it('for email question format', () => {
  const json: AnyAnswerType | null = defaultJSON('email');
  const expectedJSON = {
    type: 'email',
    answer: '',
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(json).toEqual(expectedJSON);
});

it('for multiselectBox question format', () => {
  const json: AnyAnswerType | null = defaultJSON('multiselectBox');
  const expectedJSON = {
    type: 'multiselectBox',
    answer: [''],
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(json).toEqual(expectedJSON);
});

it('for number question format', () => {
  const json: AnyAnswerType | null = defaultJSON('number');
  const expectedJSON = {
    type: 'number',
    answer: 0,
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(json).toEqual(expectedJSON);
});

it('for numberRange format', () => {
  const json: AnyAnswerType | null = defaultJSON('numberRange');
  const expectedJSON = {
    type: 'numberRange',
    answer: {
      start: 0,
      end: 0,
    },
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(json).toEqual(expectedJSON);
});

it('for radioButtons question format', () => {
  const json: AnyAnswerType | null = defaultJSON('radioButtons');
  const expectedJSON = {
    type: 'radioButtons',
    answer: '',
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(json).toEqual(expectedJSON);
});

it('for selectBox question format', () => {
  const json: AnyAnswerType | null = defaultJSON('selectBox');
  const expectedJSON = {
    type: 'selectBox',
    answer: '',
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(json).toEqual(expectedJSON);
});

it('for table question format', () => {
  const json: AnyAnswerType | null = defaultJSON('table');
  const expectedJSON = {
    type: 'table',
    columnHeadings: [
      'Column A',
    ],
    answer: [{
      columns: [{
        type: 'textArea',
        answer: '',
        meta: {schemaVersion: CURRENT_SCHEMA_VERSION},
      }],
    }],
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(json).toEqual(expectedJSON);
});

it('for text question format', () => {
  const json: AnyAnswerType | null = defaultJSON('text');
  const expectedJSON = {
    type: 'text',
    answer: '',
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(json).toEqual(expectedJSON);
});

it('for textArea question format', () => {
  const json: AnyAnswerType | null = defaultJSON('textArea');
  const expectedJSON = {
    type: 'textArea',
    answer: '',
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(json).toEqual(expectedJSON);
});

it('for url question format', () => {
  const json: AnyAnswerType | null = defaultJSON('url');
  const expectedJSON = {
    type: 'url',
    answer: '',
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(json).toEqual(expectedJSON);
});
