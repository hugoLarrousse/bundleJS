/* ------------------------------------------
   Pick in object : Get only the field you want in an object
--------------------------------------------- */
const peek = (...keep) => iter => keep.indexOf(iter) > -1;
const split = c => c.split('.');
const tail = array => {
  const [head, ...result] = array; // eslint-disable-line
  return result;
};

// HOW TO USE IT //

const obj = {
  name: 'Hugo',
  description : 'this is a description',
  password: 'pwd',
};

const pickInPayload = pickInObject(
  'name',
  'description',
);

const result = pickInPayload(obj);

console.log('result :', result); // result : { name: 'Hugo', description: 'this is a description' }



/* eslint-disable no-confusing-arrow */
const pickInObject = (...fields) => object => {
  if (!object) { return object; }

  const levels = fields.map(split);
  const currentLevel = levels
    .filter(c => c.length === 1)
    .map(c => c[0]);

  const rec = levels
    .filter(c => c.length > 1)
    .filter(c => Object.prototype.hasOwnProperty.call(object, c[0]))
    .reduce((acc, c, i, xs) => {
      const next = {
        ...acc,
        [c[0]]: [
          ...acc[c[0]] || {},
          tail(c).join('.'),
        ],
      };
      return (i === xs.length - 1)
        ? Object.keys(next)
          .map(d => [d, next[d]])
        : next;
    }, [])
    .reduce((acc, c) => ({
      ...acc,
      [c[0]]: {
        ...acc[c[0]],
        ...pickInObject(...c[1])(object[c[0]]),
      },
    }), {});

  const res = Object.keys(object)
    .filter(peek(...currentLevel))
    .reduce((acc, k) => ({
      ...acc,
      [k]: object[k],
    }), {});

  return Object.assign({}, res, rec);
};

module.exports = pickInObject;


