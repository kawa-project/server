const router = require('express').Router();
const { TransactionController } = require('../controllers');
const {
    authenticate,
    authorizationCustomer,
    authorizationAdmin
} = require('../middlewares/auth');

router.use(authenticate);

// create transaction
router.post(
    '/',
    authorizationCustomer,
    TransactionController.createTransaction
);

// get all transaction by admin
router.get('/', authorizationAdmin, TransactionController.getAllTransaction);

// get all user transaction
router.get(
    '/user',
    authorizationCustomer,
    TransactionController.getUserTransaction
);

// update status transaction
router.put('/:id', TransactionController.updateStatusTransaction);

// delete transaction
router.delete('/:id', TransactionController.deleteTransaction);
module.exports = router;
