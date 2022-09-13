const mongoose = require("mongoose");

const areaSchema = mongoose.Schema({
  name: {
    type: String,
  },
  zipcodes: {
    type: Array,
  },
});

module.exports = Area = mongoose.model("Area", areaSchema);
