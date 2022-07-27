const { authJwt } = require("../middlewares");
const { verifySubjectCreate } = require("../middlewares");
const controller = require("../controllers/training.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/training/create",
    [authJwt.verifyToken, authJwt.isAdmin,verifySubjectCreate.checkDuplicateTrainingName],
    controller.create
  );
  app.get(
    "/api/training/getall",
    [authJwt.verifyToken],
    controller.getAllTraining
  );
};
