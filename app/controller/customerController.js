const customerModel = require("../model/customerModel");
const isIdenticalObject = require("../../helper/is-identical-object");

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
			console.error(e);
			res.sendStatus(500);
		}
	},

	getCustomer: async (req, res) => {
		try {
			let foundCustomer = await customerModel.getById(req.params.id);
			if (!foundCustomer) {
				return res.status(404).send({ message: "customer not found" });
			}
			res.send({
				data: foundCustomer,
			});
		} catch (e) {
			console.error(e);
			res.sendStatus(500);
		}
	},

	createCustomer: async (req, res) => {
		try {
			await customerModel.create(req.body);
			res.send({ message: "customer created" });
		} catch (e) {
			res.status(500).send(err);
		}
	},

	updateCustomer: async (req, res) => {
		try {
			let customerId = req.params.id;
			let foundCustomer = await customerModel.getById(customerId);
			if (!foundCustomer) {
				return res.status(404).send({ message: "customer not found" });
			}

			req.body.id = customerId;

			if (isIdenticalObject(req.body, foundCustomer)) {
				return res
					.status(200)
					.send({ message: "same data, no changes were made" });
			}

			await customerModel.update(req.body);
			res.send({ message: "customer updated" });
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	},

	deleteCustomer: async (req, res) => {
		try {
			let foundCustomer = await customerModel.getById(req.params.id);
			if (!foundCustomer) {
				return res.status(404).send({ message: "customer not found" });
			}

			if (foundCustomer.deleted_at) {
				return res.status(400).send({
					message:
						"customer is deleted already, contact admin to recover account",
				});
			}

			await customerModel.delete(foundCustomer.id);
			res.send({ message: "customer deleted" });
		} catch (e) {
			console.error(e);
			res.status(500).send(e);
		}
	},
};
