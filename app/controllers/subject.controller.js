const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Subject = db.subject;
const Stream = db.stream;
var bcrypt = require("bcryptjs");
var ObjectId = require('mongodb').ObjectID;


exports.create = (req, res) => {
  const subject = new Subject({
    subjects: req.body.subject,
    modified_by : req.userId
  });

  subject.save((err, subject) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.stream) {
      Stream.find(
        {
          name: { $in: req.body.stream }
        },
        (err, streams) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          subject.stream = streams.map(stream => stream._id);
          subject.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "Subject was registered successfully!" });
          });
        }
      );
    } 
  });
};

exports.getAllSubjects = async (req,res) => {
      
      const page = parseInt(req.query.page) || 1 ;
      const limit = parseInt(req.query.limit) || 10;
      const sort = parseInt(req.query.order) || 1
      const skipIndex = (page - 1) * limit;
      const results = {};
      try {
        results.results = await Subject.find()
          .sort({_id:sort})
          .populate("stream")
          .limit(limit)
          .skip(skipIndex)
          .exec();
          res.status(200).send(results);
      } catch (e) {
        res.status(500).json({ message: "Error Occured" });
      }
}

