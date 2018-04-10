/* ------------------------------------------
 HTTP Request factory
 --------------------------------------------- */
 import requestRetry from 'requestretry';
 import isObject from 'lodash/isObject';
 import isNumber from 'lodash/isNumber';
 import isFunction from 'lodash/isFunction';
 import isBoolean from 'lodash/isBoolean';
 
 const defaultRetryStrategy = (err, response) => {
   return (response && response.body && (response.statusCode < 200 || response.statusCode > 299));
 };
 
 export const makeOptions = options => {
   if (!isObject(options)) {
     throw new Error('options is not an object');
   }
   const {
     url,
     method,
     qs,
     body,
     headers,
     redirect,
     timeout,
     maxAttempts,
     retryDelay,
     retryStrategy,
   } = options;
   if (!url) {
     throw new Error('url is not defined');
   }
   if (qs && !(isObject(qs) || typeof qs === 'string')) {
     throw new Error('qs is not a string or object ({ key: value })');
   }
   if (body && !isObject(body)) {
     throw new Error('body is not an object');
   }
   if (headers && !isObject(headers)) {
     throw new Error('headers is not an object');
   }
   if (redirect && !isBoolean(redirect)) {
     throw new Error('redirect is not a boolean');
   }
   if (timeout && !isNumber(timeout)) {
     throw new Error('timeout is not a number');
   }
   if (maxAttempts && !isNumber(maxAttempts)) {
     throw new Error('maxAttempts is not a number');
   }
   if (retryDelay && !isNumber(retryDelay)) {
     throw new Error('retryDelay is not a number');
   }
   if (retryStrategy && !isFunction(retryStrategy)) {
     throw new Error('retryDelay is not a function');
   }
   return {
     fullResponse: true,
     promiseFactory: resolver => new Promise(resolver),
     url,
     method: method || 'GET',
     ...qs ? { qs } : {},
     ...body ? { body: JSON.stringify(body) } : {},
     ...headers ? { headers } : {},
     redirect: (typeof redirect === 'undefined') ? true : redirect,
     timeout: timeout || 5000,
     maxAttempts: maxAttempts || 3,
     retryDelay: retryDelay || 500,
     retryStrategy: retryStrategy || defaultRetryStrategy,
   };
 };
 
 // direct execution (with requestRetry!!)
 const request = ({
   url,
   method,
   qs,
   body,
   headers,
   redirect,
   timeout,
   maxAttempts,
   retryDelay,
   retryStrategy,
 }) => {
   const options = makeOptions({
     url,
     method,
     qs,
     body,
     headers,
     redirect,
     timeout,
     maxAttempts,
     retryDelay,
     retryStrategy,
   });
 
   return requestRetry(options)
     .then(res => {
       if (res && (res.statusCode < 200 || res.statusCode > 299)) {
         throw res;
       }
       return res.body;
     });
 };
 
 // Factory version
 export const createRequest = (first = { headers: {} }) => (second = { headers: {} }) => request({
   ...first,
   ...second,
   headers: {
     ...first.headers,
     ...second.headers,
   },
 });
 
 export default request;
 