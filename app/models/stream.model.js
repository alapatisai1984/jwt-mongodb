const mongoose = require("mongoose");

const Stream = mongoose.model(
  "Stream",
  new mongoose.Schema({
    name: String
  }, {
    timestamps: true
  }
  )
);

module.exports = Stream;
