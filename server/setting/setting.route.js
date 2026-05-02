const express = require('express');
const validate = require('express-validation');
const paramValidation = require('./setting.validation');
const settingCtrl = require('./setting.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/query')
  /** GET /api/setting - Get list of users */
  .post(settingCtrl.query);

router.route('/')
  /** GET /api/setting - Get list of users */
  .get(settingCtrl.list)
  /** POST /api/setting - Create new setting */
  .post(validate(paramValidation.create), settingCtrl.create);

router.route('/:type')
  /** GET /api/setting/:type - Get setting */
  .get(settingCtrl.get)

  /** PUT /api/setting/:id - Update setting */
  .put(validate(paramValidation.update), settingCtrl.update)

  /** DELETE /api/setting/:id - Delete setting */
  .delete(settingCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('type', settingCtrl.load);

module.exports = router;
