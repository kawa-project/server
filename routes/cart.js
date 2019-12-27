const router = require('express').Router();
const { CartController } = require('../controllers');
const {
    authenticate,
    authorizationAdmin,
    authorizationCustomer
} = require('../middlewares/auth');

router.use(authenticate);

// create cart using productId
router.post('/:id', authorizationCustomer, CartController.createCart);

// add item in cart using id cart
router.put('/:id/add', authorizationCustomer, CartController.incrementItem);

// decrease item in cart using id cart
router.put('/:id/min', authorizationCustomer, CartController.decrementItem);

// delete item in cart
router.delete('/:id', authorizationCustomer, CartController.deleteItem);

// delete all item in cart
router.delete('/', authorizationCustomer, CartController.deleteAllItem);

module.exports = router;
