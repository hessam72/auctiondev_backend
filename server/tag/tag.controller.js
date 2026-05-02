const Tag = require('./tag.model');
// eslint-disable-next-line import/newline-after-import
const lodash = require('lodash');
const { has } = lodash;

/**
 * Load Tag and append to req.
 */
function load(req, res, next, id) {
  Tag.get(id)
    .then((data) => {
      req.tag = data; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function show(req, res) {
  return res.json(req.tag);
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function create(req, res, next) {
  const model = new Tag({
    title: req.body.title,
  });

  model
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
function update(req, res, next) {
  const tag = req.tag;
  if (has(req.body, 'title')) {
    tag.title = req.body.title;
  }
  tag
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
  Tag.list({ limit, skip })
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
  const tag = req.tag;
  tag.remove()
    .then(deleted => res.json(deleted))
    .catch(e => next(e));
}

module.exports = { create, update, list, remove, get: show, load };
