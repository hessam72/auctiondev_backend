const APIError = require('./APIError');
const httpStatus = require('http-status');

const Rest = {
  noContent: (tag) => {
    const err = new APIError(tag, httpStatus.NO_CONTENT);
    return Promise.reject(err);
  },
  badRequest: (tag) => {
    const err = new APIError(tag, httpStatus.BAD_REQUEST);
    return Promise.reject(err);
  },
  unAuthorized: (tag) => {
    const err = new APIError(tag, httpStatus.UNAUTHORIZED);
    return Promise.reject(err);
  },
  forbidden: (tag) => {
    const err = new APIError(tag, httpStatus.FORBIDDEN);
    return Promise.reject(err);
  },
  conflict: (tag) => {
    const err = new APIError(tag, httpStatus.CONFLICT);
    return Promise.reject(err);
  },
  notFound: (tag) => {
    const err = new APIError(tag, httpStatus.NOT_FOUND);
    return Promise.reject(err);
  },
  methodNotAllowed: (tag) => {
    const err = new APIError(tag, httpStatus.METHOD_NOT_ALLOWED);
    return Promise.reject(err);
  },
  internalServerError: (tag) => {
    const err = new APIError(tag, httpStatus.INTERNAL_SERVER_ERROR);
    return Promise.reject(err);
  },
  status: httpStatus,
};


module.exports = Rest;
