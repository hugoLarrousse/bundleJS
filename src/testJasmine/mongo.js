import { MongoClient } from 'mongodb';

let db;
const url = 'mongodb://localhost:27017/db-test';

const getConnection = async () => {
  if (!db) {
    db = await MongoClient.connect(url);
  }

  return db;
};

export {
  getConnection,
};
