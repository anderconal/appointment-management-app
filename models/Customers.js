var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  dni: String,
  name: String,
  lastName: String,
  birthDate: Date,
  address: String,
  postalCode: String,
  phone: String,
  email: String,
  store: String,
  startDate: Date,
  knownBy: String,
  notes: String
});

mongoose.model('Customer', CustomerSchema);
