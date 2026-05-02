const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');


/**
 * Plan Schema
 */
const PlanSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  duration: { type: String, default: null },
  price: { type: String },
  event: {
    type: String,
    required: true,
    enum: ['once', 'many'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
// eslint-disable-next-line func-names
PlanSchema.pre('find', function () {
  this.where({ deletedAt: null });
});
/**
 * Methods
 */
PlanSchema.method({});

/**
 * Statics
 */
PlanSchema.statics = {
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
  },
};

/**
 * @typedef Plan
 */
module.exports = mongoose.model('Plan', PlanSchema);
