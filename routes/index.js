var express = require('express');
var router = express.Router();

/*
  Mongoose
  Variables
*/
var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Event = mongoose.model('Event');

/*
  Mongoose
  REST Routes: /customers
*/
router.get('/customers', function(req, res, next) {
  Customer.find(function(err, customers) {
    if (err) {
      return next(err);
    }

    res.json(customers);
  });
});

router.post('/customers', function(req, res, next) {
  var customer = new Customer(req.body);

  customer.save(function(err, post) {
    if (err) {
      return next(err);
    }

    res.json(customer);
  });
});

router.get('/events', function(req, res, next) {
  Event.find(function(err, events) {
    if (err) {
      return next(err);
    }

    res.json(events);
  });
});

router.post('/events', function(req, res, next) {
  var event = new Event(req.body);

  event.save(function(err, post) {
    if (err) {
      return next(err);
    }

    res.json(event);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
