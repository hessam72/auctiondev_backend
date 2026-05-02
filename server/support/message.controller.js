const Message = require('./message.model');
// eslint-disable-next-line no-unused-vars
const config = require('../../config/config');
const lodash = require('lodash');
/**
 * Load Message and append to req.
 */
function load(req, res, next, id) {
  Message.get(id)
    .then((data) => {
      req.message = data; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function get(req, res) {
  return res.json(req.message);
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function create(req, res, next) {
  const model = new Message({
    title: req.body.title,
    message: req.body.message,
    user: req.auth.id,
  });
  model
    .save()
    .then(() => res.json())
    .catch(e => next(e));
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function update(req, res, next) {
  const message = req.message;
  // message.field = req.body.field;
  // TODO update
  message.answer = req.body.answer;
  message.visited = {
    visitedAt: Date(),
    admin: req.auth.id,
  };

  message
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
  const user = lodash.get(req, 'auth');
  let where ={};
  if(user && user.role === "user"){
    where = { user: user._id};
  }
  const { limit = 50, skip = 0 } = req.query;
  Message.list({ limit, skip, where})
    .then(data => res.json(data))
    .catch(e => next(e));
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function listShow(req, res, next) {
  const user = lodash.get(req, 'params.user');
  const { limit = 50, skip = 0 } = req.query;
  Message.list({ limit, skip, where: { user } })
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
  const message = req.message;
  message
    .remove()
    .then(deleted => res.json(deleted))
    .catch(e => next(e));
}

module.exports = { create, update, listShow, list, remove, get, load };
