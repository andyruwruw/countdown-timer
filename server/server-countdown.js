/*
Counter Server - Routes to various paths.
*/
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/counter', {
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const users = require("./users.js");
app.use("/api/users", users.routes);

const photos = require("./counters.js");
app.use("/api/counters", counters.routes);

app.listen(3001, () => console.log('Server listening on port 3001!'));