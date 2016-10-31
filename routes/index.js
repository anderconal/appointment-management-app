/*
  Load all the things we need
*/
var express = require('express');
var router = express.Router();
var passport = require('passport');

/*
  DB
*/
var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Event = mongoose.model('Event');

/*
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

/*
  REST Routes: /events
*/
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

/*
  Authentication
*/
/**********/
// Home page (with login links)
/**********/
router.get('/', function(req, res) {
  res.render('index.ejs'); // Load the index.ejs file
});

/**********/
// Login
/**********/
// Login, show the login form
router.get('/login', function(req, res) {
  // Render the page and pass in any flash data if it exists
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

// Process the login form
router.post('/login', passport.authenticate('local-login', {
  // Redirect to the home page if no errors
  successRedirect : '/home',
  // Redirect back to the signup page if there is an error
  failureRedirect : '/login',
  failureFlash : true // Allow flash messages
}));

/**********/
// Signup
/**********/
// Show the signup form
router.get('/signup', function(req, res) {
  // Render the page and pass in any flash data if it exists
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});

// Process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile', // Redirect to the secure profile section
  // Redirect back to the signup page if there is an error
  failureRedirect : '/signup',
  failureFlash : true // Allow flash messages
}));

/**********/
// Profile section
/**********/
/*
  We will want this protected so you have to be logged in to visit. We will use
  route middleware to verify this (the isLoggedIn function)
*/
router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile.ejs', {
    user : req.user // Get the user out of session and pass to template
  });
});

/**********/
// Logout
/**********/
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

/**********/
// Google
/**********/
/*
  Send to Google to do the authentication. Profile gets us their basic
  information including their name. Email gets their emails.
*/
router.get('/auth/google', passport.authenticate('google', {
                            scope: ['profile', 'email']}));

// The callback after Google has authenticated the user
router.get('/auth/google/callback',
            passport.authenticate('google', {
              successRedirect: '/home',
              failureRedirect: '/'
            }));
            
/**********/
// Application start page
/**********/
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

/**********/
// Helper functions
/**********/
// Route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // If user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // If they aren't redirect them to the home page
  res.redirect('/');
}

module.exports = router;
