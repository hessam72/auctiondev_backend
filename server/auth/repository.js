const User = require('../user/user.model');
const moment = require('moment');
const Role = require('./role');
const Status = require('./status');
const sms = require('../helpers/Kavenegar');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const Hash = require('../helpers/Hash');

function saveUser(username, mobile, password) {
  const code = sms.random(4);
  sms.otp(mobile, code);
  const hashedPassword = Hash.create(password);
  const newUser = new User({
    username,
    mobile,
    password: hashedPassword,
    role: Role.ADMIN,
    status: Status.PENDING,
    otp: {
      code,
      expiredAt: moment()
        .add(5, 'm')
    }
  });
  return newUser.save();
}

function sendOtp(user) {
  const code = sms.random(4);
  sms.otp(user.mobile, code);
  // eslint-disable-next-line no-param-reassign
  user.otp = {
    code,
    expiredAt: moment()
      .add(3, 'm')
  };
  user.save();
}

function mapUser(user) {
  const token = jwt.sign({
    id: user._id,
    mobile: user.mobile,
    username: user.username,
    role: user.role,
    expiredAt: moment()
      .add(1, 'd'),
  }, config.jwtSecret);
  const refresh = jwt.sign({
    id: user._id,
    token,
    expiredAt: moment()
      .add(5, 'd'),
  }, config.jwtSecret);

  return {
    mobile: user.mobile,
    username: user.username,
    token,
    refresh
  };
}

module.exports = { saveUser, mapUser, sendOtp };
