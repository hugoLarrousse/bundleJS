import { GraphQLScalarType } from 'graphql';
import { ObjectId } from 'mongodb';

const parseObjectId = _id => {
  if (ObjectId.isValid(_id)) {
    return ObjectId(_id);
  }
  throw new Error('ObjectId must be a single String of 12 or 24 hex characters');
};

export const rawType = new GraphQLScalarType({
  name: 'Raw',
  serialize: (value) => {
    return value;
  },
});

export const rawInputType = new GraphQLScalarType({
  name: 'RawInput',
  parseValue: (value) => {
    return value;
  },
  serialize: (value) => {
    return value;
  },
  parseLiteral: (ast) => {
    return ast.value;
  },
});

// Create an ObjectID scalar type!
export const GraphQLMongoObjectId = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'The ObjectId scalar type represents a mongodb unique ID',
  serialize: String,
  parseValue: parseObjectId,
  parseLiteral: (ast) => {
    return parseObjectId(ast.value);
  },
});
