const mongoose = require("mongoose");

module.exports = checkValidId = (value) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error("Invalid Id");
  }
  return true;
};
