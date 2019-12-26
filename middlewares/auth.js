const { Password, JWT } = require('../helpers');
const { User } = require('../models');

module.exports = {
    authenticate(req, res, next) {
        try {
            const { token } = req.headers;
            let decoded = JWT.verifyToken(token);
            req.decoded = decoded;
            next();
        } catch (err) {
            next(err);
        }
    },
    authorizationCustomer(req, res, next) {
        const { id } = req.decoded;
        User.findOne({
            _id: id
        })
            .then(user => {
                if (user) {
                    let role = user.role;
                    if (role === 'customer') {
                        next();
                    } else {
                        throw {
                            status: 403,
                            message: 'You dont have authorize to do action'
                        };
                    }
                } else {
                    throw {
                        status: 404,
                        message: 'There is no user with that id'
                    };
                }
            })
            .catch(next);
    },
    authorizationAdmin(req, res, next) {
        const { id } = req.decoded;
        User.findOne({
            _id: id
        })
            .then(user => {
                if (user) {
                    let role = user.role;
                    if (role === 'admin') {
                        next();
                    } else {
                        throw {
                            status: 403,
                            message: 'You dont have authorize to do action'
                        };
                    }
                } else {
                    throw {
                        status: 404,
                        message: 'There is no user with that id'
                    };
                }
            })
            .catch(next);
    }
};
