/* ------------------------------------------
   Message delivery success Service
--------------------------------------------- */
import { LISTS } from '../../../db/redis';
import * as logger from '../../../utils/logger';
import { prepend, pop, shouldRetryItem } from '../utils/queueHelpers';

const REDIS_LIST = "nameOfYourList";
const MAX_RETRYING_DURATION = 6000;

let isQueueRunning = false;

const functionQueue = (force = false) => {
  if (!isQueueRunning || force) {
    isQueueRunning = true;
    pop(REDIS_LIST)
      .then(res => {
        if (res) {
          // DO something to validate if you have to stay your element in the list
          const resParsed = JSON.parse(res); //important!!! because you stringify before
          DoSomething(params)
            .then(maybeSomething => {
              if (maybeSomething) {
                lastAction(params) //or not
                  .then(saved => {
                    // last thing done
                  })
                  .then(() => { functionQueue(true); }) //send functionQueue(true); to get out of the loop
                  .catch(() => { functionQueue(true); });
              } else if (shouldRetryItem(MAX_RETRYING_DURATION, message)) { // if the sing is not ok, if we should retry again (less than MAX_RETRYING_DURATION)
                prepend(REDIS_LIST, res)
                  .then(pRes => {
                    if (pRes > 0) {
                      functionQueue(true);
                    } else {
                      isQueueRunning = false;
                    }
                  })
                  .catch(err => {
                    logger.error(__filename, functionQueue.name, err.message, err);
                    functionQueue(true);
                  });
              } else { //go out because rery duration reached
                const err = new Error(`Max retry duration reached for message ${message._id}`);
                logger.error(__filename, functionQueue.name, err.message, err);
                functionQueue(true);
              }
            });
        } else {
          isQueueRunning = false;
        }
      })
      .catch(err => {
        logger.error(__filename, functionQueue.name, err.message, err);
      });
  }
};

export {
  functionQueue,
};
