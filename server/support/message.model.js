const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Message Schema
 */
const MessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  answer: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  visited: {
    visitedAt: {
      type: Date,
      default: null,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
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

/**
 * Methods
 */
MessageSchema.method({});

/**
 * Statics
 */
MessageSchema.statics = {
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
  list({ skip = 0, limit = 50, where = {} } = {}) {
    return (
      this.find(where)
        // .populate('user', 'visited.admin')
        .populate({ path: 'user', select: 'username mobile name _id' })
        .populate({ path: 'visited.admin', select: 'username mobile name _id' })
        .sort({ createdAt: -1 })
        .skip(+skip)
        .limit(+limit)
        .exec()
    );
  },
};

/**
 * @typedef Message
 */
module.exports = mongoose.model('Message', MessageSchema);
