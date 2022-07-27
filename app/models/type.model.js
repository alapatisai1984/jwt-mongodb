const mongoose = require("mongoose");

const Types = mongoose.model(
  "Types",
  new mongoose.Schema({
    name: String
  }, {
    timestamps: true
  }
  )
);

module.exports = Types;
