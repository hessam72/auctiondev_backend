const express = require('express');
const validate = require('express-validation');
const paramValidation = require('./validation');
const ctrl = require('./controller');
const { authorize } = require('../../config/config');
const router = express.Router(); // eslint-disable-line new-cap
const role = ['super_admin', 'admin', 'user'];
router.route('/')
  /** GET /api/fav - Get list of users */
  .get(ctrl.list)
  /** POST /api/fav - Create new fav */
  .post(authorize(role), validate(paramValidation.create), ctrl.create);

router.route('/:id')
  /** GET /api/fav/:id - Get fav */
  .get(ctrl.get)
  /** DELETE /api/fav/:id - Delete fav */
  .delete(authorize(role), ctrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', ctrl.load);

module.exports = router;
