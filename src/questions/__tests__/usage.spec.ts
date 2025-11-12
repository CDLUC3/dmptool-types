import { z } from "zod";
import {
  CURRENT_SCHEMA_VERSION,
  QuestionFormatsEnum, QuestionFormatsUsage, QuestionFormatsUsageInterface
} from "../question";
import {
  affiliationQuery,
  AnyQuestionType, licenseQuery, metadataStandardQuery,
  QuestionSchemaMap, repositoryQuery,
} from "../index";

export interface QuestionFormatInterface {
  type?: string;
  title?: string;
  usageDescription?: string;
  defaultJSON?: AnyQuestionType;
  schemaVersion?: string;
}

type QuestionType = z.infer<typeof QuestionFormatsEnum>

// Parse the Zod schema with no input to generate the default JSON schemas
function questionFormatInfo(name: string): QuestionFormatInterface | null {
  if (name in QuestionSchemaMap) {
    const usage: QuestionFormatsUsageInterface = QuestionFormatsUsage[name as QuestionType];
    const schema: z.ZodTypeAny = QuestionSchemaMap[name as QuestionType];
    const parsedSchema = schema.parse({ type: name });

    return {
      type: name,
      title: usage?.title,
      usageDescription: usage?.usageDescription,
      defaultJSON: parsedSchema
    };
  } else {
    return null;
  }
}

