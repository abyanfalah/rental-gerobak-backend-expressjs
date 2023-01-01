const gerobakModel = require("../model/gerobakModel");
const isIdenticalObject = require("../../helper/is-identical-object");
const gerobakTypeModel = require("../model/gerobakTypeModel");

module.exports = {
	listGerobak: async (req, res) => {
		let limit = req.query.rows ?? 10;
		let offset = limit * ((req.query.page ?? 1) - 1);

		try {
			let data = await gerobakModel.getAllNoPagination();
			// let data = await gerobakModel.getAll(limit, offset);

			res.send({
				data,
				// length: data.length,
				// page: parseInt(req.query.page),
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
			const foundGerobakType = await gerobakTypeModel.getById(req.body.type_id);
			if (!foundGerobakType || foundGerobakType.deleted_at != null)
				return res.status(400).send({ message: "invalid gerobak type" });

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

			if (req.body.type_id == foundGerobak.type_id) {
				return res.send({ message: "same data, no changes were made" });
			}

			req.body.code = await gerobakTypeModel.getNextCode(req.body.type_id);

			gerobakModel
				.update(req.body)
				.then(() => res.send({ message: "gerobak updated" }))
				.catch((err) => res.status(501).send(err));
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
