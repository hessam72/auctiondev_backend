const express = require('express');
const validate = require('express-validation');
const paramValidation = require('./photo.validation');
const photoCtrl = require('./photo.controller');
const upload = require('./upload');
const { authorize } = require('../../config/config');

// eslint-disable-next-line import/newline-a
const router = express.Router(); // eslint-disable-line new-cap

router
  .route('/')
  /** GET /api/photo - Get list of users */
  .get(photoCtrl.list);
router
  .route('/icons')
  /** POST /api/photo - Create new photo */
  .post(authorize(['super_admin', 'admin', 'support']), upload('icons').single('file'), photoCtrl.create);

router
  .route('/product')
  /** POST /api/photo - Create new photo */
  .post(authorize(['super_admin', 'admin', 'support']), upload('product').single('file'), photoCtrl.create);

router
  .route('/:id')
  /** GET /api/photo/:id - Get photo */
  .get(photoCtrl.get)

  /** PUT /api/photo/:id - Update photo */
  .put(authorize(['super_admin', 'admin', 'support']), validate(paramValidation.update), photoCtrl.update)

  /** DELETE /api/photo/:id - Delete photo */
  .delete(authorize(['super_admin', 'admin', 'support']), photoCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', photoCtrl.load);

module.exports = router;
