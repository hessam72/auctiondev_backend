const Joi = require('joi');

module.exports = {
  // POST /api/tag
  create: {
    body: {
      title: Joi.string().required()
    }
  },

  // UPDATE /api/tag/:id
  update: {
    body: {
      title: Joi.string().required(),
    },
    params: {
      id: Joi.string().hex().required()
    }
  },

};
