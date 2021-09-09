const express = require('express');
const article = require('../routes/article');
const helmet = require('helmet');
const morgan = require('morgan');
const methodOverride = require('method-override');

module.exports = function (app) {
    if (app.get('env') == 'development') {
        app.use(morgan('tiny'));
    }

    app.set('view engine', 'ejs');
    app.use(express.json());
    app.use(helmet());
    app.use(express.urlencoded({ extended: false }));
    app.use(methodOverride('_method'));

    app.use('/article', article);
}