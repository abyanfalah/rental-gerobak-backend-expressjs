const gerobakTypeModel = require("../model/gerobakTypeModel");
const isIdenticalObject = require("../../helper/is-identical-object");

module.exports = {
	listGerobakType: async (req, res) => {
		let limit = req.query.rows ?? 10;
		let offset = limit * ((req.query.page ?? 1) - 1);
		try {
			let data = await gerobakTypeModel.getAll(limit, offset);
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

	getGerobakType: async (req, res) => {
		try {
			let foundGerobakType = await gerobakTypeModel.getById(req.params.id);
			if (!foundGerobakType) {
				return res.status(404).send({ message: "gerobak type not found" });
			}
			res.send({
				data: foundGerobakType,
			});
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	},

	createGerobakType: async (req, res) => {
		try {
			gerobakTypeModel
				.create(req.body)
				.then(() => res.send({ message: "gerobak type created" }))
				.catch((err) => res.status(400).send(err));
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	},

	updateGerobakType: async (req, res) => {
		try {
			let GerobakId = await req.params.id;
			let foundGerobakType = await gerobakTypeModel.getById(GerobakId);
			if (!foundGerobakType) {
				return res.status(404).send({ message: "gerobak type not found" });
			}

			if (isIdenticalObject(req.body, foundGerobakType)) {
				return res.send({ message: "same data, no changes were made" });
			}

			req.body.id = GerobakId;

			await gerobakTypeModel.update(req.body);
			res.send({ message: "gerobak type updated" });
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	},

	deleteGerobakType: async (req, res) => {
		try {
			let foundGerobakType = await gerobakTypeModel.getById(req.params.id);
			if (!foundGerobakType) {
				return res.status(404).send({ message: "gerobak type not found" });
			}

			if (foundGerobakType.deleted_at) {
				return res.status(400).send({
					message:
						"gerobak type is deleted already. contact admin to recover account",
				});
			}

			await gerobakTypeModel.delete(foundGerobakType.id);
			res.send({ message: "gerobak type deleted" });
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	},
};
