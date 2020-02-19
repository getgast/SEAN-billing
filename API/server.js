const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const db = require('./queries')

//Middleware
app.use(bodyParser.json())

//cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//roots

app.get('/test-root', (req, res)=>{
    console.log('shoot')
    db.createTable();
    res.send(['jest'])
})

app.get('/test-db', (req, res)=>{
    console.log('shoot 1')
    db.createDataBase()
    res.send(['jest'])
})

app.get('/test-db-elem', (req, res)=>{
    console.log('shoot 1')
    db.addElem()
    res.send(['jest 1'])
})


// server

app.listen(3000, ()=>{
    //db.createDataBase()
    console.log('server is here')
})
