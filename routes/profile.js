const express = require("express");
const profileController = require("../app/controller/profileController");
const { isLogin } = require("../app/middleware/authMiddleware");
const router = express.Router();

router.use(isLogin);

router.get("/", profileController.showProfile);

module.exports = router;
