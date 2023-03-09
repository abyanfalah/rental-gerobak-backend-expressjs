const multer = require("multer");
const multerStorage = multer.diskStorage({
	destination: "./uploads/images/user_profile_pictures/",
	filename: (req, file, cb) => {
		const error =
			file.mimetype.search("image/") > -1 ? null : new Error("wrong file");

		cb(error, `${Date.now().toString()}.jpg`);
	},
});

module.exports = multer({ storage: multerStorage });
