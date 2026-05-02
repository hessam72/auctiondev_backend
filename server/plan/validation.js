const Joi = require('joi');

module.exports = {
  // POST /api/category
  create: {
    body: {
      title: Joi.string().required(),
      event: Joi.string().required(),
      price: Joi.number().required(),
    }
  },

  // UPDATE /api/category/:id
  update: {
    body: {
      title: Joi.string().required(),
      event: Joi.string().required(),
      price: Joi.number(),
    },
    params: {
      id: Joi.string().hex().required()
    }
  },

};
