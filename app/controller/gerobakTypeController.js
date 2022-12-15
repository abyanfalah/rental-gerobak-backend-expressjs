const gerobakTypeModel = require("../model/gerobakTypeModel");
const uuid = require("uuid");
const isIdenticalObject = require("../../helper/is-identical-object");
const db = require("../../database").db;

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
			console.log(e);
			res.sendStatus(500);
		}
	},

	getGerobakType: async (req, res) => {
		try {
			let foundGerobakType = await gerobakTypeModel.getById(req.params.id);
			if (!foundGerobakType) {
				return res.sendStatus(404);
			}
			res.send({
				data: foundGerobakType,
			});
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},

	createGerobakType: async (req, res) => {
		try {
			gerobakTypeModel
				.create(req.body)
				.then(() => res.send({ message: "gerobak type created" }))
				.catch((err) => res.send(err));
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},

	updateGerobakType: async (req, res) => {
		try {
			let GerobakId = await req.params.id;
			let foundGerobakType = await gerobakTypeModel.getById(GerobakId);
			if (!foundGerobakType) {
				return res.sendStatus(404);
			}

			if (isIdenticalObject(req.body, foundGerobakType)) {
				return res.send({ message: "same data, no changes were made" });
			}

			gerobakTypeModel
				.update(req.body)
				// .then(() => res.send({ message: "gerobak type updated" }))
				.then(() => res.send({ message: foundGerobakType, body: req.body }))
				.catch((err) => res.send(err));
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},

	deleteGerobakType: async (req, res) => {
		try {
			let foundGerobakType = await gerobakTypeModel.getById(req.params.id);
			if (!foundGerobakType) {
				return res.sendStatus(404);
			}
			gerobakTypeModel
				.delete(foundGerobakType.id)
				.then(() => res.send({ message: "gerobak type deleted" }))
				.catch((err) => res.send(err));
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},
};
