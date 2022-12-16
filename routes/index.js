const express = require("express");
const { db } = require("../database");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.status(200);
	res.json({
		message: "hello world",
	});
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
