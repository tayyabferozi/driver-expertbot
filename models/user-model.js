const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  userType: {
    type: String,
    default: "customer",
  },
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  email: {
    type: String,
  },
  phone1: {
    type: String,
  },
  phone2: {
    type: String,
  },
  homeAddress1: {
    type: String,
  },
  homeAddress2: {
    type: String,
  },
  homeCity: {
    type: String,
  },
  homeState: {
    type: String,
  },
  homeZipcode: {
    type: String,
  },
  homeCountry: {
    type: String,
  },
  destinationAddress1: {
    type: String,
  },
  destinationAddress2: {
    type: String,
  },
  destinationCity: {
    type: String,
  },
  destinationState: {
    type: String,
  },
  destinationZipcode: {
    type: String,
  },
  destinationCountry: {
    type: String,
  },
  destinationCreationDate: {
    type: Date,
  },
  lastLogin: {
    type: Date,
  },
  onlineStatus: {
    type: Boolean,
  },
});

module.exports = User = mongoose.model("User", userSchema);
