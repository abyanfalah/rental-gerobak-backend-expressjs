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
				length: data.length,
				page: parseInt(req.query.page),
			});
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	},

	getGerobak: async (req, res) => {
		try {
			let foundGerobak = await gerobakModel.getById(req.params.id);
			if (!foundGerobak) {
				return res.status(404).send("gerobak not found");
			}
			res.send({
				data: foundGerobak,
			});
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	},

	createGerobak: async (req, res) => {
		try {
			const foundGerobakType = await gerobakTypeModel.getById(req.body.type_id);
			if (!foundGerobakType || foundGerobakType.deleted_at != null)
				return res.status(400).send({ message: "invalid gerobak type" });

			await gerobakModel.create(req.body);
			res.send({ message: "gerobak created" });
		} catch (e) {
			console.error(e);
			res.status(500).send(err);
		}
	},

	updateGerobak: async (req, res) => {
		try {
			let GerobakId = await req.params.id;
			let foundGerobak = await gerobakModel.getById(GerobakId);
			if (!foundGerobak) {
				return res.status(404).send("gerobak not found");
			}

			req.body.id = GerobakId;

			if (req.body.type_id == foundGerobak.type_id) {
				return res.send({ message: "same data, no changes were made" });
			}

			req.body.code = await gerobakTypeModel.getNextCode(req.body.type_id);

			await gerobakModel.update(req.body);
			res.send({ message: "gerobak updated" });
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	},

	deleteGerobak: async (req, res) => {
		try {
			let foundGerobak = await gerobakModel.getById(req.params.id);
			if (!foundGerobak) {
				return res.status(404).send("gerobak not found");
			}

			if (foundGerobak.deleted_at) {
				return res.status(400).send({
					message:
						"gerobak is deleted already, contact admin to recover account",
				});
			}

			await gerobakModel.delete(foundGerobak.id);
			res.send({ message: "gerobak deleted" });
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	},
};
