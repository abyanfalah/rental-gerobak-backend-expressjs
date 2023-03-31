const userModel = require("../model/userModel");
const sha1 = require("sha1");
const isIdenticalObject = require("../../helper/is-identical-object");
const path = require("path");
const setUserSession = require("../../helper/set-user-session");

module.exports = {
	listUser: async (req, res) => {
		let data;
		try {
			if (req.query.all === "true") {
				data = await userModel.getAll();
			} else {
				let limit = req.query.rows ?? 10;
				let offset = limit * ((req.query.page ?? 1) - 1);
				data = await userModel.getAll(limit, offset);
			}
			res.send({
				data,
				length: data.length,
				page: parseInt(req.query.page),
			});
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	},

	getUser: async (req, res) => {
		try {
			let foundUser = await userModel.getById(req.params.id);
			if (!foundUser) {
				return res.status(404).send({ message: "user not found" });
			}
			res.send({
				data: foundUser,
			});
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	},

	checkUsername: async (req, res) => {
		try {
			const usernameToCheck = req.query.username;
			const isAvailableUsername = await userModel.isAvailableUsername(
				usernameToCheck
			);

			return res.send(isAvailableUsername);
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
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

			if (req.file) {
				req.body.image = req.file.filename;
			} else {
				delete req.body.profilePic;
			}

			await userModel.create(req.body);
			res.send({ message: "user created" });
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	},

	updateUser: async (req, res) => {
		try {
			let userId = req.params.id;
			let foundUser = await userModel.getById(userId);
			if (!foundUser) {
				return res.status(404).send({ message: "user not found" });
			}

			delete req.body.created_at;
			delete req.body.deleted_at;

			// if is admin, and trying to change password...
			if (req.session.user.access == "admin") {
				if (req.body.password) {
					req.body.password = sha1(req.body.password);
				}
				// if not admin, prevent changing (its own) user access
			} else {
				delete req.body.access;
			}

			if (isIdenticalObject(req.body, foundUser)) {
				return res
					.status(200)
					.send({ message: "same data, no changes were made" });
			}

			await userModel.update(req.body);
			const newUserData = await userModel.getById(userId);
			setUserSession(req, newUserData);
			res.status(200).send({ message: "user updated" });
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	},

	updateUserPassword: async (req, res) => {
		try {
			const userId = req.session.user.id;
			let foundUser = await userModel.getById(userId);
			if (!foundUser) {
				return res.status(404).send({ message: "user not found" });
			}

			const newPassword = sha1(req.body.newPassword);
			const newPasswordConfirmation = sha1(req.body.newPasswordConfirmation);

			if (newPassword !== newPasswordConfirmation)
				return res.status(400).send({
					message: "password confirmation does not match your new password!",
				});

			let data = { id: userId, password: newPassword };

			await userModel.update(data);
			res.send({ message: "user password updated" });
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	},

	deleteUser: async (req, res) => {
		try {
			if (req.params.id === req.session.user.id)
				return res.status(400).send({ message: "cannot delete self account" });

			let foundUser = await userModel.getById(req.params.id);
			if (!foundUser /* || foundUser.deleted_at */) {
				return res.status(404).send({ message: "user not found" });
			}

			if (foundUser.deleted_at) {
				return res.status(400).send({
					message: "user is deleted already, contact admin to recover account",
				});
			}

			await userModel.delete(foundUser.id);
			res.send({ message: "user deleted" });
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	},

	getUserImage: async (req, res) => {
		try {
			let foundUser = await userModel.getById(req.params.id);
			if (!foundUser) {
				return res.status(404).send({ message: "user not found" });
			}

			const filePath = path.join(
				__dirname,
				"..",
				"..",
				"uploads/images/user_profile_pictures",
				foundUser.image ?? "default.jpg"
			);

			res.sendFile(filePath);
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	},
};
