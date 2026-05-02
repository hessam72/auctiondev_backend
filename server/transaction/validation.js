const Joi = require('joi');

module.exports = {
  // POST /api/transaction
  create: {
    body: {
      amount: Joi.number().required(),
      description: Joi.string(),
      gateway: Joi.number().required(),
      type: Joi.string().required(),
    },
  },
  // PUT /api/transaction
  update: {
    body: {
      amount: Joi.number().required(),
      description: Joi.string(),
      gateway: Joi.number().required(),
      type: Joi.string().required(),
    },
  },
};
