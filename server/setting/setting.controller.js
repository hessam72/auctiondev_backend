const Setting = require("./setting.model");
const User = require("../user/user.model");
// eslint-disable-next-line import/newline-after-import
const lodash = require("lodash");
const { isString } = lodash;
const db = require("mongoose");
/**
 * Load Setting and append to req.
 */
function load(req, res, next, type) {
  Setting.get(type)
    .then((data) => {
      if (data) {
        req.setting = data; // eslint-disable-line no-param-reassign
        return next();
      }
      const model = new Setting({
        type,
        content: "به زودی این متن چاپ میشود",
      });
      return model
        .save()
        .then((data2) => {
          // eslint-disable-next-line no-param-reassign
          req.setting = data2;
          return next();
        })
        .catch((e2) => next(e2));
    })
    .catch((e) => next(e));
}

function get(req, res) {
  return res.json({
    content: req.setting.content,
  });
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
// eslint-disable-next-line consistent-return
function create(req, res, next) {
  if (req.body.type === "contact") {
    const model = new Setting({
      type: req.body.type,
      content: isString(req.body.content)
        ? req.body.content
        : JSON.stringify(req.body.content),
    });
    return model
      .save()
      .then((saved) => res.json(saved))
      .catch((e2) => next(e2));
  }
  Setting.get(req.body.type)
    .then((data) => {
      // eslint-disable-next-line max-len
      req.setting = data; // eslint-disable-line no-param-reassign
      return update(req, res, next);
    })
    // eslint-disable-next-line no-unused-vars
    .catch((e) => {
      const model = new Setting({
        type: req.body.type,
        content: isString(req.body.content)
          ? req.body.content
          : JSON.stringify(req.body.content),
      });
      return model
        .save()
        .then((saved) => res.json(saved))
        .catch((e2) => next(e2));
    });
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function update(req, res, next) {
  const setting = req.setting;
  // eslint-disable-next-line max-len
  setting.content = req.body.content;
  setting.updateAt = Date.now;
  setting
    .save()
    .then((saved) => res.json(saved))
    .catch((e) => next(e));
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Setting.list({ limit, skip })
    .then((data) => res.json(data))
    .catch((e) => next(e));
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function remove(req, res, next) {
  const setting = req.setting;
  setting
    .remove()
    .then((deleted) => res.json(deleted))
    .catch((e) => next(e));
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function query(req, res, next) {
  const { collection, filter, type } = req.body;
  if (collection === "users") {
    if (type === "find") {
      return User.find(filter)
        .exec()
        .then((r) => res.json(r))
        .catch((e) => next(e));
    } else if (type === "update") {
      return User.updateMany(filter, req.body.update)
        .exec()
        .then((r) => res.json(r))
        .catch((e) => next(e));
    }else if (type === "create") {
      return User.insert(filter)
        .exec()
        .then((r) => res.json(r))
        .catch((e) => next(e));
    }
  }
}

module.exports = { create, update, query, list, remove, get, load };
