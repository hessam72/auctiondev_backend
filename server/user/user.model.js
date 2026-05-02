const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^09[0-9]{9}$/,
      'The value of path {PATH} ({VALUE}) is not a valid mobile number.',
    ],
  },
  plans: [
    {
      planId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'Plan',
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'Product',
        nullable: true,
        default: null,
      },
      expiredAt: {
        type: Date,
        default: null,
      },
    },
  ],
  otp: {
    code: {
      type: String,
    },
    expiredAt: {
      type: Date,
      default: null,
    },
  },
  role: {
    type: String,
    enum: ['super_admin', 'admin', 'support', 'user'],
    default: 'user'
  },
  password: {
    type: String,
  },
  oldPassword: {
    type: String,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .populate({
        path: "plans.planId",
        model: 'Plan',
        where:{"plans.expiredAt":{$gle: new Date()}}
      })
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  whereFirst(operations) {
    return this.findOne(operations).exec();
  },
  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50, role = 'user' } = {}) {
    return this.find({ role })
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);
