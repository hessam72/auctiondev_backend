const express = require('express');
const validate = require('express-validation');
const paramValidation = require('./validation');
const planCtrl = require('./plan.controller');
const { authorize } = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/plan - Get list of users */
  .get(planCtrl.list)

  /** POST /api/plan - Create new plan */
  .post(authorize(['super_admin', 'admin']), validate(paramValidation.create), planCtrl.create);

router.route('/:id')
  /** GET /api/plan/:id - Get plan */
  .get(planCtrl.get)

  /** PUT /api/plan/:id - Update plan */
  .put(authorize(['super_admin', 'admin']), validate(paramValidation.update), planCtrl.update)

  /** DELETE /api/plan/:id - Delete plan */
  .delete(authorize(['super_admin', 'admin']), planCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', planCtrl.load);

module.exports = router;
