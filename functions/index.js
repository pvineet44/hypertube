const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

//App config
const app = express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.post("/oauth/token", async (request, response) => {
  console.log("REQ body", request.body.grant_type);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request.body),
  };
  fetch("https://api.intra.42.fr/oauth/token", requestOptions)
    .then((response) => response.json())
    .then((data) => response.status(200).send(data));
});

exports.api = functions.https.onRequest(app);
