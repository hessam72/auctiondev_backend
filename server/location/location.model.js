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
  title: {
    type: String,
    required: true,
    index: { unique: true },
  },
  sort: {
    type: Number,
    default: 0
  },
  status: {
    type: Boolean,
    default: false,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
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
  get(id) {
    return this.findById(id)
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
      .populate({ path: 'parentId', select: 'title' })
      .sort({ sort: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};

/**
 * @typedef Location
 */
module.exports = mongoose.model('Location', LocationSchema);
