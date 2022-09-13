const mongoose = require("mongoose");

const destinationSchema = mongoose.Schema({
  name: {
    type: String,
  },
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipcode: {
    type: Number,
  },
  country: {
    type: String,
    default: "US",
  },
  phone: {
    type: String,
  },
});

module.exports = Destination = mongoose.model("Destination", destinationSchema);
