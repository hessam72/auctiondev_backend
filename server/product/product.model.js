const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const { map, get } = require('lodash');

const FileSchema = new mongoose.Schema({
  free: {
    type: Boolean,
    default: false,
  },
  hero: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  path: {
    type: String,
    default: null,
  },
  deletedAt: {
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
});
FileSchema.pre(['find', 'findOne'], function () {
  this.where({ deletedAt: null });
});

/**
 * Product Schema
 */
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: 'text'
  },
  description: {
    type: String,
    default: null,
  },
  period: {
    from: {
      type: Date,
      default: null,
    },
    to: {
      type: Date,
      default: null,
    },
  },
  publishAt: {
    type: Date,
    default: null,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  },
  tags: {
    type: [String],
  },
  files: [FileSchema],
  amount: {
    type: Boolean,
    default: 0,
  },
  deletedAt: {
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
ProductSchema.pre(['find', 'findOne'], function () {
  this.where({ deletedAt: null });
});
/**
 * Methods
 */
ProductSchema.method({});

/**
 * Statics
 */
ProductSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
    .populate({ path: 'category' })
    .populate({ path: 'location', populate: { path: 'parentId' } })
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
    return this.find(where)
      .populate({ path: 'category' })
      .populate({ path: 'location', populate: { path: 'parentId' } })
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};

/**
 * @typedef Product
 */
module.exports = mongoose.model('Product', ProductSchema);
