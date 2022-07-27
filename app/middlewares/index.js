const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verifyUpdate = require("./verifyUpdate")
const verifySubjectCreate = require("./subjectCreate")

module.exports = {
  authJwt,
  verifySignUp,
  verifyUpdate,
  verifySubjectCreate
};
