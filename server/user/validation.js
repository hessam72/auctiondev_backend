/* eslint-disable linebreak-style */
const Joi = require('joi');

module.exports = {
  // Put /api/users/me
  updateMe: {
    body: {
      name: Joi.string(),
      username: Joi.string().required(),
      mobile: Joi.string().required(),
    },
  },
  // Put /api/users/me
  createUser: {
    body: {
      name: Joi.string().required(),
      username: Joi.string().required(),
      mobile: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
      status: Joi.number(),
    },
  },
  // Put /api/users/me
  newpassword: {
    body: {
      password: Joi.string().required(),
      passwordConfirm: Joi.string().required(),
    },
  },
};
