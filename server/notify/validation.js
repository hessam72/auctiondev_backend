const Joi = require('joi');

module.exports = {
  // POST /api/message
  create: {
    body: {
      message: Joi.string()
        .required(),
      title: Joi.string()
        .required(),
    }
  },
  // PUT /api/message/:id
  update: {
    body: {
      message: Joi.string()
      .required(),
    title: Joi.string()
      .required(),
    }
  },

};
