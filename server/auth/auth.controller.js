const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const { sendOtp, mapUser, saveUser } = require('./repository');
const Status = require('./status');
const Rest = require('../helpers/Rest');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const User = require('../user/user.model');
const Hash = require('../helpers/Hash');

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // eslint-disable-next-line no-shadow
  const { username, password } = req.body;
  return User.whereFirst({ $and: [{ status: Status.CONFIRM }, { username }] })
    .then((user) => {
      if (!user) {
        return Rest.notFound('User not found');
      }
      if (!Hash.verify(password, user.password)) {
        return Rest.badRequest('Password is not valid');
      }
      return res.json(mapUser(user));
    })
    .catch(e => next(e));
}

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function register(req, res, next) {
  // eslint-disable-next-line no-shadow
  const { username, mobile, password } = req.body;
  return User.whereFirst({ $or: [{ mobile }, { username }] })
    .then((user) => {
      if (user) {
        if (user.status === Status.PENDING) {
          // if user exist
          if (user.otp.expiredAt >= moment.now()) {
            // if new user and expiredAt
            return Rest.badRequest('code not expired');
          }
          // send code
          sendOtp(user);
          return res.json({
            message: 'OTP sent successfully',
            user: {
              id: user._id,
              username: user.username,
              mobile: user.mobile,
              status: user.status
            },
            otp: {
              code: user.otp.code,
              expiresIn: '3 minutes'
            }
          });
        }
        return Rest.forbidden('user has exist');
      }
      // save user
      return saveUser(username, mobile, password)
        .then((newUser) => {
          return res.json({
            message: 'User registered successfully. Please verify with OTP.',
            user: {
              id: newUser._id,
              username: newUser.username,
              mobile: newUser.mobile,
              status: newUser.status
            },
            otp: {
              code: newUser.otp.code,
              expiresIn: '5 minutes'
            }
          });
        });
    })
    .catch(e => next(e));
}

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function verify(req, res, next) {
  const { code, mobile } = req.body;
  return User.whereFirst({
    $and: [
      { mobile },
      {
        $or: [{ status: Status.PENDING }, { status: Status.CONFIRM }],
      },
    ],
  })
    .then((user) => {
      if (user) {
        if (user.otp.code === code) {
          // eslint-disable-next-line no-param-reassign
          user.status = Status.CONFIRM;
          user.save();
          return res.json(mapUser(user));
        }
        return Rest.badRequest('code notfound');
      }
      return Rest.notFound('user not found');
    })
    .catch(e => next(e));
}

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function otp(req, res, next) {
  const { mobile } = req.body;
  return User.whereFirst({
    $and: [
      { mobile },
      {
        $or: [{ status: Status.PENDING }, { status: Status.CONFIRM }],
      },
    ],
  })
    .then((user) => {
      if (user) {
        if (user.otp.expiredAt >= moment.now()) {
          // if new user and expiredAt
          return Rest.badRequest('code not expired');
        }
        // send code
        sendOtp(user);
        return res.json({
          message: 'OTP sent successfully',
          mobile: user.mobile,
          otp: user.otp.code,
          expiresIn: '3 minutes'
        });
      }
      return Rest.notFound();
    })
    .catch(e => next(e));
}

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function password(req, res, next) {
  // sample user, used for authentication
  const user = {
    username: 'react',
    password: 'password',
  };
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  if (
    req.body.username === user.username &&
    req.body.password === user.password
  ) {
    const token = jwt.sign(
      {
        username: user.username,
      },
      config.jwtSecret
    );
    return res.json({
      token,
      username: user.username,
    });
  }

  const err = new APIError(
    'Authentication error',
    httpStatus.UNAUTHORIZED,
    true
  );
  return next(err);
}

module.exports = { login, register, verify, otp, password };
