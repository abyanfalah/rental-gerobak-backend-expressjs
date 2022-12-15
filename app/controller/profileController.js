const userModel = require("../model/userModel");

module.exports = {
	showProfile: async (req, res) => {
		res.send(await userModel.getById(req.session.user.id));
	},
};
