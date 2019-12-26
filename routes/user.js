const router = require('express').Router();
const { UserController } = require('../controllers');
const {
    authenticate,
    authorizationAdmin,
    authorizationCustomer
} = require('../middlewares/auth');

// user register
router.post('/register', UserController.registerUser);

// user login
router.post('/login', UserController.loginUser);

router.use(authenticate);

// get user info
router.get('/', authorizationCustomer, UserController.getUserInfo);

// edit user profile
router.put('/', authorizationCustomer, UserController.editUser);

// get all user by admin
router.get('/all', authorizationAdmin, UserController.getAllUser);

// delete user by customer
router.delete('/', authorizationCustomer, UserController.deleteOwnAccount);

// delete user by admin
router.delete('/:id', authorizationAdmin, UserController.deleteUser);

module.exports = router;
