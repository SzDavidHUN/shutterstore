const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // https://expressjs.com/en/resources/middleware/cors.html

const indexRouter = require('./routes/index');
const testRouter = require('./routes/test');
const customerRouter = require('./routes/customer');
const orderRouter = require('./routes/order');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use('/', indexRouter);
app.use('/customer', customerRouter);
app.use('/order', orderRouter);

app.use('/test', testRouter);

module.exports = app;
