const userModel = require("../model/userModel");

module.exports = {
	login: async (req, res) => {
		const { username, password } = req.body;
		const credentials = {
			username,
			password,
		};

		const foundUser = await userModel.getByCredentials(credentials);
		if (!foundUser)
			return res.status(400).send({ message: "invalid credentials" });

		delete foundUser.password;
		req.session.user = foundUser;

		res.send({
			message: `logged in as ${foundUser.name}`,
			userdata: foundUser,
		});
	},

	logout: (req, res) => {
		req.session.destroy();
		res.send({ message: "logged out successfully" });
	},

	isLogin: (req, res) => {
		res.send(req.session.user != null);
	},
};
