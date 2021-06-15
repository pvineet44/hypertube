const routes = require('express').Router();

const test = require('./test');
routes.use('/test', test);

module.exports = routes;