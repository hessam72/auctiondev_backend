const Joi = require('joi');

module.exports = {
  // POST /api/photo
  create: {
    form: {
      file: Joi.any().required(),
      name: Joi.string(),
      size: Joi.string(),
    }
  },

  // UPDATE /api/photo/:id
  update: {
    form: {
      file: Joi.any().required(),
      name: Joi.string(),
      size: Joi.string(),
    },
    params: {
      id: Joi.string().hex().required()
    }
  },

};