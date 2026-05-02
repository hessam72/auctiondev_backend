/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
const express = require('express');
const validate = require('express-validation');
const validation = require('./validation');
const userCtrl = require('./user.controller');
const config = require('../../config/config');

const router = express.Router();
router
  .route('/admin')
  /** GET /api/users - Get list of users */
  .get(config.authorize(['super_admin']), userCtrl.listAdmin);

router
  .route('/newpassword')
  /** GET /api/users - Get list of users */
  .put(
    config.authorize(['super_admin', 'admin', 'support', 'user']),
    validate(validation.newpassword),
    userCtrl.newpassword
  );

router
  .route('/')
  /** GET /api/users - Get list of users */
  // .get(userCtrl.list)
  .get(config.authorize(['super_admin', 'admin', 'support']), userCtrl.list)
  /** POST /api/users - Create new user */
  .post(
    config.authorize(['super_admin', 'admin', 'support']),
    validate(validation.createUser),
    userCtrl.create
  );
// TODO get blance jade
router
  .route('/me')
  /** GET /api/users/:userId - Get user */
  .get(config.authorize(['super_admin', 'admin', 'support', 'user']), userCtrl.getMe)
  .put(
    config.authorize(['super_admin', 'admin', 'support', 'user']),
    validate(validation.updateMe),
    userCtrl.updateMe
  );

router
  .route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(userCtrl.get)
  //   /** PUT /api/users/:userId - Update user */
  .put(
    config.authorize(['super_admin', 'admin', 'support']),
    validate(validation.updateMe),
    userCtrl.update
  )

  //   /** DELETE /api/users/:userId - Delete user */
  .delete(config.authorize(['super_admin', 'admin', 'support']), userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

// ticket
// notification
//
module.exports = router;
