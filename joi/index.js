// Usefull when you want to insert shema and check for the field
// could be improve for update!!


const Joi = require('joi');

const schema = Joi.object().keys({
  orga_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  expirationDate: Joi.date().timestamp('unix').required(),
  type: Joi.string().required(),
  userAllowed: Joi.number().greater(0).less(100).integer().required(),
  isPaid: Joi.boolean().required(),
  nextPayment: Joi.date().timestamp('unix').required(),
});

const {error, value } = Joi.validate({ toto: "jijazdazj", orga_id: '5ac7855dc0e5e25188e3d68d', expirationDate: '12334567', type: '33', userAllowed: 99, isPaid: true, nextPayment: '1234567890' }, schema);



// Be careful! date timestamp is not really good for timestamp....

// by default other field will throw an error

// regex cool but don't check is the type is ObjectID!!

