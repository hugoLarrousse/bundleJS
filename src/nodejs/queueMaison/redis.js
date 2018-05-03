/* ------------------------------------------
   Redis connection
--------------------------------------------- */
import redis from 'redis';
import config from 'config';

import * as logger from '../utils/logger';

const client = redis.createClient(config.get('Redis.endpoint'), {
  connect_timeout: 5000,
});

// client.on('ready', () => {
//   // DO things if needed
// });

client.on('error', err => {
  logger.error(__filename, 'RedisClient on connection error', err.message, err);
});
client.on('connect', () => {
  logger.info(__filename, 'RedisClient on connection success', 'Redis is now connected');
});

const createClient = () => redis.createClient(config.get('Redis.endpoint'), {
  connect_timeout: 5000,
});

const getEndpoint = () => config.get('Redis.endpoint');

export {
  LISTS,
  HASHES,
  createClient,
  getEndpoint,
};
export default client;
