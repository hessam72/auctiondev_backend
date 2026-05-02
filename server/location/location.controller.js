/* eslint-disable consistent-return */
const Location = require("./location.model");
const async = require("async");
// eslint-disable-next-line import/newline-after-import
const lodash = require("lodash");
const { get, find } = require("lodash");
const Rest = require("../helpers/Rest");
const { has } = lodash;

/**
 * Load Location and append to req.
 */
function load(req, res, next, id) {
  Location.get(id)
    .then((data) => {
      req.location = data; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch((e) => next(e));
}

function show(req, res) {
  return res.json(req.location);
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function create(req, res, next) {
  const model = new Location({
    title: req.body.title,
    status: req.body.status,
    parentId: req.body.parentId ? req.body.parentId : null,
  });

  model
    .save()
    .then((saved) => { 
        return res.json(saved); 
    })
    .catch((e) => next(e));
}
async function getParent(id, cates) {
  let fin = await Location.findById(id);
  if (fin) {
    cates.push(fin);
    if (fin.parentId) {
      await getParent(fin.parentId, cates);
    }
  }
  // return cates;
}
/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function update(req, res, next) {
  let cates = [];
  try {
    (async function () {
      await getParent(req.body.parentId, cates);
      let exsit = await find(
        cates,
        (item) => item._id.toString() === req.location._id.toString()
      );
      if (exsit) {
        throw res.status(409).send();
      }
      const location = req.location;
      if (has(req.body, "title")) {
        location.title = req.body.title;
      }
      if (has(req.body, "status")) {
        location.status = req.body.status;
      }
      if (has(req.body, "parentId")) {
        // Location.find(req.body.parentId)._id
        location.parentId = req.body.parentId;
      }

      if (has(req.body, "sort")) {
        // Category.find(req.body.parentId)._id
        if (get(req.body, "sort") === "up") {
          location.sort = location.sort + 2;
        } else {
          location.sort = location.sort - 2;
        }
      }
      await location
        .save()
        .then((saved) => {
          return res.json(saved);
        })
        .catch((e) => next(e));
    })();
  } catch (e) {
    return next(e);
  }
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function list(req, res, next) {
  const { limit = 500, skip = 0 } = req.query;

  Location.list({ limit, skip })
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
  const location = req.location;
  pvfun(location, isCallback);
  location
    .remove()
    .then((deleted) => res.json(deleted))
    .catch((e) => next(e));
}
const isCallback = (catgories) => {
  if (catgories.length > 0) {
    catgories.map((cat) => {
      pvfun(cat, isCallback);
      cat.remove();
      return cat;
    });
  }
};
const pvfun = (location, callback) => {
  Location.find({ parentId: location._id }).exec().then(callback);
};
module.exports = { create, update, list, remove, get: show, load };
