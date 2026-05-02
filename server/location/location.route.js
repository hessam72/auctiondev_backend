const express = require('express');
const validate = require('express-validation');
const paramValidation = require('./location.validation');
const locationCtrl = require('./location.controller');
const { authorize } = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/location - Get list of users */
  .get(locationCtrl.list)

  /** POST /api/location - Create new location */
  .post(authorize(['super_admin', 'admin']), validate(paramValidation.create), locationCtrl.create);

router.route('/:id')
  /** GET /api/location/:id - Get location */
  .get(locationCtrl.get)

  /** PUT /api/location/:id - Update location */
  .put(authorize(['super_admin', 'admin']), validate(paramValidation.update), locationCtrl.update)

  /** DELETE /api/location/:id - Delete location */
  .delete(authorize(['super_admin', 'admin']), locationCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', locationCtrl.load);

module.exports = router;
