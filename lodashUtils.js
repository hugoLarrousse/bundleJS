// https://lodash.com/docs/4.17.5
const _ = require('lodash');

/***** Array *****/

// @ compare array with values 
// @return excluded value
exports.difference = (array, values) => _.difference(array, values);

// @ compare array with values + lodashFunction to test
// @return excluded value
exports.differenceWith = (array, values, lodashFunction) => _.differenceWith(array, values, lodashFunction);

// @ Creates a slice of array with n elements dropped from the beginning.
// @ Returns the slice of array.
exports.drop = (array, n) => _.drop(array, n)

//fill array with value between start & end
exports.fill = (array, value, start, end) => _.fill(array, value, start, end);


/***** Lang *****/

exports.isString = (value) => _.isString(value);

exports.isArray = (array) => _.isArray(array);

exports.isEmpty = (value) => _.isEmpty(value);

exports.isObjectLike = (vallue) => _.isObjectLike(value);