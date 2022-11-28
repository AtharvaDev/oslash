const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getUsers", authMiddleware.Authorize ,userController.getUsers);
router.get("/getUser", authMiddleware.Authorize, userController.getUser);
router.put("/updateUser", authMiddleware.Authorize, userController.updateUser);
router.delete("/deleteUser", authMiddleware.Authorize, userController.deleteUser);

module.exports = router;
