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
const Reflection = process.env.TYPE === 'db' ? ReflectionWithDB : ReflectionWithJsObject;
const app = express()
app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
app.get('/api/v1/order/:id', Order.getOne);
app.post('/api/v1/add-order-items/:id', Order.addOrderItemList);

// clients
app.post('/api/v1/add-client', Clients.create);
app.get('/api/v1/all-clients', Clients.getAllClients);
app.get('/api/v1/client-price/:id', Clients.getClientPromoPrice);

// Products
app.post('/api/v1/add-product', ProductWithDefaultPrice.create);
app.get('/api/v1/all-product', ProductWithDefaultPrice.getAllProduct); // test
app.get('/api/v1/product-list', ProductWithDefaultPrice.getProductList);

// Product and Promo Price
app.post('/api/v1/add-product-promo', ProductPromoPrice.addPromoPrice); // test

app.listen(3000)
console.log('app running on port ', 3000);