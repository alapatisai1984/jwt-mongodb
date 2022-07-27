const mongoose = require("mongoose");

const Training = mongoose.model(
  "Training",
  new mongoose.Schema({
    course_name: String,
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
      }
    ],
    stream: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stream"
      }
    ],
    types: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Types"
      }],
    modified_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
    {
      timestamps: true
    })
);

module.exports = Training;
