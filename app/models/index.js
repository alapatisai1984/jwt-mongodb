const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.stream = require("./stream.model");
db.subject = require("./subject.model");
db.training = require("./training.model");
db.types = require("./type.model");

db.ROLES = ["user", "admin"];
db.TYPES = ["Basic", "Detailed"];

module.exports = db;