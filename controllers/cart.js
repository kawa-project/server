const { Cart, Product } = require('../models');

class CartController {
    static createCart(req, res, next) {
        const { id } = req.params;
        const { size, stock } = req.body;
        let currentProduct = {};
        let currentAttributes = [];
        Product.findOne({
            _id: id
        })
            .then(product => {
                currentProduct = product;
                currentAttributes = product.attributes;
                return Cart.find({
                    productId: product._id
                }).populate('productId');
            })
            .then(carts => {
                let currentCart = {};
                carts.forEach(data => {
                    if (data.size === Number(size)) {
                        currentCart = data;
                    }
                });
                if (currentCart.size) {
                    let isSufficient = false;
                    let newAmount;
                    currentAttributes.forEach(element => {
                        if (element.size === currentCart.size) {
                            newAmount = currentCart.amount + 1;
                            if (element.stock >= newAmount) {
                                isSufficient = true;
                            }
                        }
                    });
                    if (isSufficient) {
                        return Cart.findOneAndUpdate(
                            {
                                _id: currentCart._id
                            },
                            {
                                $set: {
                                    amount: newAmount,
                                    cost: currentProduct.price * newAmount
                                }
                            },
                            {
                                new: true
                            }
                        );
                    } else {
                        throw {
                            status: 400,
                            message: 'Insufficient Stock'
                        };
                    }
                } else {
                    let isExist = false;
                    let isSufficient = false;
                    currentAttributes.forEach(element => {
                        if (element.size === Number(size)) {
                            if (element.stock >= Number(stock)) {
                                isExist = true;
                                isSufficient = true;
                            } else {
                                isExist = true;
                            }
                        }
                    });
                    if (isExist && isSufficient) {
                        return Cart.create({
                            productId: id,
                            size: Number(size),
                            amount: Number(stock),
                            cost: currentProduct.price * Number(stock),
                            UserId: req.decoded.id
                        });
                    } else if (isExist && !isSufficient) {
                        throw {
                            status: 400,
                            message: 'Insufficient Stock'
                        };
                    } else {
                        throw {
                            status: 404,
                            message: 'There is no product with that attributes'
                        };
                    }
                }
            })
            .then(newCart => {
                res.status(200).json(newCart);
            })
            .catch(next);
    }

    static incrementItem(req, res, next) {
        const { id } = req.params;
        let newAmount;
        let currentCart = {};
        Cart.findOne({
            _id: id
        })
            .populate('productId')
            .then(cart => {
                currentCart = cart;
                newAmount = cart.amount + 1;
                return Product.findOne({
                    _id: cart.productId._id
                });
            })
            .then(product => {
                let isSufficient = false;
                let isExist = false;
                let attribute = product.attributes;
                attribute.forEach(element => {
                    if (currentCart.size === element.size) {
                        if (element.stock >= newAmount) {
                            isExist = true;
                            isSufficient = true;
                        } else {
                            isExist = true;
                        }
                    }
                });
                if (isExist && isSufficient) {
                    return Cart.findOneAndUpdate(
                        {
                            _id: id
                        },
                        {
                            $set: {
                                amount: newAmount,
                                cost: product.price * newAmount
                            }
                        },
                        {
                            new: true
                        }
                    );
                } else if (isExist && !isSufficient) {
                    throw {
                        status: 400,
                        message: 'Insufficient stock'
                    };
                } else {
                    throw {
                        status: 404,
                        message: 'There is no product with that attribute'
                    };
                }
            })
            .then(newCart => {
                res.status(200).json(newCart);
            })
            .catch(next);
    }

    static decrementItem(req, res, next) {
        const { id } = req.params;
        let newAmount;
        let currentCart = {};
        Cart.findOne({
            _id: id
        })
            .populate('productId')
            .then(cart => {
                currentCart = cart;
                newAmount = cart.amount - 1;
                return Product.findOne({
                    _id: cart.productId._id
                });
            })
            .then(product => {
                let isSufficient = false;
                let isExist = false;
                let attribute = product.attributes;
                attribute.forEach(element => {
                    if (currentCart.size === element.size) {
                        if (newAmount > 0) {
                            isExist = true;
                            isSufficient = true;
                        } else {
                            isExist = true;
                        }
                    }
                });
                if (isExist && isSufficient) {
                    return Cart.findOneAndUpdate(
                        {
                            _id: id
                        },
                        {
                            $set: {
                                amount: newAmount,
                                cost: product.price * newAmount
                            }
                        },
                        {
                            new: true
                        }
                    );
                } else if (isExist && !isSufficient) {
                    throw {
                        status: 400,
                        message:
                            'Amount must greater than 0, remove item if cancel to buy item'
                    };
                } else {
                    throw {
                        status: 404,
                        message: 'There is no product with that attribute'
                    };
                }
            })
            .then(newCart => {
                res.status(200).json(newCart);
            })
            .catch(next);
    }

    static deleteItem(req, res, next) {
        const { id } = req.params;
        Cart.deleteOne({
            _id: id
        })
            .then(result => {
                if (result.deletedCount > 0) {
                    res.status(200).json({
                        message: 'Delete item success'
                    });
                } else {
                    throw {
                        status: 400,
                        message: 'There is no item with that id in cart'
                    };
                }
            })
            .catch(next);
    }

    static deleteAllItem(req, res, next) {
        Cart.deleteMany()
            .then(result => {
                if (result.deletedCount > 0) {
                    res.status(200).json({
                        message: 'Delete all item success'
                    });
                } else {
                    throw {
                        status: 400,
                        message:
                            'There is no item in cart, please add some item'
                    };
                }
            })
            .catch(next);
    }

    static getAllCart(req, res, next) {
        Cart.find()
            .populate('productId')
            .then(carts => {
                res.status(200).json(carts);
            })
            .catch(next);
    }
}

module.exports = CartController;
