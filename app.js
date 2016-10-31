/*
  Setup
  Get all the tools we need.
*/
var express = require('express');
var app = express();
// Utilities for working with file and directory paths.
var path = require('path');
// Node.js middleware for serving a favicon.
var favicon = require('serve-favicon');
// HTTP request logger middleware for node.js.
var morgan = require('morgan');
/*
  Parse Cookie header and populate req.cookies with an object keyed by the
  cookie names.
*/
var cookieParser = require('cookie-parser');
/*
  Parse incoming request bodies in a middleware before your handlers,
  available under the req.body property.
*/
var bodyParser = require('body-parser');
// Simple, unobtrusive authentication for Node.js.
var passport = require('passport');
/*
  The flash is a special area of the session used for storing messages.
  Messages are written to the flash and cleared after being displayed to the
  user. The flash is typically used in combination with redirects, ensuring
  that the message is available to the next page that is to be rendered.
*/
var flash = require('connect-flash');
// Simple session middleware for Express.
var session = require('express-session');

/*
  DB
*/
var mongoose = require('mongoose');
var configDB = require('./config/database.js');

// Models
require('./models/Customers.js'); // Customer Model.
require('./models/Events.js'); // Event Model.
require('./models/Users.js'); // User Model.

/*
  Routes
*/
var routes = require('./routes/index.js');
var users = require('./routes/users.js');

/*
  Configuration
*/
mongoose.connect(configDB.url); // Connect with our MongoDB.
require('./config/passport.js')(passport); // Our Passport main configuration.

/*
  View engine setup
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*
  Any Bower components are loaded from HTML like this:
  <script src="bower_components/path"></script>
*/
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

/*
  Any Node modules are loaded from HTML like this:
  <script src="node_modules/path"></script>
*/
app.use('/node_modules',  express.static(__dirname + '/node_modules'));

/*
  Required for passport
*/
app.use(session({
  secret: 'anderconalappointment-management-app',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // Persistent login sessions.
app.use(flash()); // Use connect-flash for flash messages stored in session.

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*
  Error handlers
*/

// Development error handler, will print stack trace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler, no stack traces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
