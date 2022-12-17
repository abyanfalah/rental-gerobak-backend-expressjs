const rentModel = require("../model/rentModel");
const rentDetailModel = require("../model/rentDetailModel");
const isIdenticalObject = require("../../helper/is-identical-object");

module.exports = {
	listRent: async (req, res) => {
		let limit = req.query.rows ?? 10;
		let offset = limit * ((req.query.page ?? 1) - 1);
		try {
			let data = await rentModel.getAll(limit, offset);
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

	getRent: async (req, res) => {
		try {
			let foundRent = await rentModel.getById(req.params.id);
			if (!foundRent) {
				return res.sendStatus(404);
			}
			foundRent.detail = await rentDetailModel.getByRentId(foundRent.id);

			res.send({
				data: foundRent,
			});
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},

	getRentDetail: async (req, res) => {
		try {
			let foundRentDetails = await rentDetailModel.getByRentId(req.params.id);
			if (!foundRentDetails || foundRentDetails.length < 1) {
				return res.sendStatus(404);
			}

			res.send({
				data: foundRentDetails,
			});
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},

	createRent: async (req, res) => {
		// req.body.user_id = req.session.user.id;
		req.body.user_id = "76994af7-23dd-4c1c-a4b7-a3ac67d30328";
		console.log("======== STIL USING HARDCODED RENT user_id ==========");

		rentModel
			.create(req.body)
			.then(() => res.send({ message: "rent created" }))
			.catch((err) => res.status(400).send({ err }));
	},

	// updateRent: async (req, res) => {
	// 	try {
	// 		let rentId = req.params.id;
	// 		let foundRent = await rentModel.getById(rentId);
	// 		if (!foundRent) {
	// 			return res.sendStatus(404);
	// 		}

	// 		req.body.id = rentId;

	// 		if (isIdenticalObject(req.body, foundRent)) {
	// 			return res
	// 				.status(200)
	// 				.send({ message: "same data, no changes were made" });
	// 		}

	// 		rentModel
	// 			.update(req.body)
	// 			.then(() => res.send({ message: "rent updated" }))
	// 			.catch((err) => res.send(err));
	// 	} catch (e) {
	// 		console.log(e);
	// 		res.sendStatus(500);
	// 	}
	// },

	// deleteRent: async (req, res) => {
	// 	try {
	// 		let foundRent = await rentModel.getById(req.params.id);
	// 		if (!foundRent) {
	// 			return res.sendStatus(404);
	// 		}
	// 		rentModel
	// 			.delete(foundRent.id)
	// 			.then(() => res.send({ message: "rent deleted" }))
	// 			.catch((err) => res.send(err));
	// 	} catch (e) {
	// 		console.log(e);
	// 		res.sendStatus(500);
	// 	}
	// },

	payAll: async (req, res) => {
		try {
			console.log("pay all controller hit");
			rentModel
				.payAllDetail(req.params.id)
				.then(() => res.send({ message: "payment successfull" }))
				.catch((err) => res.status(400).send({ err }));
		} catch (err) {
			console.log(err);
			res.status(500).send({ err });
		}
	},
};
