/* ------------------------------------------
   GraphQL core
--------------------------------------------- */
import express from 'express';
import {
  graphql,
  GraphQLSchema,
} from 'graphql';
import graphQLHTTP from 'express-graphql';
import cors from 'cors';

import queryType from './query';
import mutationType from './mutation';

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

const rootValue = {};
const contextValue = {};
const corsOptions = {
  methods: ['OPTIONS', 'POST'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  origin: '*', // TODO improve with env values for production
};

const makeRequest = (requestString, variableValues = null) =>
  graphql(schema, requestString, rootValue, contextValue, variableValues);

const createGraphQLRouter = env => {
  const router = express.Router();
  router.use('/graph', cors(corsOptions), graphQLHTTP(req => { // res, params
    return {
      schema,
      graphiql: false,
      context: {
        headers: req.headers || {},
      },
    };
  }));
  if (env === 'development') {
    router.use('/graphi', graphQLHTTP(req => { // res, params
      return {
        schema,
        graphiql: true,
        context: {
          headers: req.headers || {},
        },
      };
    }));
  }
  return router;
};

export {
  makeRequest,
  schema,
  createGraphQLRouter,
};

// All graphql-js methods
// import {
//   graphql,
//   getNamedType,
//   getNullableType,
//   GraphQLBoolean,
//   GraphQLEnumType,
//   GraphQLFloat,
//   GraphQLID,
//   GraphQLInputObjectType,
//   GraphQLInt,
//   GraphQLInterfaceType,
//   GraphQLList,
//   GraphQLNonNull,
//   GraphQLObjectType,
//   GraphQLScalarType,
//   GraphQLSchema,
//   GraphQLString,
//   GraphQLUnionType,
//   isAbstractType,
//   isCompositeType,
//   isInputType,
//   isLeafType,
//   isOutputType,
// } from 'graphql';
