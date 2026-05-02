const express = require('express');
const validate = require('express-validation');
const paramValidation = require('./validation');
const ctrl = require('./controller');
const { authorize } = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap


router
  .route('/')
  .get(authorize(['super_admin', 'admin', 'support','user']), ctrl.list)
  .post(
    authorize(['super_admin', 'admin', 'support']),
    validate(paramValidation.create),
    ctrl.create
  );

router
  .route('/:id')
  .get(authorize(['super_admin', 'admin', 'support','user']), ctrl.get)
  .put(
    authorize(['super_admin', 'admin', 'support']),
    validate(paramValidation.update),
    ctrl.update
  )
  .delete(authorize(['super_admin', 'admin', 'support']), ctrl.remove);

router.param('id', ctrl.load);
module.exports = router;
