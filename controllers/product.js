const { Product } = require('../models');

class ProductController {
    static createProduct(req, res, next) {
        const { name, price, image, color, size, stock } = req.body;
        let attributeData = {
            color: color.toLowerCase(),
            size: size,
            stock
        };
        Product.findOne({
            name
        })
            .then(product => {
                if (product) {
                    let attribute = product.attributes;
                    let isExist = false;
                    attribute.forEach(element => {
                        if (
                            element.color === color.toLowerCase() &&
                            element.size === Number(size)
                        ) {
                            element.stock += Number(stock);
                            isExist = true;
                        }
                    });
                    if (isExist) {
                        product.save();
                        res.status(201).json(product);
                    } else {
                        return Product.findOneAndUpdate(
                            {
                                _id: product._id
                            },
                            {
                                $push: { attributes: attributeData }
                            },
                            {
                                new: true
                            }
                        );
                    }
                } else {
                    return Product.create({
                        name,
                        price,
                        image,
                        attributes: attributeData
                    });
                }
            })
            .then(newProduct => {
                res.status(201).json(newProduct);
            })
            .catch(next);
    }

    static getOneProduct(req, res, next) {
        const { id } = req.params;
        Product.findOne({
            _id: id
        })
            .then(product => {
                if (product) {
                    res.status(200).json(product);
                } else {
                    throw {
                        status: 404,
                        message: 'There is no product with that id'
                    };
                }
            })
            .catch(next);
    }

    static updateProduct(req, res, next) {
        const { id } = req.body;
        Product.findOne({
            _id: id
        })
            .then(product => {
                if (product) {
                    let input = req.body;
                    let editData = {};
                    for (const data in input) {
                        editData[data] = input[data];
                    }
                    return Product.findOneAndUpdate(
                        {
                            _id: product._id
                        },
                        editData,
                        { new: true }
                    );
                } else {
                    throw {
                        status: 400,
                        message: 'There is no product with that id'
                    };
                }
            })
            .then(newProduct => {
                res.status(200).json(newProduct);
            })
            .catch(next);
    }

    static updateAttributes(req, res, next) {
        const { color, size, stock } = req.body;
        const { id } = req.params;
        Product.findOne({
            _id: id
        })
            .then(product => {
                let attribute = product.attributes;
                let isExist = false;
                attribute.forEach(data => {
                    if (data.color === color && data.size === Number(size)) {
                        data.stock += Number(stock);
                        isExist = true;
                    }
                });
                if (isExist) {
                    product.save();
                    res.status(200).json(product);
                } else {
                    return Product.findOneAndUpdate(
                        {
                            _id: product._id
                        },
                        {
                            $push: {
                                attributes: {
                                    color,
                                    size: Number(size),
                                    stock: Number(stock)
                                }
                            }
                        },
                        { new: true }
                    );
                }
            })
            .then(newProduct => {
                res.status(200).json(newProduct);
            })
            .catch(next);
    }

    static getDetailAttribute(req, res, next) {
        const { color } = req.query;
        const { id } = req.params;
        Product.findOne({
            _id: id
        })
            .then(product => {
                let attribute = product.attributes;
                let arr = [];
                attribute.forEach(data => {
                    if (data.color === color) {
                        arr.push(data);
                    }
                });
                res.status(200).json(arr);
            })
            .catch(next);
    }

    static updateStock(req, res, next) {
        const { color, size, stock } = req.query;
        const { id } = req.params;
        Product.findOne({
            _id: id
        })
            .then(product => {
                if (product) {
                    let attribute = product.attributes;
                    let isExist = false;
                    attribute.forEach(data => {
                        if (
                            data.color === color &&
                            data.size === Number(size)
                        ) {
                            if (data.stock >= Number(stock)) {
                                data.stock -= Number(stock);
                                isExist = true;
                            } else {
                                throw {
                                    status: 400,
                                    message: 'Insufficient Stock'
                                };
                            }
                        }
                    });
                    if (isExist) {
                        product.save();
                        res.status(200).json({
                            message: 'Update stock success'
                        });
                    } else {
                        throw {
                            status: 404,
                            message: 'There is no attribute match'
                        };
                    }
                } else {
                    throw {
                        status: 404,
                        message: 'There is no product with that id'
                    };
                }
            })
            .catch(next);
    }

    static deleteProduct(req, res, next) {
        const { id } = req.params;
        Product.deleteOne({
            _id: id
        })
            .then(result => {
                if (result.deletedCount > 0) {
                    res.status(200).json({
                        message: 'Success delete product'
                    });
                } else {
                    throw {
                        status: 404,
                        message: 'There is no product with that id'
                    };
                }
            })
            .catch(next);
    }
}

module.exports = ProductController;
