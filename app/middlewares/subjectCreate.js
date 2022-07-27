const db = require("../models");
const ROLES = db.ROLES;
const Subject = db.subject;
const Training = db.training;

checkDuplicateName = (req, res, next) => {

  if(typeof req.body.subject !== 'undefined'){
  // Username
  Subject.findOne({
    subjects: req.body.subject
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Subjectname is already in use!" });
      return;
    }
      next();
  });
} else{
  next();
}
};
checkDuplicateTrainingName = (req, res, next) => {

  if(typeof req.body.training !== 'undefined'){

  Training.findOne({
    course_name: req.body.training
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Course name is already in use!" });
      return;
    }
      next();
  });
} else{
  next();
}
};


const verifySubjectCreate = {
  checkDuplicateName,
  checkDuplicateTrainingName
};
module.exports = verifySubjectCreate;