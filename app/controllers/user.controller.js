const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
var bcrypt = require("bcryptjs");
var ObjectId = require('mongodb').ObjectID;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.userPassword =async (req, res) => {
  try {
    const options = { useFindAndModify: false };
    const updateDoc = {
      $set: {
        password: bcrypt.hashSync(req.body.new_password, 8)
      },
    };
    console.log("req.userId", req.userId)
    const result = await User.findByIdAndUpdate(req.userId, updateDoc, options);
    console.log("result", result)
    if (result) {
      res.send({ message: "User was Updated successfully!" });
    } else {
      res.send({ message: "Not able to update user!" });
    }
  } catch (err) {
    res.send({ message: JSON.stringify(err) });
  } finally {
  }
};

exports.userProfile = async (req, res) => {
  try {
    const options = { useFindAndModify: false };
    const updateDoc = {
      $set: {
        username: req.body.username,
        email: req.body.email
      },
    };
    const result = await User.findByIdAndUpdate(req.userId, updateDoc, options);
    if (result) {
      res.send({ message: "User was Updated successfully!" });
    } else {
      res.send({ message: "Not able to update user!" });
    }
  } catch (err) {
    res.send({ message: JSON.stringify(err) });
  } finally {
  }
};


