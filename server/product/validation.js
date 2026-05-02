const Joi = require('joi');

module.exports = {
  // POST /api/transaction
  create: {
    body: {
      description: Joi.string(),
      title: Joi.string().required(),
    },
  },
  // POST /api/filter
  filter: {
    query: {
      categories: Joi.array().items(Joi.string().hex()),
      tags: Joi.array().items(Joi.string()),
      search: Joi.string(),
      location: Joi.string().hex(),
    },
  },
  // PUT /api/transaction
  update: {
    body: {
      description: Joi.string(),
      title: Joi.string().required(),
    },
  },
};
