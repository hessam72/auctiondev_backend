const express = require('express');
const validate = require('express-validation');
const validation = require('./validation');
const productCtrl = require('./product.controller');
const { authorize } = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap
const all=['super_admin', 'admin', 'support', 'user'];
const admin=['super_admin', 'admin', 'support'];
router.route('/user/:user')
  /** GET /api/product - Get list of users */
  .get(authorize(all), productCtrl.listShow);

router.route('/')
  /** GET /api/product - Get list of users */
  .get(authorize(admin), productCtrl.list)

  /** POST /api/product - Create new product */
  .post(authorize(admin), validate(validation.create), productCtrl.create);

router.route('/filter')
  /** GET /api/product/:id - Get product */
  .get(authorize(all, false), validate(validation.filter), productCtrl.filter);

router.route('/:id')
  /** GET /api/product/:id - Get product */
  .get(authorize(all), productCtrl.get)
  /** patch /api/product/:id - Update product */
  .patch(authorize(all), productCtrl.show)
  /** PUT /api/product/:id - Update product */
  .put(authorize(admin), validate(validation.update), productCtrl.update)

  /** DELETE /api/product/:id - Delete product */
  .delete(authorize(admin), productCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', productCtrl.load);

module.exports = router;
