const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const { response } = require('express');
const { db } = require('./firebase');
//App config
const app = express();
app.use(require('body-parser').urlencoded({ extended: false }));

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get('/', (request, response) => response.status(200).send('Hello world!'));

app.post('/oauth/token', async (request, response) => {
  console.log('REQ body', request.body.grant_type);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request.body),
  };
  fetch('https://api.intra.42.fr/oauth/token', requestOptions)
    .then((response) => response.json())
    .then((data) => response.status(200).send(data));
});

app.get('/users', async (request, response) => {
  //http://localhost:5001/hypertube-d9f3e/us-central1/api/users
  var users = {};
  await db
    .collection('users')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        users[doc.id] = doc.data();
      });
    });
  response.status(200).send(users);
});

app.get('/user', async (request, response) => {
  //http://localhost:5001/hypertube-d9f3e/us-central1/api/user?uid=56014
  var userId = request.query.uid;
  var user = await db.collection('users').doc(userId);
  const doc = await user.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    console.log('Document data:', doc.data());
  }
  response.status(200).send(doc.data());
});

app.post('/user', async (request, response) => {
  var userId = request.query.uid;
  var email = request.body.email;
  var firstName = request.body.firstName;
  var lastName = request.body.lastName;
  var userName = request.body.userName;

  console.log('req body', request.body);

  var user = await db.collection('users').doc(userId);
  await db.collection('users')
    .doc(userId)
    .update({
      email: email,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
    }).catch((error) => {
      response.status(404).send({
        error: 'User not found'
      })
    });
  response.status(200);
});

// Example endpoint: http://localhost:5001/hypertube-d9f3e/us-central1/api

exports.api = functions.https.onRequest(app);
