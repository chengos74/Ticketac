var mongoose = require('mongoose');


var trainsSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  departureTime: String,
  price: Number,
});


var trainsModel = mongoose.model('trains', trainsSchema);

module.exports = trainsModel;