const customerModel = require("../model/customerModel");
const uuid = require("uuid");
const sha1 = require("sha1");
const isIdenticalObject = require("../../helper/is-identical-object");
const db = require("../../database").db;

module.exports = {
	listCustomer: async (req, res) => {
		let limit = req.query.rows ?? 10;
		let offset = limit * ((req.query.page ?? 1) - 1);
		try {
			let data = await customerModel.getAll(limit, offset);
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

	getCustomer: async (req, res) => {
		try {
			let foundCustomer = await customerModel.getById(req.params.id);
			if (!foundCustomer) {
				return res.sendStatus(404);
			}
			res.send({
				data: foundCustomer,
			});
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},

	createCustomer: async (req, res) => {
		customerModel
			.create(req.body)
			.then(() => res.send({ message: "customer created" }))
			.catch((err) => res.status(500).send(err));
	},

	updateCustomer: async (req, res) => {
		try {
			let customerId = req.params.id;
			let foundCustomer = await customerModel.getById(customerId);
			if (!foundCustomer) {
				return res.sendStatus(404);
			}

			req.body.id = customerId;

			if (isIdenticalObject(req.body, foundCustomer)) {
				return res
					.status(200)
					.send({ message: "same data, no changes were made" });
			}

			customerModel
				.update(req.body)
				.then(() => res.send({ message: "customer updated" }))
				.catch((err) => res.send(err));
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},

	deleteCustomer: async (req, res) => {
		try {
			let foundCustomer = await customerModel.getById(req.params.id);
			if (!foundCustomer) {
				return res.sendStatus(404);
			}
			customerModel
				.delete(foundCustomer.id)
				.then(() => res.send({ message: "customer deleted" }))
				.catch((err) => res.send(err));
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},
};
