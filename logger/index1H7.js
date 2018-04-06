const { MongoClient } = require('mongodb');

const server = 'localhost';
const { databaseH7 } = process.env;
const collectionLog = 'logs';


// how to use it:
  // require logger
  // logger.info(_filename, methodName, database, collection, message, _id, ...rest)
  // logger.error(_filename, methodName, database, collection, message, _id, rest)

// action :
  // store in DB

// check index2Imhotep to display log on console + link with slack


function register(userId, req, route, statusCode, message) {
  const data = {
    user_id: userId,
    ip_address: req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress ||
      null,
    'header-http': req.headers,
    route,
    status_code: statusCode,
    message,
    date: new Date(),
  };

  MongoClient.connect(`mongodb://${server}/${databaseH7}`, (errorMongo, db) => {
    if (errorMongo) throw errorMongo;
    db.collection(collectionLog).insert(data, null, (errorInsert) => {
      if (errorInsert) throw errorInsert;
    });
    db.close();
  });
}

function error(filename, methodName, database, collection, message, _id, rest) {
  const data = {
    isError: true,
    filename,
    methodName,
    database,
    collection,
    message,
    docId: _id,
    rest,
    createdAt: new Date().getTime(),
  };

  MongoClient.connect(`mongodb://${server}/${databaseH7}`, (errorMongo, db) => {
    if (errorMongo) throw errorMongo;
    db.collection(collectionLog).insert(data, null, (errorInsert) => {
      if (errorInsert) throw errorInsert;
    });
    db.close();
  });
}


function info(filename, methodName, database, collection, message, _id, ...rest) {
  const data = {
    isError: false,
    filename,
    methodName,
    database,
    collection,
    message,
    docId: _id,
    rest,
    createdAt: new Date().getTime(),
  };

  MongoClient.connect(`mongodb://${server}/${databaseH7}`, (errorMongo, db) => {
    if (errorMongo) throw errorMongo;
    db.collection(collectionLog).insert(data, null, (errorInsert) => {
      if (errorInsert) throw errorInsert;
    });
    db.close();
  });
}

function create(e) {
  console.log(`${new Date()} - ${e}`);
}


exports.register = register;
exports.error = error;
exports.create = create;
exports.info = info;