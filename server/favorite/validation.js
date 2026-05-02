const Joi = require('joi');

module.exports = {
  create: {
    body: {
      productId: Joi.string().hex().required(),
    }
  },
};
