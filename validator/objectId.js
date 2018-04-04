const  { ObjectId } = require('mongodb');
const { isArray, isEmpty, isObjectLike, values } = require('lodash');

exports.isValidObjectId = (value) => ObjectId.isValid(value);

exports.isValidArrayOfObjectId = (array) => isArray(array)
  && !isEmpty(array)
  && array.every(value => ObjectId.isValid(value));

exports.isValidObjectOfObjectId = (obj) => isObjectLike(obj)
  && !isEmpty(obj)
  && values(obj).every(value => ObjectId.isValid(value));
