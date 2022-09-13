const mongoose = require("mongoose");

const subAreaSchema = mongoose.Schema({
  name: {
    type: String,
  },
  zipcodes: {
    type: Array,
  },
});

module.exports = Area = mongoose.model("Subarea", subAreaSchema);
