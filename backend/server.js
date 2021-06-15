var cors = require('cors')
const express = require('express');
const app = express(),
    bodyParser = require("body-parser");
const port = 3080;
require("dotenv").config();
const https = require("https"),
    fs = require("fs");
const options = {
    key: fs.readFileSync(process.env.KEY_PATH),
    cert: fs.readFileSync(process.env.CERT_PATH),
    passphrase: process.env.PASSPHRASE
}

const {
    v4: uuidv4
} = require('uuid');

const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGO_CONNECTION_STRING;

const client = new MongoClient(uri, {
    useUnifiedTopology: true
});

client.connect(function (err, db) {
    const users = client.db('hypertube').collection('users');
    console.log('users: ', users.find);
    // app.use(async function (req, res, next) {
    //     req.db = app.locals.db;
    //     req.client = app.locals.client;
    //     next();
    // });
});



const server = https.createServer(options, app);
app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));



server.listen(port);