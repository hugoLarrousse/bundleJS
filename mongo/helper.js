
const timeNow = () => Date.now();

const addUpdatedAtToModel = model => ({
  ...model,
  updatedAt: timeNow(),
});

const addCreatedAtToModel = model => ({
  ...model,
  createdAt: timeNow(),
});

const softDeleteRetrieveCondition = { // we should implement it soon
  deletedAt: null,
};

exports.timeNow = timeNow;
exports.addUpdatedAtToModel = addUpdatedAtToModel;
exports.addCreatedAtToModel = addCreatedAtToModel;
exports.softDeleteRetrieveCondition = softDeleteRetrieveCondition;