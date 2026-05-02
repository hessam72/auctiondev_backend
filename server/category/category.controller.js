/* eslint-disable consistent-return */
const Category = require("./category.model");
const async = require("async");
// eslint-disable-next-line import/newline-after-import
const lodash = require("lodash");
const { get, find } = require("lodash");
const Rest = require("../helpers/Rest");
const { has } = lodash;

/**
 * Load Category and append to req.
 */
function load(req, res, next, id) {
  Category.get(id)
    .then((data) => {
      req.category = data; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch((e) => next(e));
}

function show(req, res) {
  return res.json(req.category);
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function create(req, res, next) {
  const model = new Category({
    title: req.body.title,
    icon: req.body.icon,
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
  let fin = await Category.findById(id);
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
        (item) => item._id.toString() === req.category._id.toString()
      );
      if (exsit) {
        throw res.status(409).send();
      }
      const category = req.category;
      if (has(req.body, "title")) {
        category.title = req.body.title;
      }
      if (has(req.body, "icon")) {
        category.icon = req.body.icon;
      }
      if (has(req.body, "parentId")) {
        // Category.find(req.body.parentId)._id
        category.parentId = req.body.parentId;
      }

      if (has(req.body, "sort")) {
        // Category.find(req.body.parentId)._id
        if (get(req.body, "sort") === "up") {
          category.sort = category.sort + 2;
        } else {
          category.sort = category.sort - 2;
        }
      }
      await category
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
  return Category.list({ limit, skip })
    .then((data) => {
      console.log(data);
      return res.json(data);
    })
    .catch((e) => next(e));
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function remove(req, res, next) {
  const category = req.category;
  pvfun(category, isCallback);
  category
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
const pvfun = (category, callback) => {
  Category.find({ parentId: category._id }).exec().then(callback);
};
module.exports = { create, update, list, remove, get: show, load };
