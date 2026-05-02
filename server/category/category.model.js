const Promise = require('bluebird');
const APIError = require('../helpers/APIError');
const httpStatus = require('http-status');
// eslint-disable-next-line import/newline-after-import
const mongoose = require('mongoose');
const { Schema } = mongoose;
/**
 * Category Schema
 */

const CategorySchema = new mongoose.Schema({
  sort: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    required: true,
    index: { unique: true }
  },
  icon: {
    type: String,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
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
   * @returns {Promise<Category, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((res) => {
        if (res) {
          return res;
        }
        const err = new APIError('No such category exists!', httpStatus.NOT_FOUND);
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
  }
};

/**
 * @typedef Category
 */
module.exports = mongoose.model('Category', CategorySchema);
