// eslint-disable-next-line import/newline-after-import
const lodash = require('lodash');
const Photo = require('./photo');
// eslint-disable-next-line import/newline-after-import
const Rest = require('../helpers/Rest');
const { get, has } = lodash;

/**
 * Load Photo and append to req.
 */
function load(req, res, next, id) {
  Photo.get(id)
    .then((data) => {
      req.photo = data; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function show(req, res) {
  return res.json(req.photo);
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
// eslint-disable-next-line consistent-return
function create(req, res, next) {
  if (req.file) {
    const model = new Photo({
      fieldname: get(req, 'file.fieldname'),
      originalname: get(req, 'file.originalname'),
      encoding: get(req, 'file.encoding'),
      mimetype: get(req, 'file.mimetype'),
      destination: get(req, 'file.destination').replace('public/', ''),
      filename: get(req, 'file.filename'),
      path: get(req, 'file.path').replace('public/', ''),
      size: get(req, 'file.size'),
    });
    model
      .save()
      .then(saved => res.json(saved))
      .catch(e => next(e));
  } else {
    return Rest.badRequest();
  }
}

// return res.json(req.formData);

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function update(req, res, next) {
  const photo = req.photo;
  if (has(req.body, 'title')) {
    photo.title = req.body.title;
  }
  if (has(req.body, 'icon')) {
    photo.icon = req.body.icon;
  }
  if (has(req.body, 'parentId')) {
    photo.parentId = Photo.find(req.body.parentId);
  }
  photo
    .save()
    .then(saved => res.json(saved))
    .catch(e => next(e));
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function list(req, res, next) {
  const { limit = 500, skip = 0 } = req.query;
  Photo.list({ limit, skip })
    .then(data => res.json(data))
    .catch(e => next(e));
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function remove(req, res, next) {
  const photo = req.photo;
  photo
    .remove()
    .then(deleted => res.json(deleted))
    .catch(e => next(e));
}

module.exports = { create, update, list, remove, get: show, load };
