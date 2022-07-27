const { authJwt } = require("../middlewares");
const { verifyUpdate } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/user/updateuserpassword", [authJwt.verifyToken], controller.userPassword);

  app.post(
    "/api/user/updateprofile",
    [
      authJwt.verifyToken,
      verifyUpdate.checkDuplicateUsername,
      verifyUpdate.checkDuplicateEmail
    ],
    controller.userProfile
  );
};
