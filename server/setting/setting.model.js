const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Setting Schema
 */
const SettingSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['about', 'rule', 'contact']
  },
  content: {
    type: String
  },
  updatedAt: {
    type: Date,
    default: null
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
// SettingSchema.pre('find', function (next) {
//   // if (this.type === 'rule') {
//     this.content =  "hi";
//   // }
//   next(this);
// });
/**
 * Methods
 */
SettingSchema.method({});

/**
 * Statics
 */
SettingSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(type) {
    return this.findOne({ type })
      .exec()
      .then((res) => {
        // if (res) {
        return res;
        // }
        // const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        // return Promise.reject(err);
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
 * @typedef Setting
 */
module.exports = mongoose.model('Setting', SettingSchema);
