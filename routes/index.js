const express = require("express");
const gerobakModel = require("../app/model/gerobakModel");
const rentDetailModel = require("../app/model/rentDetailModel");
const rentModel = require("../app/model/rentModel");
const router = express.Router();
const upload = require("../app/middleware/fileUploadMiddleware");
const { isLogin } = require("../app/middleware/authMiddleware");

// TODO: delete unnecessary imports
router.get("/", (req, res) => {
	res.send("hello world");
});

router.get("/test", async (req, res) => {});

router.get("/session", isLogin, (req, res) => {
	res.send(req.session);
});

router.put("/reset/gerobak", async (req, res) => {
	const gerobakList = await gerobakModel.getAllNoPagination();
	for (let gerobak of gerobakList) {
		await gerobakModel.updateStatus("ADA", gerobak.id);
	}
	res.send("ok");
});

router.post("/upload", upload.single("profilePic"), (req, res) => {
	console.log(req.file);
	console.log(req.body);

	res.json({
		file: req.file,
		body: req.body,
	});
});

module.exports = router;
