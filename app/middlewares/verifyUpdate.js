const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsername = (req, res, next) => {
  if(typeof req.body.username !== 'undefined'){
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
      next();
  });
} else{
  next();
}
};

checkDuplicateEmail = (req, res, next) => {
  if(typeof req.body.email !== 'undefined'){
  // Username
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }
      next();
  });
} else{
  next();
}
};

const verifyUpdateProfile = {
  checkDuplicateUsername,
  checkDuplicateEmail
};
module.exports = verifyUpdateProfile;