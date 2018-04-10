import { getConnection } from './mongo';
import { throwError } from '../../src/utils/error';

let db;

beforeAll(async () => {
  try {
    db = await getConnection();
  } catch (err) {
    throwError(__filename, beforeAll.name, err.message, err);
  }
});

beforeEach(async () => {
  try {
    const collections = await db.collections();

    for (const collection of collections) {
      await collection.remove();
    }
  } catch (err) {
    throwError(__filename, beforeEach.name, err.message, err);
  }
});

afterAll(() => {
  if (db) {
    db.close();
  }
});
