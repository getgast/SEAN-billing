// server.js
import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import ReflectionWithJsObject from './usingJSObject/controllers/Reflection';
import ReflectionWithDB from './usingDB/controllers/Reflection';
import UserWithDb from './usingDB/controllers/User';
import Auth from './usingDB/middleware/Auth';
import Order from './usingDB/controllers/Order'
import Clients from './usingDB/controllers/Clients'
import ProductWithDefaultPrice from './usingDB/controllers/ProductWithDefaultPrice'
import ProductPromoPrice from './usingDB/controllers/ProductPromoPrice'

dotenv.config();

const PORT = process.env.PORT || 8080;
const path = require('path');
const Reflection = process.env.TYPE === 'db' ? ReflectionWithDB : ReflectionWithJsObject;
const app = express()

app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});



app.get('/', (req, res) => {
 
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
})




app.post('/api/v1/reflections', Auth.verifyToken, Reflection.create);
app.get('/api/v1/reflections', Auth.verifyToken, Reflection.getAll);
app.get('/api/v1/reflections/:id', Auth.verifyToken, Reflection.getOne);
app.put('/api/v1/reflections/:id', Auth.verifyToken, Reflection.update);
app.delete('/api/v1/reflections/:id', Auth.verifyToken, Reflection.delete);
app.post('/api/v1/users', UserWithDb.create);
app.post('/api/v1/users/login',UserWithDb.login);
app.delete('/api/v1/users/me', Auth.verifyToken, UserWithDb.delete);

// oOrder

app.post('/api/v1/add-order', Order.create);
app.get('/api/v1/all-order', Order.getAll);
app.get('/api/v1/all-orderd-items', Order.getAllOrderedItems);
app.get('/api/v1/order/:id', Order.editableOrder);
app.put('/api/v1/add-order-items/:id', Order.editOrderItemInList);
app.post('/api/v1/delete-order-items/:id', Order.deleteOrderItemFromList);
app.post('/api/v1/add-order-items/:id', Order.addOrderItemList);
app.post('/api/v1/add-single-item/:id', Order.addSingleOrderItem)

// clients
app.post('/api/v1/add-client', Clients.create);
app.get('/api/v1/all-clients', Clients.getAllClients);
app.get('/api/v1/client-price/:id', Clients.getClientPromoPrice);

// Products
app.post('/api/v1/add-product', ProductWithDefaultPrice.create);
app.get('/api/v1/all-product', ProductWithDefaultPrice.getAllProduct); // test
app.get('/api/v1/product-list', ProductWithDefaultPrice.getProductList);

// Product and Promo Price
app.get('/api/v1/all-product-promo', ProductPromoPrice.getClientsPromoProductList); 
app.post('/api/v1/add-product-promo', ProductPromoPrice.addPromoPrice); // test


// pdf test
app.get('/api/v1/create-pdf', (req, res)=>{
  createInvoice(invoice, res);

  //res.sendStatus(200)
});

app.post('/api/v1/create-pdf-test', (req, res)=>{
  console.log(req.body)
  
  createInvoice(req.body, res);

  //res.sendStatus(200)
});
const { createInvoice } = require("./usingDB/pdf/pdf_create");



// end pdf test

app.listen(3000, err=>{
   console.log('app running on port ');
})
