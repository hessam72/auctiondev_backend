const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Transaction Schema
 */
const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    default: null,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: null,
  },
  amount: {
    type: Number,
    default: 0,
  },
  status: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: null,
  },
  authority: {
    type: String,
    default: null,
    description: 'اعتبار یا لاسنس',
  },
  cardNumber: {
    type: String,
    default: null,
  },
  traceNumber: {
    type: String,
    default: null,
  },
  gateway: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    enum: ['wallet', 'plan', 'product', 'apps'],
  },
  deleteAt: {
    type: Date,
    default: null,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  result: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      "message": "منتظر ارسال تراکنش و ادامه پرداخت",
      "code": -1,
      "card_holder": "0000-0000-0000-0000",
      "custom": "{}"
    },
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
TransactionSchema.method({});

/**
 * Statics
 */
TransactionSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((res) => {
        if (res) {
          return res;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
  first(where) {
    return this.findOne(where)
      .populate({
        path: 'user',
      })
      .populate({
        path: 'plan',
      })
      .populate({
        path: 'product',
      })
      .exec()
      .then((res) => {
        if (res) {
          return res;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 500, where = {} } = {}) {
    return this.find(where)
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .populate({
        path: 'user',
        select: 'name mobile status balance role username',
      })
      .populate({ path: 'plan' })
      .populate({ path: 'product' })
      .exec();
  },
};

/**
 * @typedef Transaction
 */
module.exports = mongoose.model('Transaction', TransactionSchema);
