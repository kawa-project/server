// set environment variable
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

// database ODM => mongoose DATABASES => mongoDB
require('./config/mongoose');

// require module
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

// apps
const app = express();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// server routing
app.use(routes);

// errorhandler
app.use(errorHandler);

module.exports = app;
