const express = require('express');
const validate = require('express-validation');
const validation = require('./validation');
const transactionCtrl = require('./transaction.controller');
const expressJwt = require('express-jwt');
const config = require('../../config/config');
const { authorize } = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap


// TODO Transaction
router
  .route('/user/:user')
  /** GET /api/product - Get list of users */
  .get(authorize(['super_admin', 'admin', 'support', 'user']), transactionCtrl.listShow);

// TODO change auth
router.route('/')
  /** GET /api/transaction - Get list of users */
  .get(expressJwt(config.auth('admin')), transactionCtrl.list)
  /** POST /api/transaction - Create new transaction */
  .post(expressJwt(config.auth('admin')), validate(validation.create), transactionCtrl.create);

router.route('/success')
  .get(expressJwt(config.auth('admin')), transactionCtrl.listSuccess);


router.route('/:id')
  /** GET /api/transaction/:id - Get transaction */
  .get(transactionCtrl.get)
  /** PUT /api/transaction/:id - Update transaction */
  .put(validate(validation.update), transactionCtrl.update)

  /** DELETE /api/transaction/:id - Delete transaction */
  .delete(transactionCtrl.remove);

  // TODO api  payment
router
.route('/nextpay/:token/callback')
.all(transactionCtrl.callback);

/** Load user when API with userId route parameter is hit */
router.param('id', transactionCtrl.load);
router.param('token', transactionCtrl.loadToken);

// TODO
module.exports = router;
