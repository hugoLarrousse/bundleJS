/* ------------------------------------------
   Queue helpers
--------------------------------------------- */
import * as logger from '../../../utils/logger';
import redisClient from '../../../db/redis';

const prepend = (listName, elements) => new Promise((resolve, reject) => {
  redisClient.lpush(listName, elements, (err, res) => {
    if (err) {
      logger.error(__filename, prepend.name, err.message, err);
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const pop = listName => new Promise((resolve, reject) => {
  redisClient.rpop(listName, (err, res) => {
    if (err) {
      logger.error(__filename, pop.name, err.message, err);
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const length = listName => new Promise((resolve, reject) => {
  redisClient.llen(listName, (err, res) => {
    if (err) {
      logger.error(__filename, length.name, err.message, err);
      reject(err);
    } else {
      resolve(res);
    }
  });
});

const addInsertedInQueueTimestamp = (object) => ({
  ...object,
  insertedInRedisQueue: Date.now(),
});

const shouldRetryItem = (maxDuration, object) => {
  if (object.insertedInRedisQueue && !isNaN(object.insertedInRedisQueue)) {
    return Date.now() - object.insertedInRedisQueue <= maxDuration;
  }
  return false;
};


export {
  prepend,
  pop,
  length,
  addInsertedInQueueTimestamp,
  shouldRetryItem,
};