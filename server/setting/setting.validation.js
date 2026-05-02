const Joi = require('joi');

module.exports = {
  // POST /api/setting
  create: {
    body: {
      type: Joi.string().required(),
      content: Joi.any().required(),
    }
  },

  // UPDATE /api/setting/:type
  update: {
    body: {
      content: Joi.any().required(),
    },
    params: {
      id: Joi.string()
        .hex()
        .required()
    }
  },

};
