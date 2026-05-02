const Promise = require("bluebird");
const APIError = require("../helpers/APIError");
const httpStatus = require("http-status");
// eslint-disable-next-line import/newline-after-import
const mongoose = require("mongoose");
const { Schema } = mongoose;
/**
 * Photo Schema
    filename: get(req,'req.file.filename'),
 *  fieldname: get(req,'file.fieldname'),
    path: get(req,'req.file.path'),
    originalname: get(req,'req.file.originalname'),
    encoding: get(req,'req.file.encoding'),
    mimetype: get(req,'req.file.mimetype'),
    destination: get(req,'req.file.destination'),
    size: get(req,'req.file.size'),
 */

const PhotoSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  fieldname: {
    type: String,
  },
  path: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
  },
  encoding: {
    type: String,
  },
  mimetype: {
    type: String,
  },
  destination: {
    type: String,
  },
  size: {
    type: String,
  },
  deletedAt: {
    type: Date,
    default: null,
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
// PhotoSchema.pre('save', function (next) {
//   next();
// });
/**
 * Methods
 */
PhotoSchema.method({});

/**
 * Statics
 */
PhotoSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<Photo, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((res) => {
        if (res) {
          return res;
        }
        const err = new APIError("No such photo exists!", httpStatus.NOT_FOUND);
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
 * @typedef Photo
 */
module.exports = mongoose.model("Photo", PhotoSchema);
