module.exports = {
	isGuest: (req, res, next) => {
		if (req.session.user) {
			const message = "only guest can access";
			console.log(message);
			return res.status(403).send(message);
		}
		next();
	},

	isLogin: (req, res, next) => {
		if (!req.session.user) {
			const message = "should login to access";
			console.log(message);
			return res.status(401).send(message);
		}
		next();
	},

	isAdmin: (req, res, next) => {
		let message;
		if (!req.session.user) {
			message = "only admin can access";
			console.log(message);
			return res.status(401).send(message);
		}

		if (req.session.user.access !== "admin") {
			console.log(message);
			return res.status(403).send(message);
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

		const message = "only admin or guest can access";
		console.log(message);
		return res.status(403).send(message);
	},
};
