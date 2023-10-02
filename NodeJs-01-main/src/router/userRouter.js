const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authController = require("../controller/authController");

router.post("/users", userController.CreateUser);
router.get("/users", userController.GetAllUsers);
router.get("/users/:id", userController.GetUsersById);
router.put("/users/:id", userController.UpdateUser);
router.delete("/users/:id", userController.DeleteUser);

module.exports = router;