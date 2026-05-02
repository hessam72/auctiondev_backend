/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const Fav = require('./model');
const Product = require('../product/product.model');
const ProductMap = require('../product/map');
const async = require('async');
// eslint-disable-next-line import/newline-after-import

/**
 * Load Fav and append to req.
 */
function load(req, res, next, id) {
  Fav.get(id)
    .then((data) => {
      req.location = data; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
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
function create(req, res) {
  try {
    const model = new Fav({
      userId: req.auth.id,
      productId: req.body.productId,
    });
    async.parallel(
      {
        product: (callback) => {
          Product.findById(req.body.productId)
            .then((product) => {
              callback(null, product);
            })
            .catch(callback);
        },
        favorite: (callback) => {
          Fav.findOne({ productId: req.body.productId })
            .then((f) => {
              callback(null, f);
            })
            .catch(callback);
        },
      },
      (err, result) => {
        if (!err && result.product && !result.favorite) {
          model
            .save()
            .then(saved => res.json())
            .catch(e => res.status(400).json());
        } else {
          return res.status(404).json();
        }
      }
    );
  } catch (e) {
    return res.status(400).json();
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
  Fav.list({ limit, skip })
    .then(data => res.json(ProductMap.all(data, 'productId')))
    .catch(e => next(e));
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
    .then(deleted => res.json(deleted))
    .catch(e => next(e));
}

module.exports = { create, list, remove, get: show, load };
