const { MongoClient } = require('mongodb');
const error = require('../utils/error');
const { addUpdatedAtToModel, addCreatedAtToModel, softDeleteRetrieveCondition } = require('./utils/mongoHelper');
const logger = require('../utils/logger');

// real connection MONGO (check if you need to send database or no)
const getConnection = (databaseName) => {
  return MongoClient
    .connect(`mongodb://localhost/${databaseName}`, { poolSize: 10 })
    .catch(err => error.rejectError(__filename, 'MongoClient.connect()', err.message, err));
};

const insert = async (databaseName, collectionName, doc) => {
  const docToSave = addCreatedAtToModel(doc);
  const db = await getConnection(databaseName);
  const response = await db.collection(collectionName).insertOne(docToSave);
  let insertedDoc;
  if (response.ops.length > 0) {
    [insertedDoc] = response.ops;
    logger.info(__filename, insert.name, databaseName, collectionName, `${insertedDoc._id} inserted`, insertedDoc._id);
  } else {
    logger.error(__filename, insert.name, databaseName, collectionName, 'Unable to insert', null, doc);
  }
  return insertedDoc;
};

const update = async (databaseName, collectionName, query = {}, doc) => {
  const docToUpdate = { $set: addUpdatedAtToModel(doc) };
  const db = await getConnection(databaseName);
  const docUpdated = await db.collection(collectionName)
    .findOneAndUpdate(
      query,
      docToUpdate,
      { returnOriginal: false }
    );
  if (docUpdated.ok === 1 && docUpdated.value) {
    console.log('docUpdated :', docUpdated);
    logger.info(__filename, update.name, databaseName, collectionName, `${docUpdated.value._id} updated`, docUpdated.value._id);
  } else {
    logger.error(__filename, update.name, databaseName, collectionName, 'Unable to update', null, doc);
  }
  return docUpdated.value;
};

const softDelete = async (databaseName, collectionName, query = {}) =>
  update(databaseName, collectionName, query, { deletedAt: Date.now() });

const deleteDoc = async (databaseName, collectionName, query) => {
  const db = await getConnection(databaseName);
  const deleted = await db.collection(collectionName).remove(query);
  if (deleted.result.ok === 1 && deleted.result.n === 1) {
    logger.info(__filename, deleteDoc.name, databaseName, collectionName, `${query._id} was removed`, query._id);
    return true;
  }
  logger.error(__filename, deleteDoc.name, databaseName, collectionName, 'Unable to delete', null, query);
  return false;
};

const findOne = async (databaseName, collectionName, query = {}) => {
  const db = await getConnection(databaseName);
  const docFound = await
    db.collection(collectionName).findOne({ ...query });

  return docFound;
};

const find = async (databaseName, collectionName, query = {}, sort = {}, limit = 0) => {
  const db = await getConnection(databaseName);
  const docs = await
    db.collection(collectionName)
      .find({
        ...query,
        ...softDeleteRetrieveCondition,
      })
      .sort(sort)
      .limit(limit)
      .toArray();
  return docs;
};

const count = async (databaseName, collectionName, query) => {
  const db = await getConnection(databaseName);
  return db.collection(collectionName)
    .count({
      ...query,
    });
};

exports.getConnection = getConnection;
exports.insert = insert;
exports.update = update;
exports.softDelete = softDelete;
exports.deleteDoc = deleteDoc;
exports.findOne = findOne;
exports.find = find;
exports.count = count;
