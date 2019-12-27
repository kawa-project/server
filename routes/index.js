const router = require('express').Router();
const UserRouter = require('./user');
const ProductRouter = require('./product');
const CartRouter = require('./cart');

router.use('/user', UserRouter);
router.use('/product', ProductRouter);
router.use('/cart', CartRouter);
module.exports = router;
