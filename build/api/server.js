'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

require('babel-polyfill');

var _Reflection = require('./usingJSObject/controllers/Reflection');

var _Reflection2 = _interopRequireDefault(_Reflection);

var _Reflection3 = require('./usingDB/controllers/Reflection');

var _Reflection4 = _interopRequireDefault(_Reflection3);

var _User = require('./usingDB/controllers/User');

var _User2 = _interopRequireDefault(_User);

var _Auth = require('./usingDB/middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _Order = require('./usingDB/controllers/Order');

var _Order2 = _interopRequireDefault(_Order);

var _Clients = require('./usingDB/controllers/Clients');

var _Clients2 = _interopRequireDefault(_Clients);

var _ProductWithDefaultPrice = require('./usingDB/controllers/ProductWithDefaultPrice');

var _ProductWithDefaultPrice2 = _interopRequireDefault(_ProductWithDefaultPrice);

var _ProductPromoPrice = require('./usingDB/controllers/ProductPromoPrice');

var _ProductPromoPrice2 = _interopRequireDefault(_ProductPromoPrice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config(); // server.js


var PORT = process.env.PORT || 3000;

var Reflection = process.env.TYPE === 'db' ? _Reflection4.default : _Reflection2.default;
var app = (0, _express2.default)();
app.use(_express2.default.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.get('/', function (req, res) {
  return res.status(200).send({ 'message': 'YAY! Congratulations! Your first endpoint is working' });
});

app.post('/api/v1/reflections', _Auth2.default.verifyToken, Reflection.create);
app.get('/api/v1/reflections', _Auth2.default.verifyToken, Reflection.getAll);
app.get('/api/v1/reflections/:id', _Auth2.default.verifyToken, Reflection.getOne);
app.put('/api/v1/reflections/:id', _Auth2.default.verifyToken, Reflection.update);
app.delete('/api/v1/reflections/:id', _Auth2.default.verifyToken, Reflection.delete);
app.post('/api/v1/users', _User2.default.create);
app.post('/api/v1/users/login', _User2.default.login);
app.delete('/api/v1/users/me', _Auth2.default.verifyToken, _User2.default.delete);

// oOrder

app.post('/api/v1/add-order', _Order2.default.create);
app.get('/api/v1/all-order', _Order2.default.getAll);
app.get('/api/v1/all-orderd-items', _Order2.default.getAllOrderedItems);
app.get('/api/v1/order/:id', _Order2.default.editableOrder);
app.put('/api/v1/add-order-items/:id', _Order2.default.editOrderItemInList);
app.post('/api/v1/delete-order-items/:id', _Order2.default.deleteOrderItemFromList);
app.post('/api/v1/add-order-items/:id', _Order2.default.addOrderItemList);
app.post('/api/v1/add-single-item/:id', _Order2.default.addSingleOrderItem);

// clients
app.post('/api/v1/add-client', _Clients2.default.create);
app.get('/api/v1/all-clients', _Clients2.default.getAllClients);
app.get('/api/v1/client-price/:id', _Clients2.default.getClientPromoPrice);

// Products
app.post('/api/v1/add-product', _ProductWithDefaultPrice2.default.create);
app.get('/api/v1/all-product', _ProductWithDefaultPrice2.default.getAllProduct); // test
app.get('/api/v1/product-list', _ProductWithDefaultPrice2.default.getProductList);

// Product and Promo Price
app.get('/api/v1/all-product-promo', _ProductPromoPrice2.default.getClientsPromoProductList);
app.post('/api/v1/add-product-promo', _ProductPromoPrice2.default.addPromoPrice); // test


// pdf test
app.get('/api/v1/create-pdf', function (req, res) {
  createInvoice(invoice, res);

  //res.sendStatus(200)
});

app.post('/api/v1/create-pdf-test', function (req, res) {
  console.log(req.body);

  createInvoice(req.body, res);

  //res.sendStatus(200)
});

var _require = require("./usingDB/pdf/pdf_create"),
    createInvoice = _require.createInvoice;

// end pdf test

app.listen(PORT, function (err) {
  if (err) {
    throw err;
  }

  var serverPath = process.env.NODE_ENV === "prod" ? "http://sean-deploy-bm.herokuapp.com" : "http://localhost";

  console.log('app running on port ', serverPath);
});