const gerobakModel = require("../model/gerobakModel");
const isIdenticalObject = require("../../helper/is-identical-object");

module.exports = {
	listGerobak: async (req, res) => {
		let limit = req.query.rows ?? 10;
		let offset = limit * ((req.query.page ?? 1) - 1);
		try {
			let data = await gerobakModel.getAll(limit, offset);
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

	getGerobak: async (req, res) => {
		try {
			let foundGerobak = await gerobakModel.getById(req.params.id);
			if (!foundGerobak) {
				return res.sendStatus(404);
			}
			res.send({
				data: foundGerobak,
			});
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},

	createGerobak: async (req, res) => {
		try {
			gerobakModel
				.create(req.body)
				.then(() => res.send({ message: "gerobak created" }))
				.catch((err) => res.status(500).send(err));
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},

	updateGerobak: async (req, res) => {
		try {
			let GerobakId = await req.params.id;
			let foundGerobak = await gerobakModel.getById(GerobakId);
			if (!foundGerobak) {
				return res.sendStatus(404);
			}

			req.body.id = GerobakId;
			req.body.password = sha1(req.body.password);

			if (isIdenticalObject(req.body, foundGerobak)) {
				return res.send({ message: "same data, no changes were made" });
			}

			gerobakModel
				.update(req.body)
				.then(() => res.send({ message: "gerobak updated" }))
				.catch((err) => res.send(err));
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},

	deleteGerobak: async (req, res) => {
		try {
			let foundGerobak = await gerobakModel.getById(req.params.id);
			if (!foundGerobak) {
				return res.sendStatus(404);
			}
			gerobakModel
				.delete(foundGerobak.id)
				.then(() => res.send({ message: "gerobak deleted" }))
				.catch((err) => res.send(err));
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},
};
