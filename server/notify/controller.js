const Notify = require('./model');
// eslint-disable-next-line no-unused-vars
const config = require('../../config/config');
const Push = require('../helpers/Push');
const lodash = require('lodash');
/**
 * Load Notify and append to req.
 */
function load(req, res, next, id) {
  Notify.get(id)
    .then((data) => {
      req.notify = data; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function get(req, res) {
  return res.json(req.notify);
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function create(req, res, next) {
  const model = new Notify({
    title: req.body.title,
    message: req.body.message
  });
  const push=new Push();
  push.Send(model.title,model.message,function(r){
    console.log(r)
    model.push=r;
    model
    .save()
    .then(() => res.json())
    .catch(e => next(e));
  });

}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function update(req, res, next) {
  const notify = req.notify;
  // notify.field = req.body.field;
  // TODO update
  if(req.body.title)
    notify.title = req.body.title;
  if(req.body.message)
    notify.message = req.body.message;


  notify
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
  Notify.list({ limit, skip })
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
  Notify.list({ limit, skip, where: { user } })
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
  const notify = req.notify;
  notify
    .remove()
    .then(deleted => res.json(deleted))
    .catch(e => next(e));
}

module.exports = { create, update, listShow, list, remove, get, load };
