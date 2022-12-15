const userModel = require("../model/userModel");
const uuid = require("uuid");
const sha1 = require("sha1");
const isIdenticalObject = require("../../helper/is-identical-object");
const db = require("../../database").db;

module.exports = {
	listUser: async (req, res) => {
		let limit = req.query.rows ?? 10;
		let offset = limit * ((req.query.page ?? 1) - 1);
		try {
			let data = await userModel.getAll(limit, offset);
			res.send({
				data,
				length: data.length,
				page: parseInt(req.query.page),
			});
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},

	getUser: async (req, res) => {
		try {
			let foundUser = await userModel.getById(req.params.id);
			if (!foundUser) {
				return res.sendStatus(404);
			}
			res.send({
				data: foundUser,
			});
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},

	createUser: async (req, res) => {
		try {
			if (!(await userModel.isAvailableUsername(req.body.username)))
				return res.status(400).send({ message: "username taken" });

			if (req.body.password.length < 4)
				return res
					.status(400)
					.send({ message: "password should be at least 4 characters long" });

			userModel
				.create(req.body)
				.then(() => res.send({ message: "user created" }))
				.catch((err) => res.send(err));
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},

	updateUser: async (req, res) => {
		try {
			let userId = req.params.id;
			let foundUser = await userModel.getById(userId);
			if (!foundUser) {
				return res.sendStatus(404);
			}

			req.body.id = userId;
			req.body.password = sha1(req.body.password);

			if (isIdenticalObject(req.body, foundUser)) {
				return res
					.status(200)
					.send({ message: "same data, no changes were made" });
			}

			userModel
				.update(req.body)
				.then(() => res.send({ message: "user updated" }))
				.catch((err) => res.send(err));
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},

	deleteUser: async (req, res) => {
		try {
			if (req.params.id === req.session.user.id)
				return res.status(400).send({ message: "cannot delete self account" });

			let foundUser = await userModel.getById(req.params.id);
			if (!foundUser) {
				return res.sendStatus(404);
			}
			userModel
				.delete(foundUser.id)
				.then(() => res.send({ message: "user deleted" }))
				.catch((err) => res.send(err));
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},
};
