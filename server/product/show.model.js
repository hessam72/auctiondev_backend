/* eslint-disable func-names */
const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const { populate } = require('./product.model');
/**
 * Show Schema
 */
const ShowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  updatedAt: {
    type: Date,
    default: null,
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
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
ShowSchema.pre(['find', 'findOne'], function () {
  this.where({ deletedAt: null });
});
/**
 * Methods
 */
ShowSchema.method({});

/**
 * Statics
 */
ShowSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(user, product) {
    return this.findOne({ user, product })
      .exec()
      .then((res) => {
        if (res) {
          return res;
        }
        return null;
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50, user, where= {} } = {}) {
    return this.find({ user, ...where })
      .populate({ path: 'product', populate: 'category' })
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
    /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  search(where = {}) {
    return this.find(where).exec();
  },
};

/**
 * @typedef Show
 */
module.exports = mongoose.model('Show', ShowSchema);
