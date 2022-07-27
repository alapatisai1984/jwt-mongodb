const { authJwt } = require("../middlewares");
const { verifySubjectCreate } = require("../middlewares");
const controller = require("../controllers/subject.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/subject/create",
    [authJwt.verifyToken, authJwt.isAdmin,verifySubjectCreate.checkDuplicateName],
    controller.create
  );
  app.get(
    "/api/subjects/getall",
    [authJwt.verifyToken],
    controller.getAllSubjects
  );
};
