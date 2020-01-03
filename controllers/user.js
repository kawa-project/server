const { User } = require('../models');
const { Password, JWT, sendEmail } = require('../helpers');

class UserController {
    static registerUser(req, res, next) {
        const { username, email, password, address, phone } = req.body;
        User.create({
            username,
            email,
            password,
            address,
            role: 'customer',
            phone,
            avatar:
                'https://www.linkkar.com/assets/default/images/default-user.png'
        })
            .then(user => {
                sendEmail(user, true);
                res.status(201).json({
                    user,
                    message: `Register ${user.username} success`
                });
            })
            .catch(next);
    }

    static loginUser(req, res, next) {
        const { email, password, username } = req.body;
        if (email) {
            User.findOne({
                email
            })
                .then(user => {
                    if (user) {
                        let valid = Password.compare(password, user.password);
                        if (valid) {
                            let token = JWT.generateToken({ id: user._id });
                            let data = {
                                user,
                                token,
                                message: `Welcome ${user.username}, Happy Shopping!`
                            };
                            res.status(200).json(data);
                        } else {
                            throw {
                                status: 403,
                                message: 'Your email/password is wrong'
                            };
                        }
                    } else {
                        throw {
                            status: 404,
                            message: 'There is no user with that email/username'
                        };
                    }
                })
                .catch(next);
        } else {
            User.findOne({
                username
            })
                .then(user => {
                    if (user) {
                        let valid = Password.compare(password, user.password);
                        if (valid) {
                            let token = JWT.generateToken({ id: user._id });
                            let data = {
                                user,
                                token,
                                message: `Welcome ${user.username}, Happy Shopping!`
                            };
                            res.status(200).json(data);
                        } else {
                            throw {
                                status: 403,
                                message: 'Your email/password is wrong'
                            };
                        }
                    } else {
                        throw {
                            status: 404,
                            message: 'There is no user with that email/username'
                        };
                    }
                })
                .catch(next);
        }
    }

    static contactUs(req, res, next) {
        const { email } = req.body;
        let user = { email };
        sendEmail(user, false);
        res.status(200).json({
            message: 'Success'
        });
    }

    static getUserInfo(req, res, next) {
        const { id } = req.decoded;
        User.findOne({
            _id: id
        })
            .then(user => {
                res.status(200).json(user);
            })
            .catch(next);
    }

    static editUser(req, res, next) {
        const { id } = req.decoded;
        User.findOne({
            _id: id
        })
            .then(user => {
                if (user) {
                    let input = req.body;
                    let editData = {};
                    for (let data in input) {
                        editData[data] = input[data];
                    }
                    return User.findOneAndUpdate(
                        {
                            _id: user._id
                        },
                        editData,
                        { new: true }
                    );
                } else {
                    throw {
                        status: 404,
                        message: 'There is no user with that id'
                    };
                }
            })
            .then(newUser => {
                res.status(200).json({
                    newUser,
                    message: 'Success Update Profile'
                });
            })
            .catch(next);
    }

    static getAllUser(req, res, next) {
        User.find().then(users => {
            let arr = [];
            users.forEach(data => {
                if (data.role === 'customer') {
                    arr.push(data);
                }
            });
            res.status(200).json(arr);
        });
    }

    static deleteUser(req, res, next) {
        const { id } = req.params;
        User.deleteOne({
            _id: id
        })
            .then(user => {
                res.status(200).json({
                    status: 200,
                    message: 'Delete Success'
                });
            })
            .catch(next);
    }

    static deleteOwnAccount(req, res, next) {
        const { id } = req.decoded;
        User.deleteOne({
            _id: id
        })
            .then(user => {
                res.status(200).json({
                    status: 200,
                    message: 'Delete Account Success'
                });
            })
            .catch(next);
    }
}

module.exports = UserController;
