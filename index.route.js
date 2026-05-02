const express = require('express');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');
const categoryRoutes = require('./server/category/category.route');
const locationRoutes = require('./server/location/location.route');
const tagRoutes = require('./server/tag/tag.route');
const settingRoutes = require('./server/setting/setting.route');
const messageRoutes = require('./server/support/message.route');
const photoRoutes = require('./server/photo/route');
const planRoutes = require('./server/plan/route');
const transactionRoutes = require('./server/transaction/transaction.route');
const productRoutes = require('./server/product/product.route');
const favRoutes = require('./server/favorite/route');
const notifyRoutes = require('./server/notify/route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount auth routes at /category
router.use('/category', categoryRoutes);

// mount setting routes at /setting
router.use('/setting', settingRoutes);

// mount message routes at /message
router.use('/message', messageRoutes);

// mount photo routes at /photo
router.use('/photo', photoRoutes);

// mount plan routes at /plan
router.use('/plan', planRoutes);
// mount transaction routes at /transaction
router.use('/transaction', transactionRoutes);

// mount product routes at /product
router.use('/product', productRoutes);
router.use('/tags', tagRoutes);
router.use('/location', locationRoutes);
router.use('/fav', favRoutes);
router.use('/notify', notifyRoutes);

module.exports = router;
