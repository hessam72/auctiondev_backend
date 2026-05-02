const express = require('express');
const validate = require('express-validation');
const paramValidation = require('./message.validation');
const messageCtrl = require('./message.controller');
const { authorize } = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router
  .route('/user/:user')
  /** GET /api/product - Get list of users */
  .get(authorize(['super_admin', 'admin', 'support', 'user']), messageCtrl.listShow);

router
  .route('/')
  /** GET /api/product - Get list of users */
  .get(authorize(['super_admin', 'admin', 'support']), messageCtrl.list)
  // .get(messageCtrl.list)
  /** POST /api/message - Create new message */
  // eslint-disable-next-line max-len
  .post(
    authorize(['super_admin', 'admin', 'support', 'user']),
    validate(paramValidation.create),
    messageCtrl.create
  );

router
  .route('/:id')
  /** GET /api/message/:id - Get product */
  .get(authorize(['super_admin', 'admin', 'support']), messageCtrl.get)
  /** PUT /api/product/:id - Update product */
  .put(
    authorize(['super_admin', 'admin', 'support']),
    validate(paramValidation.update),
    messageCtrl.update
  )
  /** DELETE /api/product/:id - Delete product */
  .delete(authorize(['super_admin', 'admin', 'support']), messageCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', messageCtrl.load);
module.exports = router;
