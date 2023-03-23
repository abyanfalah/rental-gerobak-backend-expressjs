const express = require("express");
const userController = require("../app/controller/userController");
const upload = require("../app/middleware/fileUploadMiddleware");
const {
	isAdmin,
	isNotRegularUser,
} = require("../app/middleware/authMiddleware");

const router = express.Router();

router.get("/", userController.listUser);
router.get("/:id/image", userController.getUserImage);
router.get("/:id", userController.getUser);

router.post(
	"/",
	isAdmin,
	upload.single("profilePic"),
	userController.createUser
);

router.put("/:id", isAdmin, userController.updateUser);
router.delete("/:id", isAdmin, userController.deleteUser);

module.exports = router;
