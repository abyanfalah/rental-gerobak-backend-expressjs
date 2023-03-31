const express = require("express");
const userController = require("../app/controller/userController");
const upload = require("../app/middleware/fileUploadMiddleware");
const {
	isAdmin,
	isNotRegularUser,
	isLogin,
} = require("../app/middleware/authMiddleware");

const router = express.Router();

router.get("/", userController.listUser);
router.get("/check_username", isLogin, userController.checkUsername);
router.get("/:id/image", userController.getUserImage);
router.get("/:id", userController.getUser);

router.post(
	"/",
	isAdmin,
	upload.single("profilePic"),
	userController.createUser
);

router.put("/update_password", isLogin, userController.updateUserPassword);
router.put("/:id", isLogin, userController.updateUser);
router.delete("/:id", isAdmin, userController.deleteUser);

module.exports = router;
