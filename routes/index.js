const express = require("express");
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

module.exports = router;
