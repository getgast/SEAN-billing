'use strict';

// server.js
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    return res.status(200).send({ 'message': 'YAY! Congratulations! Your first endpoint is working' });
});

app.listen(3000);
console.log('app running on port ', 3000);