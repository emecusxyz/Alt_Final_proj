const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");

router
  .route("/")
  .get(UserController.getAllUsers)
  .post(UserController.createANewUser)
  .delete(UserController.deleteAUser);

module.exports = router;
