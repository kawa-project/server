const router = require('express').Router();
const UserRouter = require('./user');
const ProductRouter = require('./product');
const CartRouter = require('./cart');
const TransactionRouter = require('./transaction');

router.use('/user', UserRouter);
router.use('/product', ProductRouter);
router.use('/cart', CartRouter);
router.use('/transaction', TransactionRouter);

module.exports = router;
