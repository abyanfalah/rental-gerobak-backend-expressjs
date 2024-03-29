const rentModel = require("../model/rentModel");
const rentDetailModel = require("../model/rentDetailModel");
const gerobakModel = require("../model/gerobakModel");

module.exports = {
	listRent: async (req, res) => {
		try {
			const limit = req.query.rows ?? 10;
			const offset = limit * ((req.query.page ?? 1) - 1);
			const status = req.query.status;

			let data = [];

			if (req.query.get_view === "true") {
				data = await rentModel.getView();
			} else {
				if (status) {
					data = await rentModel.getAllByStatus(status, limit, offset);
				} else {
					data = await rentModel.getAll(limit, offset);
				}
			}

			if (req.query.with_detail === "true") {
				for (let i = 0; i < data.length; i++) {
					data[i].detail = await rentDetailModel.getByRentIdWithGerobakDetails(
						data[i].id
					);
				}
			}

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

	listTodayRent: async (req, res) => {
		try {
			let data = await rentModel.getTodayRentView();

			if (req.query.with_detail === "true") {
				for (let i = 0; i < data.length; i++) {
					data[i].detail = await rentDetailModel.getByRentIdWithGerobakDetails(
						data[i].id
					);
				}
			}

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

	getRent: async (req, res) => {
		try {
			let foundRent;
			if (req.query.get_view === "true") {
				foundRent = await rentModel.getViewById(req.params.id);
			} else {
				foundRent = await rentModel.getById(req.params.id);
			}

			if (!foundRent) {
				return res.status(404).send({ message: "rent not found" });
			}

			foundRent.detail = await rentDetailModel.getByRentIdWithGerobakDetails(
				foundRent.id
			);

			res.send({
				data: foundRent,
			});
		} catch (e) {
			console.error(e);
			res.sendStatus(500);
		}
	},

	// getRentDetail: async (req, res) => {
	// 	try {
	// 		let foundRentDetails = await rentDetailModel.getByRentId(req.params.id);
	// 		if (!foundRentDetails || foundRentDetails.length < 1) {
	// 			return res.status(404).send({ message: "rent not found" });
	// 		}

	// 		res.send({
	// 			data: foundRentDetails,
	// 		});
	// 	} catch (e) {
	// 		console.error(e);
	// 		res.sendStatus(500);
	// 	}
	// },

	createRent: async (req, res) => {
		try {
			req.body.user_id = req.session.user.id;
			const gerobakIdList = req.body.gerobak_list;

			// check if there is already rented gerobak
			for (let gerobakId of gerobakIdList) {
				const gerobakStatus = await gerobakModel.getGerobakStatus(gerobakId);
				if (gerobakStatus !== "ADA") {
					return res
						.status(400)
						.send(
							"invalid gerobak list (probably tried to rent rented one(s)?)"
						);
				}
			}

			rentModel.create(req.body);
			res.send({ message: "rent created" });
		} catch (err) {
			res.status(500).send({ err });
		}
	},

	// updateRent: async (req, res) => {
	// 	try {
	// 		let rentId = req.params.id;
	// 		let foundRent = await rentModel.getById(rentId);
	// 		if (!foundRent) {
	// 			return res.status(404).send({message: "rent not found"});
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
	// 		console.error(e);
	// 		res.sendStatus(500);
	// 	}
	// },

	// deleteRent: async (req, res) => {
	// 	try {
	// 		let foundRent = await rentModel.getById(req.params.id);
	// 		if (!foundRent) {
	// 			return res.status(404).send({message: "rent not found"});
	// 		}
	// 		rentModel
	// 			.delete(foundRent.id)
	// 			.then(() => res.send({ message: "rent deleted" }))
	// 			.catch((err) => res.send(err));
	// 	} catch (e) {
	// 		console.error(e);
	// 		res.sendStatus(500);
	// 	}
	// },

	getBill: async (req, res) => {
		try {
			let foundRent = await rentModel.getById(req.params.id);
			if (!foundRent)
				return res.status(404).send({ message: "rent not found" });

			const data = await rentModel.getTotalToPay(foundRent.id);
			res.send({ data });
		} catch (err) {
			console.error(err);
			res.status(500).send({ err });
		}
	},

	payAll: async (req, res) => {
		try {
			let foundRent = await rentModel.getById(req.params.id);
			if (!foundRent)
				return res.status(404).send({ message: "rent not found" });

			if (foundRent.status === "OK")
				return res.status(400).send({ message: "rent has been already paid" });

			await rentModel.payAllDetail(foundRent.id, req.session.user.id);
			res.send({ message: "payment successfull" });
		} catch (err) {
			console.error(err);
			res.status(500).send({ err });
		}
	},

	payPartial: async (req, res) => {
		try {
			let foundRent = await rentModel.getById(req.params.id);
			if (!foundRent)
				return res.status(404).send({ message: "rent not found" });
			if (foundRent.status === "OK")
				return res.status(400).send({ message: "rent is already paid" });

			const gerobakPayList = req.body.gerobak_id_list;

			let unpaidGerobakIdList =
				await rentDetailModel.getUnpaidGerobakListByRentId(foundRent.id);

			for (const id of gerobakPayList) {
				if (!unpaidGerobakIdList.includes(id))
					return res.status(400).send({
						message: "invalid gerobak paylist",
					});
			}

			// TODO: decide following problem
			// 	============= WHEN TRYING TO PAY ALL VIA PARTIAL PAY, will use frontend to handle that
			// if (gerobakPayList.length == unpaidGerobakIdList.length) {
			// 	return res.redirect(
			// 		302
			// 		,
			// 		`${req.protocol}://${req.headers.host}/rent/${foundRent.id}/pay/all`
			// 	);
			// }

			await rentModel.payPartialDetail(
				foundRent.id,
				gerobakPayList,
				req.session.body
			);
			res.send({ message: "partial payment successfull" });
		} catch (err) {
			console.error(err);
			res.status(500).send({ err });
		}
	},

	getSubAmountList: async (req, res) => {
		try {
			let foundRent = await rentModel.getById(req.params.id);
			if (!foundRent)
				return res.status(404).send({ message: "rent not found" });

			foundRent.details = await rentDetailModel.getByRentIdWithGerobakDetails(
				foundRent.id
			);

			// return res.send(foundRent);

			let data = [];
			for (let i = 0; i < foundRent.details.length; i++) {
				const gerobakId = foundRent.details[i].gerobak_id;
				const status = foundRent.details[i].status;

				if (status != "BERLANGSUNG") {
					data.push(foundRent.details.sub_amount);
				} else {
					const subAmount = await rentDetailModel.getSubAmount(
						foundRent.id,
						gerobakId
					);

					await rentDetailModel.setSubAmount(
						subAmount,
						foundRent.id,
						gerobakId
					);

					data.push(subAmount);
				}
			}

			return res.send({ data });
		} catch (err) {
			console.error(err);
			res.status(500).send({ err });
		}
	},

	addGerobakToRent: async (req, res) => {
		try {
			let foundRent = await rentModel.getById(req.params.id);
			if (!foundRent)
				return res.status(404).send({ message: "rent not found" });

			// foundRent.details = await rentDetailModel.getByRentIdWithGerobakDetails(
			// 	foundRent.id
			// );

			const gerobakIdList = req.body.gerobak_id_list;
			// add those gerobak

			const result = await rentModel.addDetailToRent(
				foundRent.id,
				gerobakIdList,
				req.session.user.id
			);

			return res.send(result);
		} catch (err) {
			console.error(err);
			res.status(500).send({ err });
		}
	},

	getRentPaymentHistory: async (req, res) => {
		try {
			let foundRent = await rentModel.getById(req.params.id);
			if (!foundRent)
				return res.status(404).send({ message: "rent not found" });

			const data = await rentModel.getPaymentHistory(foundRent.id);
			res.send({ data });
		} catch (e) {
			console.error(err);
			res.status(500).send({ err });
		}
	},
};
