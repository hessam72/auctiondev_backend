const express = require('express');
const validate = require('express-validation');
const paramValidation = require('./tag.validation');
const categoryCtrl = require('./tag.controller');
const { authorize } = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/tag - Get list of users */
  .get(categoryCtrl.list)

  /** POST /api/tag - Create new tag */
  .post(authorize(['super_admin', 'admin', 'support']), validate(paramValidation.create), categoryCtrl.create);

router.route('/:id')
  /** GET /api/tag/:id - Get tag */
  .get(categoryCtrl.get)

  /** PUT /api/tag/:id - Update tag */
  .put(authorize(['super_admin', 'admin', 'support']), validate(paramValidation.update), categoryCtrl.update)

  /** DELETE /api/tag/:id - Delete tag */
  .delete(authorize(['super_admin', 'admin', 'support']), categoryCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', categoryCtrl.load);

module.exports = router;
