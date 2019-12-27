const router = require('express').Router();
const UserRouter = require('./user');
const ProductRouter = require('./product');

router.use('/user', UserRouter);
router.use('/product', ProductRouter);
module.exports = router;
