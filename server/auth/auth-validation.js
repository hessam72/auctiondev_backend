const Joi = require('joi');

module.exports = {
  // POST /api/auth/register
  register: {
    body: {
      mobile: Joi.string().regex(/^09[0-9]{9}$/).required(),
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  // POST /api/auth/verify
  verify: {
    body: {
      mobile: Joi.string().regex(/^09[0-9]{9}$/).required(),
      code: Joi.string().min(4).max(4).required()
    }
  },
  // POST /api/auth/otp
  otp: {
    body: {
      mobile: Joi.string().regex(/^09[0-9]{9}$/).required(),
    }
  },
  // POST /api/auth/verify
  password: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },
};
