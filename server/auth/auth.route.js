const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const validation = require('./auth-validation');
const authCtrl = require('./auth.controller');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(validate(validation.login), authCtrl.login);

router.route('/register')
  .post(validate(validation.register), authCtrl.register);

router.route('/verify')
  .put(validate(validation.verify), authCtrl.verify);

router.route('/otp')
  .post(validate(validation.otp), authCtrl.otp);

router.route('/password')
  .post(validate(validation.password), authCtrl.password);

module.exports = router;
