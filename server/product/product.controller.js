/* eslint-disable consistent-return */
const Product = require('./product.model');
const User = require('../user/user.model');
const Show = require('./show.model');
const Category = require('../category/category.model');
const Favorite = require('../favorite/model');
const { has, get, map, find, filter } = require('lodash');
const async1 = require('async');
const Mapper = require('./map');

/**
 * Load Product and append to req.
 */
function load(req, res, next, id) {
  Product.get(id)
    .then((data) => {
      req.product = data; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}



function findId(req, res) {
  try {
    async1.parallel({
      plans: (callback) => {
        // check plan
        User.get(req.auth.id)
          .then(user => {
            callback(null, get(user, 'plans', []).filter(p => {
              if (!p.planId) {
                return false;
              }
              if (p.productId) {
                if (req.product._id != p.productId) {
                  return false;
                }
              }
              return new Date().checkExpired(p.expiredAt)
            }));
          }).catch(() => callback(null, []));
      },
      product: (callback) => {
        callback(null, req.product)
      },
      show: (callback) => {
        Show.get(req.auth.id, req.product._id)
          .then((data) => {
            callback(null, data)
          })
          .catch(() => callback(null, null));
      },
      favorite: (callback) => {
        Favorite.get(req.auth.id, req.product._id)
          .then((data) => {
            callback(null, data)
          })
          .catch(() => callback(null, null));
      }
    }, (err, result) => {
      if (err) return res.status(400).json();

      if (result.plans.length > 0)
        return res.json(Mapper.buy(result));
      return res.json(Mapper.free(result));
    })
  } catch (err) {
    return res.status(400).json();
  }

}
function show(req, res, next) {
  const product = req.product;
  Show.get(req.auth.id, product._id)
    .then((data) => {
      if (data) {
        return res.json();
      }

      const model = new Show({
        user: req.auth.id,
        product: product._id,
      });
      model
        .save()
        .then(() => res.json())
        .catch(e => next(e));
    })
    .catch(e => next(e));
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function create(req, res, next) {
  const model = new Product({
    title: get(req, 'body.title', ''),
    description: get(req, 'body.description', ''),
    owner: get(req, 'auth.id', null),
    category: get(req, 'body.category', null),
    location: get(req, 'body.location', null),
    period: get(req, 'body.period', { to: null, from: null }),
    publishAt: get(req, 'body.publishAt', null),
    files: get(req, 'body.files', []),
    tags: get(req, 'body.tags', []),
    amount: get(req, 'body.amount', false),
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
  const product = req.product;
  if (has(req, 'body.title')) {
    product.title = get(req, 'body.title');
  }
  if (has(req, 'body.description')) {
    product.description = get(req, 'body.description');
  }
  if (has(req, 'body.category')) {
    product.category = get(req, 'body.category');
  }
  if (has(req, 'body.period')) {
    product.period = get(req, 'body.period');
  }
  if (has(req, 'body.publishAt')) {
    product.publishAt = get(req, 'body.publishAt');
  }
  if (has(req, 'body.location')) {
    product.location = get(req, 'body.location');
  }
  if (has(req, 'body.files')) {
    product.files = get(req, 'body.files');
  }
  if (has(req, 'body.tags')) {
    product.tags = get(req, 'body.tags');
  }
  if (has(req, 'body.amount')) {
    product.amount = get(req, 'body.amount', false);
  }
  // product.field = req.body.field;
  // TODO update

  product
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
  Product.list({ limit, skip })
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
  const user = get(req, 'params.user');
  const { limit = 50, skip = 0 } = req.query;
  Show.list({ limit, skip, user })
    .then((data) => {
      async1.concat(
        data,
        (s, callback) => {
          callback(null, get(s, 'product'));
        },
        (err, resualt) => {
          console.log(err, resualt);
          res.json(resualt);
        }
      );
    })
    // .then(resualt => res.json(resualt))
    .catch(e => next(e));
}
function getCategory(parentId, category) {
  return filter(category, c => `${c.parentId}` === `${parentId}`).map(m => {
    return {
      _id: m._id,
      title: m.title,
      parentId: m.parentId,
      children: getCategory(m._id, category)
    }
  });
}
function findCategory(where, category) {
  return map(category, f => {
    where[where.length] = f._id;
    if (f.children) {
      findCategory(where, f.children)
    }
    return where;
  });
}
function listCategory(where, category) {
  // let cty=findCategory(where,getCategory(null,category));
  let cty = category.map(m => {
    return {
      _id: m._id,
      title: m.title,
      parentId: m.parentId,
      children: getCategory(m._id, category)
    }
  });
  let n = filter(cty, cat => {
    return find(where, w => w === `${cat._id}`);
  });
  let wrr = [];
  findCategory(wrr, n);
  return { $in: wrr };
}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function getFilter(req, res, next) {
  const { page = 1, count = 10 } = req.query;
  const p = page <= 1 ? 0 : page;
  async1.parallel({
    where: (callback) => {
      const where = {};
      if (has(req.query, 'search')) {
        where.title = new RegExp(get(req, 'query.search').replace(' ', '').trim());
      }

      if (has(req.query, 'location')) {
        where.location = get(req, 'query.location');
      }
      if (has(req.query, 'tags')) {
        where.tags = { $in: get(req, 'query.tags') };
      }
      where.publishAt = {
        $lt: Date.now(),
      };
      where['period.from'] = { $lte: Date.now() };
      where['period.to'] = { $gte: Date.now() };
      if (has(req.query, 'categories')) {
        //TODO list child
        Category.find().exec().then(function (res) {
          where.category = listCategory(get(req, 'query.categories'), res);
          callback(null, where);
        });
      } else {
        callback(null, where)
      }
    }
  }, (err, result) => {
    Product.list({ limit: count, skip: count * p, where: result.where })
      .then((data) => {
        if (data.length > 0 && has(req, 'auth')) {
          const ids = map(data, item => item._id);
          async1.parallel({
            show: function (callback) {
              Show.search({ product: { $in: ids }, user: get(req, 'auth.id') })
                .then((d) => callback(null, d))
                .catch(e => callback(null, []))
            },
            fav: function (callback) {
              Favorite.search({ productId: { $in: ids }, userId: get(req, 'auth.id') })
                .then((d) => callback(null, d))
                .catch(e => callback(null, []))
            }
          }, (err, result) => {
            const items = map(data, item => {
              return Mapper.free({
                product: item,
                show: find(result.show, i => i.product.toString() === item._id.toString()),
                favorite: find(result.fav, i => i.productId.toString() === item._id.toString()),
              })
            });
            return res.json(items);
          })

        } else {
          const items = map(data, item => {
            return Mapper.free({
              product: item,
              show: null,
              favorite: false,
            })
          });
          return res.json(items);
        }
      })
      .catch(e => next(e));

  })

}

/**
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function remove(req, res, next) {
  const product = req.product;
  product.deletedAt = Date.now();
  product
    .save()
    .then(deleted => res.json(deleted))
    .catch(e => next(e));
}

module.exports = {
  create,
  filter: getFilter,
  update,
  list,
  remove,
  get: findId,
  load,
  show,
  listShow,
};
