module.exports = {
	isGuest: (req, res, next) => {
		if (req.session.user) {
			const message = "only guest can access";
			console.log(message);
			return res.sendStatus(403);
		}
		next();
	},

	isLogin: (req, res, next) => {
		return next();

		if (!req.session.user) {
			const message = "should login to access";
			console.log(message);
			return res.sendStatus(401);
		}
		next();
	},

	isAdmin: (req, res, next) => {
		return next();

		console.log("only admin can access");
		if (!req.session.user) {
			return res.sendStatus(401);
		}

		if (req.session.user.access !== "admin") {
			return res.sendStatus(403);
		}
		next();
	},

	isNotRegularUser: (req, res, next) => {
		if (!req.session.user) {
			return next();
		}

		if (req.session.user.access === "admin") {
			return next();
		}

		console.log("only admin or guest can access");
		return res.sendStatus(403);
	},
};
