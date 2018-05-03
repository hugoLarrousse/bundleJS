import { GraphQLEnumType } from 'graphql';

import * as C from '../../../constants';

const makeEnumType = mapper => Object.values(mapper)
  .reduce((acc, c) => ({
    ...acc,
    [c]: { value: c },
  }), {});

export const authorTypeEnum = new GraphQLEnumType({
  name: 'AUTHOR_TYPES',
  values: makeEnumType(C.AUTHOR_TYPES),
});

export const countryTypeEnum = new GraphQLEnumType({
  name: 'COUNTRIES',
  values: makeEnumType(C.COUNTRIES),
});

export const providerTypeEnum = new GraphQLEnumType({
  name: 'PROVIDERS',
  values: makeEnumType(C.PROVIDERS),
});

export const genderTypeEnum = new GraphQLEnumType({
  name: 'GENDER',
  values: makeEnumType(C.GENDER),
});

export const typeMessageTypeEnum = new GraphQLEnumType({
  name: 'MESSAGE_TYPES',
  values: makeEnumType(C.MESSAGE_TYPES),
});

export const typeReportTypeEnum = new GraphQLEnumType({
  name: 'REPORT_TYPES',
  values: makeEnumType(C.REPORT_TYPES),
});

export const surveyTypeEnum = new GraphQLEnumType({
  name: 'SURVEY_TARGET_TYPES',
  values: makeEnumType(C.SURVEY_TARGET_TYPES),
});
