const express = require("express");
const rentDetailModel = require("../app/model/rentDetailModel");
const { db } = require("../database");
const router = express.Router();

/* GET home page. */
router.get("/test", async function (req, res, next) {
	res.send(
		await rentDetailModel.getGerobakListByRentId(
			"8118a90f-4ad0-4131-ad32-a9df957b03c5"
		)
	);
});

router.get("/session", (req, res) => {
	res.send(req.session);
});

router.get("/reset", (req, res) => {
	db.query("update gerobak set status = 'ADA'");
	// db.query("truncate rent_detail");
	db.query("truncate rent");
	res.send({ message: "OK" });
});
module.exports = router;
