const { application } = require("express");
const express = require("express");
const rentDetailModel = require("../app/model/rentDetailModel");
const { db } = require("../database");
const router = express.Router();

/* GET home page. */
router.get("/test", async function (req, res, next) {
	const data = {
		url: `${req.protocol}://${req.headers.host}/rent/mock_id/pay/all`,
	};

	res.send({
		data,
	});
});

router.get("/session", (req, res) => {
	res.send(req.session);
});

// router.get("/reset", (req, res) => {
// 	db.query("update gerobak set status = 'ADA'");
// 	// db.query("truncate rent_detail");
// 	db.query("truncate rent");
// 	res.send({ message: "OK" });
// });
module.exports = router;
