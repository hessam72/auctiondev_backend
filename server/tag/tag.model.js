/* eslint-disable no-unused-vars */
const Promise = require('bluebird');
const APIError = require('../helpers/APIError');
const httpStatus = require('http-status');
// eslint-disable-next-line import/newline-after-import
const mongoose = require('mongoose');
const { Schema } = mongoose;
/**
 * Tag Schema
 */

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: { unique: true }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
// CategorySchema.pre('save', function (next) {
//   next();
// });
/**
 * Methods
 */
CategorySchema.method({});

/**
 * Statics
 */
CategorySchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<Tag, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((res) => {
        if (res) {
          return res;
        }
        const err = new APIError('No such tag exists!', httpStatus.NOT_FOUND);
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
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Tag
 */
module.exports = mongoose.model('Tag', CategorySchema);
