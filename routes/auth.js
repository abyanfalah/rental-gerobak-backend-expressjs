const express = require("express");
const authController = require("../app/controller/authController");
const { isLogin, isGuest } = require("../app/middleware/authMiddleware");
const router = express.Router();

router.post("/login", isGuest, authController.login);
router.post("/logout", isLogin, authController.logout);
router.get("/isLogin", authController.isLogin);

module.exports = router;
