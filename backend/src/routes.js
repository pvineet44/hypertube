const routes = require('express').Router();

const test = require('./test');
routes.use('/test', test);

const getMovies = require('./getMovies');
routes.use('/getMovies', getMovies);

module.exports = routes;