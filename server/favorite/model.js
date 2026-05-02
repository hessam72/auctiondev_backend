const Promise = require('bluebird');
const APIError = require('../helpers/APIError');
const httpStatus = require('http-status');
// eslint-disable-next-line import/newline-after-import
const mongoose = require('mongoose');
const { Schema } = mongoose;
/**
 * Location Schema
 */

const LocationSchema = new mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedAt: {
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
// LocationSchema.pre('save', function (next) {
//   next();
// });
/**
 * Methods
 */
LocationSchema.method({});

/**
 * Statics
 */
LocationSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<Location, APIError>}
   */
  get(userId, productId) {
    return this.findOne({ userId, productId })
      .exec()
      .then((res) => {
        if (res) {
          return res;
        }
        const err = new APIError(
          'No such location exists!',
          httpStatus.NOT_FOUND
        );
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .populate({ path: 'productId' })
      .sort({ sort: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
  search(where = {}) {
    return this.find(where).exec();
  },
};

/**
 * @typedef Location
 */
module.exports = mongoose.model('Favorit', LocationSchema);
