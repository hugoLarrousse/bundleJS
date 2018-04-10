
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

export const renameIdToUnderscoreId = (model) => {
  if (model._id) {
    return model;
  }

  if (!model.id) {
    const err = new Error('Model has no id');
    throwError(__filename, renameIdToUnderscoreId.name, err.message, err);
  }

  const { id, ...rest } = model;
  return {
    _id: mongo.ObjectId(id),
    ...rest,
  };
};

export const sanitize = (doc) => {
  const { _id, deletedAt, ...rest } = doc;
  return {
    id: _id,
    ...rest,
  };
};

exports.timeNow = timeNow;
exports.addUpdatedAtToModel = addUpdatedAtToModel;
exports.addCreatedAtToModel = addCreatedAtToModel;
exports.softDeleteRetrieveCondition = softDeleteRetrieveCondition;