/**
 * Test route
 */

 const express = require('express');
 const bcrypt = require("bcryptjs");
 const {
     ObjectId
 } = require('mongodb');
 
 router = express.Router();
 
 router.get("/", function(req, res) {
     res.status(200).send('Hello!')
 });
 
 module.exports = router;