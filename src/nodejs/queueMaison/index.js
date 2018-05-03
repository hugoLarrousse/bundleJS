// This is just an example

import redisClient, { LISTS } from './redis';
import { prepend, length, addInsertedInQueueTimestamp } from './helpers';
import { functionQueue } from './functionQueue';

//start redis client
const onSystemStartUp = () => {
  redisClient.on('ready', () => {
    length(LISTS.deliveredMessages)
      .then(res => {
        if (res > 0) {
          runDeliveredSuccessQueue();
        }
      });
    length(LISTS.failedMessages)
      .then(res => {
        if (res > 0) {
          runDeliveredFailureQueue();
        }
      });
  });
};

const functionName = ToStore => {
  //if ToStore is an Array
  const strings = messages
    .map(addInsertedInQueueTimestamp) //important to add a timer for redis
    .map(JSON.stringify); // important to stringify!!
  prepend('nameOfYourList', strings)
    .then(res => {
      if (res > 0) { //if insertion ok we call the queue function
        functionQueue();
      }
    })
    .catch(err => {
      logger.error(__filename, addToDeliveredSuccessMessages.name, err.message, err);
    });
};