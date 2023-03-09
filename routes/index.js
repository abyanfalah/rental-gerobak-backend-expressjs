const express = require("express");
const gerobakModel = require("../app/model/gerobakModel");
const rentDetailModel = require("../app/model/rentDetailModel");
const rentModel = require("../app/model/rentModel");
const router = express.Router();
const upload = require("../app/middleware/fileUploadMiddleware");

// TODO: delete unnecessary imports
router.get("/", (req, res) => {
	res.send("hello world");
});

router.get("/test", async (req, res) => {
	const rentId = "c4d23043-8aff-4f72-9c3b-8a90367fd89b";
	let data = (await rentDetailModel.getByRentId(rentId))[0];
	const gerobakId = data.gerobak_id;
	data.sub_amount = await rentModel.getRentDetailSubAmount(rentId, gerobakId);

	res.send({ data });
});

router.get("/session", (req, res) => {
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
