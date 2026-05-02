const Joi = require('joi');

module.exports = {
  // POST /api/category
  create: {
    body: {
      title: Joi.string().required(),
      icon: Joi.string(),
      parentId: Joi.string().hex(),
    }
  },

  // UPDATE /api/category/:id
  update: {
    body: {
      title: Joi.string(),
      // icon: Joi.string(),
      parentId: Joi.string().hex()
    },
    params: {
      id: Joi.string().hex().required()
    }
  },

};
