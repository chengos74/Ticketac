var mongoose = require('mongoose');


var trainsSchema = mongoose.Schema({
  num: Number,
  departueCity: String,
  arrivalCity: String,
  date: Date,
  departureTime: Date,
  price: Number
});


var trainsModel = mongoose.model('trains', trainsSchema);

module.exports = trainsModel;