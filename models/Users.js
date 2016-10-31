/*
  Load the things we need
*/
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

/*
  Define the schema for our user model
*/
var userSchema = mongoose.Schema({
  local : {
    username: String,
    password: String
  },

  google : {
    id: String,
    token: String,
    email: String,
    name: String
  }
});

/*
  Helper methods
*/
// Generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

mongoose.model('User', userSchema);
