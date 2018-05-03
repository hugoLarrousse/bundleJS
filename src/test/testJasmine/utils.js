import { ObjectId } from 'mongodb';

const generateObjectId = (character) => {
  const size = 12;
  return ObjectId(String(new Array(size + 1).join(character)));
};

export default generateObjectId;

// -------------------------------------- //

export default t => {
  return new Promise((resolve) => {
    setTimeout(resolve, t);
  });
};
