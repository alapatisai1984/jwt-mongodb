const mongoose = require("mongoose");

const Subject = mongoose.model(
  "Subject",
  new mongoose.Schema({
    subjects: String,
    stream:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stream"
    },
    modified_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
    {
      timestamps: true
    })
);

module.exports = Subject;
