/* ------------------------------------------
 Auth module
 --------------------------------------------- */
import jwt from 'jsonwebtoken';
import isObject from 'lodash/isObject';

import * as logger from '../../utils/logger';
import {
  findOneById, authenticateByEmailAndPassword,
} from '../../models/user';

const JWT_SECRET = process.env.JWT_SECRET;

const makeToken = (user) => {
  if (!isObject(user)) {
    throw new Error('User is not an object');
  }
  const { email, id, roles } = user;
  if (!email || !id) {
    throw new Error('User do not provide id or email');
  }
  return jwt.sign(
    {
      id,
      email,
      roles,
    },
    JWT_SECRET
  );
};

const extractTokenData = token => new Promise((resolve, reject) => {
  jwt.verify(token, JWT_SECRET, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

const authenticateUser = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email or password not provided');
  }
  const user = await authenticateByEmailAndPassword(email, password);
  return {
    ...user,
    token: makeToken(user),
  };
};

const validateToken = async token => {
  const userData = await extractTokenData(token);
  if (!userData || !userData.id) {
    const err = new Error('SECURITY BREACH : Bad (but jwt compliant) token provided');
    logger.error(__filename, validateToken.name, err.message, err);
    throw err;
  }
  const user = await findOneById(userData.id);
  if (!user) {
    const err = new Error('SECURITY BREACH : User do not exists based on token');
    logger.error(__filename, validateToken.name, err.message, err);
    throw err;
  }
  return user;
};

const pickTokenInHeaders = headers => {
  return headers.authorization || null;
};

export {
  makeToken,
  extractTokenData,
  authenticateUser,
  validateToken,
  pickTokenInHeaders,
};
