const Plan = require('./plan.model');
const _ = require('lodash');

/**
 * Load Plan and append to req.
 */
function load(req, res, next, id) {
  Plan.get(id)
    .then((data) => {
      req.plan = data; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function get(req, res) {
  return res.json(req.plan);
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function create(req, res, next) {
  const model = new Plan({
    title: req.body.title,
    duration: _.get(req, 'body.duration', null),
    description: _.get(req, 'body.description', ''),
    price: _.get(req, 'body.price', '0'),
    event: req.body.event,
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
  const plan = req.plan;
  // plan.field = req.body.field;

  // TODO update
  if (req.body.title) plan.title = req.body.title;
  if (req.body.duration) plan.duration = req.body.duration;
  if (req.body.description) plan.description = req.body.description;
  if (req.body.price) plan.price = req.body.price;
  if (req.body.event) plan.event = req.body.event;
  plan
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
  const { limit = 50, skip = 0 } = req.query;
  Plan.list({ limit, skip })
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
  const plan = req.plan;
  plan.deleteAt = Date.now();
  plan
    .save()
    .then(deleted => res.json(deleted))
    .catch(e => next(e));
}

module.exports = { create, update, list, remove, get, load };
