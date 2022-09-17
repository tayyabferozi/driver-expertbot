const mongoose = require("mongoose");

const tripSchema = mongoose.Schema({
  day: {
    type: Number,
  },
  month: {
    type: String,
  },
  year: {
    type: Number,
  },
  hour: {
    type: Number,
  },
  minutes: {
    type: Number,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  pickupLocation: {
    type: String,
  },
  dropoffLocation: {
    type: String,
  },
  expectedPickupTime1: {
    type: String,
  },
  expectedPickupTime2: {
    type: String,
  },
  actualPickupTime1: {
    type: String,
  },
  actualPickupTime2: {
    type: String,
  },
  actualDropoffTime1: {
    type: String,
  },
  actualDropoffTime2: {
    type: String,
  },
  expectedDropoffTime1: {
    type: String,
  },
  expectedDropoffTime2: {
    type: String,
  },
  tripStatus: {
    type: String,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Trip = mongoose.model("Trip", tripSchema);
