/*
  Load all the things we need
*/
var LocalStrategy   = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// Load the auth variables
var configAuth = require('./auth.js');

/*
  Expose this function to our app using module.exports.
*/
module.exports = function(passport) {

/**********/
// Passport session setup
/**********/
/*
  Required for persistent login sessions, passport needs ability to serialize
  and unserialize users out of session.
*/

// Used to serialize the user for the session.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Used to deserialize the user.
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/**********/
// Local signup
/**********/
/*
  We are using named strategies since we have one for login and one for signup
  by default, if there was no name, it would just be called 'local'.
*/

passport.use('local-signup', new LocalStrategy({
  usernameField : 'username',
  passwordField : 'password',
  // Allows us to pass back the entire request to the callback.
  passReqToCallback : true
}, function(req, username, password, done) {
    // Asynchronous, User.findOne wont fire unless data is sent back.
    process.nextTick(function() {
      /*
        Find a user whose username is the same as the forms username
        we are checking to see if the user trying to login already exists.
      */
      User.findOne({ 'local.username' :  username }, function(err, user) {
        // If there are any errors, return the error.
        if (err)
          return done(err);

          // Check to see if theres already a user with that username.
          if (user) {
            return done(null, false, req.flash('signupMessage',
                                      'That username is already taken.'));
          } else {
              // If there is no user with that username, create the user.
              var newUser = new User();

              // Set the user's local credentials.
              newUser.local.username    = username;
              newUser.local.password = newUser.generateHash(password);

              // Save the user.
              newUser.save(function(err) {
                if (err)
                  throw err;
                  return done(null, newUser);
              });
          } // End of check to see if theres already a user with that username.
      }); // End of the findOne function's anonymous function.
    }); // End of the nextTick function.
  })); // End of the passport.use function's anonymous function.

/**********/
// Local login
/**********/
/*
  We are using named strategies since we have one for login and one for signup
  by default, if there was no name, it would just be called 'local'
*/
passport.use('local-login', new LocalStrategy({
  usernameField : 'username',
  passwordField : 'password',
  // Allows us to pass back the entire request to the callback
  passReqToCallback : true
  // Callback with username and password from our form
}, function(req, username, password, done) {
    /*
      Find a user whose username is the same as the forms username we are
      checking to see if the user trying to login already exists
    */
    User.findOne({ 'local.username' :  username }, function(err, user) {
      // If there are any errors, return the error before anything else
      if (err)
        return done(err);

      // If no user is found, return the message
      if (!user)
        // req.flash is the way to set flashdata using connect-flash
        return done(null, false, req.flash('loginMessage', 'No user found.'));

      // If the user is found but the password is wrong
      if (!user.validPassword(password))
        // Create the loginMessage and save it to session as flashdata
        return done(null, false, req.flash('loginMessage',
                                  'Oops! Wrong password.'));

      // All is well, return successful user
        return done(null, user);
    }); // End of the findOne function.
  })); // End of the passport.use function's anonymous function.

/**********/
// Google
/**********/
passport.use(new GoogleStrategy({
  clientID        : configAuth.googleAuth.clientID,
  clientSecret    : configAuth.googleAuth.clientSecret,
  callbackURL     : configAuth.googleAuth.callbackURL,
}, function(token, refreshToken, profile, done) {
    /*
      Make the code asynchronous, User.findOne won't fire until we have all our
      data back from Google.
    */
    process.nextTick(function() {
      // Try to find the user based on their Google id
      User.findOne({ 'google.id' : profile.id }, function(err, user) {
        if (err)
          return done(err);

        if (user) {
          // If a user is found, log them in
          return done(null, user);
        } else {
            // If the user isnt in our database, create a new user
            var newUser = new User();

            // Set all of the relevant information
            newUser.google.id    = profile.id;
            newUser.google.token = token;
            newUser.google.name  = profile.displayName;
            // Pull the first email
            newUser.google.email = profile.emails[0].value;

            // Save the user
            newUser.save(function(err) {
              if (err)
                throw err;
                return done(null, newUser);
            });
        } // End of check if a user is found
      }); // End of the findOne function.
    }); // End of the nextTick function.
})); // End of the passport.use function's anonymous function.
}; // End of the module.exports anonymous function.