describe('Get question format information', () => {
  it('for affiliationSearch question format', () => {
    const format: QuestionFormatInterface | null = questionFormatInfo('affiliationSearch');

    expect(format?.type).toEqual('affiliationSearch');
    expect(format?.title).toEqual('Affiliation Search');
    expect(format?.usageDescription).toBeDefined();
    const expectedJSON = {
      type: 'affiliationSearch',
      attributes: {},
      meta: { schemaVersion: '1.0' },
      graphQL: {
        displayFields: [{
          label: "Institution",
          propertyName: "displayName",
        }],
        query: affiliationQuery,
        responseField: 'affiliations.items',
        variables: [{
          label: "Search for your institution",
          minLength: 3,
          name: "name",
          type: "string",
        }],
        answerField: 'uri'
      }
    };
    expect(format?.defaultJSON).toEqual(expectedJSON);
  });

  it('for boolean question format', () => {
    const format: QuestionFormatInterface | null = questionFormatInfo('boolean');

    expect(format?.type).toEqual('boolean');
    expect(format?.title).toEqual('Yes/No Field');
    expect(format?.usageDescription).toBeDefined();
    const expectedJSON = {
      type: 'boolean',
      attributes: { checked: false },
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(format?.defaultJSON).toEqual(expectedJSON);
  });

  it('for checkBoxes question format', () => {
    const format: QuestionFormatInterface | null = questionFormatInfo('checkBoxes');

    expect(format?.type).toEqual('checkBoxes');
    expect(format?.title).toEqual('Check Boxes');
    expect(format?.usageDescription).toBeDefined();
    const expectedJSON = {
      type: 'checkBoxes',
      attributes: {},
      options: [{
        label: 'Option A',
        value: 'a',
        checked: false
      }],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(format?.defaultJSON).toEqual(expectedJSON);
  });

  it('for currency question format', () => {
    const format: QuestionFormatInterface | null = questionFormatInfo('currency');

    expect(format?.type).toEqual('currency');
    expect(format?.title).toEqual('Currency Field');
    expect(format?.usageDescription).toBeDefined();
    const expectedJSON = {
      type: 'currency',
      attributes: {
        denomination: 'USD',
        min: 0,
        step: 1
      },
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
    };
    expect(format?.defaultJSON).toEqual(expectedJSON);
  });
});

it('for date question format', () => {
  const format: QuestionFormatInterface | null = questionFormatInfo('date');

  expect(format?.type).toEqual('date');
  expect(format?.title).toEqual('Date Field');
  expect(format?.usageDescription).toBeDefined();
  const expectedJSON = {
    type: 'date',
    attributes: {
      step: 1
    },
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(format?.defaultJSON).toEqual(expectedJSON);
});

it('for dateRange question format', () => {
  const format: QuestionFormatInterface | null = questionFormatInfo('dateRange');

  expect(format?.type).toEqual('dateRange');
  expect(format?.title).toEqual('Date Range');
  expect(format?.usageDescription).toBeDefined();
  const expectedJSON = {
    type: 'dateRange',
    attributes: {},
    columns: {
      start: {
        label: 'From',
        step: 1
      },
      end: {
        label: 'To',
        step: 1
      }
    },
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(format?.defaultJSON).toEqual(expectedJSON);
});

it('for email question format', () => {
  const format: QuestionFormatInterface | null = questionFormatInfo('email');

  expect(format?.type).toEqual('email');
  expect(format?.title).toEqual('Email Field');
  expect(format?.usageDescription).toBeDefined();
  const expectedJSON = {
    type: 'email',
    attributes: {
      maxLength: 255,
      multiple: false,
    },
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(format?.defaultJSON).toEqual(expectedJSON);
});

it('for licenseSearch question format', () => {
  const format: QuestionFormatInterface | null = questionFormatInfo('licenseSearch');

  expect(format?.type).toEqual('licenseSearch');
  expect(format?.title).toEqual('License Search');
  expect(format?.usageDescription).toBeDefined();
  const expectedJSON = {
    type: 'licenseSearch',
    attributes: {},
    meta: { schemaVersion: '1.0' },
    graphQL: {
      displayFields: [
        {
          label: "Name",
          propertyName: "name",
        },
        {
          label: "Description",
          propertyName: "description",
        },
        {
          label: "Recommended",
          propertyName: "recommended",
        }
      ],
      query: licenseQuery,
      responseField: 'licenses.items',
      variables: [
        {
        label: "Search for a license",
        minLength: 3,
        name: "term",
        type: "string",
        },
        {
          label: "Pagination Options",
          name: "paginationOptions",
          type: "paginationOptions",
        }
      ],
      answerField: 'uri'
    }
  };
  expect(format?.defaultJSON).toEqual(expectedJSON);
});

it('for metadataStandardSearch question format', () => {
  const format: QuestionFormatInterface | null = questionFormatInfo('metadataStandardSearch');

  expect(format?.type).toEqual('metadataStandardSearch');
  expect(format?.title).toEqual('Metadata Standard Search');
  expect(format?.usageDescription).toBeDefined();
  const expectedJSON = {
    type: 'metadataStandardSearch',
    attributes: {},
    meta: { schemaVersion: '1.0' },
    graphQL: {
      displayFields: [
        {
          label: "Name",
          propertyName: "name",
        },
        {
          label: "Description",
          propertyName: "description",
        },
        {
          label: "Website",
          propertyName: "website",
        },
        {
          label: "Keywords",
          propertyName: "keywords",
        }
      ],
      query: metadataStandardQuery,
      responseField: 'metadataStandards.items',
      variables: [
        {
          label: "Search for a metadata standard",
          minLength: 3,
          name: "term",
          type: "string",
        },
        {
          label: "Research domain",
          name: "researchDomainId",
          type: "string",
          minLength: 3,
        },
        {
          label: "Pagination Options",
          name: "paginationOptions",
          type: "paginationOptions",
        }
      ],
      answerField: 'uri'
    }
  };
  expect(format?.defaultJSON).toEqual(expectedJSON);
});

it('for multiselectBox question format', () => {
  const format: QuestionFormatInterface | null = questionFormatInfo('multiselectBox');

  expect(format?.type).toEqual('multiselectBox');
  expect(format?.title).toEqual('Multi-select Box');
  expect(format?.usageDescription).toBeDefined();
  const expectedJSON = {
    type: 'multiselectBox',
    attributes: {
      multiple: true,
    },
    options: [{
      label: 'Option A',
      value: 'a',
      selected: false
    }],
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(format?.defaultJSON).toEqual(expectedJSON);
});

it('for number question format', () => {
  const format: QuestionFormatInterface | null = questionFormatInfo('number');

  expect(format?.type).toEqual('number');
  expect(format?.title).toEqual('Number Field');
  expect(format?.usageDescription).toBeDefined();
  const expectedJSON = {
    type: 'number',
    attributes: {
      min: 0,
      step: 1,
    },
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(format?.defaultJSON).toEqual(expectedJSON);
});

it('for numberRange format', () => {
  const format: QuestionFormatInterface | null = questionFormatInfo('numberRange');

  expect(format?.type).toEqual('numberRange');
  expect(format?.title).toEqual('Number Range');
  expect(format?.usageDescription).toBeDefined();
  const expectedJSON = {
    type: 'numberRange',
    attributes: {},
    columns: {
      start: {
        label: 'From',
        min: 0,
        step: 1,
      },
      end: {
        label: 'To',
        min: 0,
        step: 1,
      }
    },
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(format?.defaultJSON).toEqual(expectedJSON);
});

it('for radioButtons question format', () => {
  const format: QuestionFormatInterface | null = questionFormatInfo('radioButtons');

  expect(format?.type).toEqual('radioButtons');
  expect(format?.title).toEqual('Radio Buttons');
  expect(format?.usageDescription).toBeDefined();
  const expectedJSON = {
    type: 'radioButtons',
    attributes: {},
    options: [{
      label: 'Option A',
      value: 'a',
      selected: false
    }],
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(format?.defaultJSON).toEqual(expectedJSON);
});

it('for repositorySearch question format', () => {
  const format: QuestionFormatInterface | null = questionFormatInfo('repositorySearch');

  expect(format?.type).toEqual('repositorySearch');
  expect(format?.title).toEqual('Repository Search');
  expect(format?.usageDescription).toBeDefined();
  const expectedJSON = {
    type: 'repositorySearch',
    attributes: {},
    meta: { schemaVersion: '1.0' },
    graphQL: {
      displayFields: [
        {
          label: "Name",
          propertyName: "name",
        },
        {
          label: "Description",
          propertyName: "description",
        },
        {
          label: "Website",
          propertyName: "website",
        },
        {
          label: "Keywords",
          propertyName: "keywords",
        }
      ],
      query: repositoryQuery,
      responseField: 'repositories.items',
      variables: [
        {
          label: "Search for a repository",
          minLength: 3,
          name: "term",
          type: "string",
        },
        {
          label: "Research domain",
          name: "researchDomainId",
          type: "string",
          minLength: 3
        },
        {
          label: "Repository type",
          name: "repositoryType",
          type: "string",
          minLength: 3
        },
        {
          label: "Pagination Options",
          name: "paginationOptions",
          type: "paginationOptions",
        }
      ],
      answerField: 'uri'
    }
  };
  expect(format?.defaultJSON).toEqual(expectedJSON);
});

it('for selectBox question format', () => {
  const format: QuestionFormatInterface | null = questionFormatInfo('selectBox');

  expect(format?.type).toEqual('selectBox');
  expect(format?.title).toEqual('Select Box');
  expect(format?.usageDescription).toBeDefined();
  const expectedJSON = {
    type: 'selectBox',
    attributes: {
      multiple: false,
    },
    options: [{
      label: 'Option A',
      value: 'a',
      selected: false
    }],
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(format?.defaultJSON).toEqual(expectedJSON);
});

it('for table question format', () => {
  const format: QuestionFormatInterface | null = questionFormatInfo('table');

  expect(format?.type).toEqual('table');
  expect(format?.title).toEqual('Table');
  expect(format?.usageDescription).toBeDefined();
  const expectedJSON = {
    type: 'table',
    attributes: {
      canAddRows: true,
      canRemoveRows: true,
      initialRows: 1
    },
    columns: [{
      heading: 'Column A',
      enabled: true,
      required: false,
      content: {
        type: 'textArea',
        attributes: {
          asRichText: true,
          cols: 20,
          rows: 2,
        },
        meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
      },
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
    }],
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(format?.defaultJSON).toEqual(expectedJSON);
});

it('for text question format', () => {
  const format: QuestionFormatInterface | null = questionFormatInfo('text');

  expect(format?.type).toEqual('text');
  expect(format?.title).toEqual('Text Field');
  expect(format?.usageDescription).toBeDefined();
  const expectedJSON = {
    type: 'text',
    attributes: {
      maxLength: 255,
    },
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(format?.defaultJSON).toEqual(expectedJSON);
});

it('for textArea question format', () => {
  const format: QuestionFormatInterface | null = questionFormatInfo('textArea');

  expect(format?.type).toEqual('textArea');
  expect(format?.title).toEqual('Text Area');
  expect(format?.usageDescription).toBeDefined();
  const expectedJSON = {
    type: 'textArea',
    attributes: {
      asRichText: true,
      cols: 20,
      rows: 2,
    },
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(format?.defaultJSON).toEqual(expectedJSON);
});

it('for url question format', () => {
  const format: QuestionFormatInterface | null = questionFormatInfo('url');

  expect(format?.type).toEqual('url');
  expect(format?.title).toEqual('URL Field');
  expect(format?.usageDescription).toBeDefined();
  const expectedJSON = {
    type: 'url',
    attributes: {
      maxLength: 255,
    },
    meta: { schemaVersion: CURRENT_SCHEMA_VERSION },
  };
  expect(format?.defaultJSON).toEqual(expectedJSON);
});
