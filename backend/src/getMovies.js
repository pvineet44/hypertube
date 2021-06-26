const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');



router.get("/", function(req, res) {
    console.log("REQ RECDF")
    fetch('https://popcorn-ru.tk/movies/1?sort=rating')
    .then(result => result.json()) // expecting a json response
    .then(jsonData => res.send(jsonData));

    // https://popcorn-ru.tk/movies
});

module.exports = router;