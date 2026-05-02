/* eslint-disable no-undef */
const Joi = require('joi');
const authorize = require('./authorize');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config({
  path: '.env',
});

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number().default(4040),
  // pay
  PAY_TEMPLATE: Joi.string(),
  NEXTPAY_CALLBACK_URI: Joi.string(),
  NEXTPAY_API_KEY: Joi.string(),
  NEXTPAY_URI: Joi.string(),
  NEXTPAY_VERIFY_URI: Joi.string(),
  //notify
  NOTIFY_APPKEY: Joi.string().required(),
  NOTIFY_UTL: Joi.string().required(),
  NOTIFY_APIKEY: Joi.string().required(),
  // SMS
  SMS_KEY: Joi.string().required(),
  CLINT_CALLBACK_URI: Joi.string().required(),
  SMS_TEMPLATE: Joi.string().default('verify'),
  // MONGO DB
  MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false),
  }),
  // JWT
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string().required().description('Mongo DB host url'),
  MONGO_PORT: Joi.number().default(27017),
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  auth: role => ({
    secret: envVars.JWT_SECRET,
    requestProperty: 'auth',
    role,
  }),
  notify:{
    appId: envVars.NOTIFY_APPKEY,
    url: envVars.NOTIFY_UTL,
    apiKey: envVars.NOTIFY_APIKEY
  },
  authorize: authorize(envVars.JWT_SECRET),
  smsKey: envVars.SMS_KEY,
  smsTemplate: envVars.SMS_TEMPLATE,
  clint_callback: envVars.CLINT_CALLBACK_URI,
  pay: {
    template: envVars.PAY_TEMPLATE,
    next: {
      key: envVars.NEXTPAY_API_KEY,
      url: envVars.NEXTPAY_URI,
      verify: envVars.NEXTPAY_VERIFY_URI,
      back_url: envVars.NEXTPAY_CALLBACK_URI,
    },
  },
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT,
  },
};

module.exports = config;
