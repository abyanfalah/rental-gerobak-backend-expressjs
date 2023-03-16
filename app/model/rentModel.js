const db = require(`../../database`).db;
const uuid = require(`uuid`);
const sqlDate = require(`js-date-to-sql-datetime`);
const gerobakModel = require("./gerobakModel");
const rentDetailModel = require("./rentDetailModel");

const tableName = "rent";
const tableUser = "user";
const tableCustomer = "customer";
const rentDetail = "rent_detail";

const query = {
	SELECT_ALL: `SELECT * FROM ${tableName} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
	SELECT_VIEW: `SELECT r.*, u.name as 'user', c.name as 'customer' FROM ${tableName} r inner join ${tableUser} u on r.user_id = u.id inner join ${tableCustomer} c on r.customer_id = c.id ORDER BY created_at DESC LIMIT ? OFFSET ?`,

	SELECT_TODAY_RENT_VIEW: `SELECT r.*, u.name as 'user', c.name as 'customer' FROM ${tableName} r inner join ${tableUser} u on r.user_id = u.id inner join ${tableCustomer} c on r.customer_id = c.id WHERE date(r.created_at) = CURRENT_DATE() ORDER BY created_at DESC`,

	SELECT_VIEW_BY_RENT_ID: `SELECT r.*, u.name as 'user', c.name as 'customer' FROM ${tableName} r inner join ${tableUser} u on r.user_id = u.id inner join ${tableCustomer} c on r.customer_id = c.id WHERE r.id = ?`,

	SELECT_ALL_BY_STATUS: `SELECT r.*, u.name as 'user', c.name as 'customer' FROM ${tableName} r inner join ${tableUser} u on r.user_id = u.id inner join ${tableCustomer} c on r.customer_id = c.id WHERE r.status LIKE ? ORDER BY r.created_at DESC LIMIT ? OFFSET ?`,

	SELECT_PAYMENT_HISTORY_BY_RENT_ID: `select rd.user_id, u.name, rd.end_time as time, sum(rd.sub_amount) as sub_amount from rent_detail rd inner join user u on rd.user_id = u.id where rent_id = ? AND end_time is not null group by end_time, user_id;`,

	SELECT_BY_ID: `SELECT * FROM ${tableName} WHERE id = ? LIMIT 1`,

	INSERT: `INSERT INTO ${tableName} SET ?`,
	UPDATE: `UPDATE ${tableName} SET ? WHERE id = ?`,
};

module.exports = {
	getAll: (limit, offset) => {
		limit = limit ?? 10;
		offset = offset ?? 0;
		return new Promise((resolve, reject) => {
			db.query(
				query.SELECT_ALL,
				[parseInt(limit), parseInt(offset)],
				(err, result) => {
					if (err) return reject(err);
					return resolve(result);
				}
			);
		});
	},

	getView: (limit, offset) => {
		limit = limit ?? 10;
		offset = offset ?? 0;
		return new Promise((resolve, reject) => {
			db.query(
				query.SELECT_VIEW,
				[parseInt(limit), parseInt(offset)],
				(err, result) => {
					if (err) return reject(err);
					return resolve(result);
				}
			);
		});
	},

	getViewById: (rentId) => {
		return new Promise((resolve, reject) => {
			db.query(query.SELECT_VIEW_BY_RENT_ID, rentId, (err, result) => {
				if (err) return reject(err);
				return resolve(result);
			});
		});
	},

	getAllByStatus: (status, limit, offset) => {
		return new Promise((resolve, reject) => {
			db.query(
				query.SELECT_ALL_BY_STATUS,
				[status, parseInt(limit), parseInt(offset)],
				(err, result) => {
					if (err) return reject(err);
					return resolve(result);
				}
			);
		});
	},

	getTodayRentView: () => {
		return new Promise((resolve, reject) => {
			db.query(
				query.SELECT_TODAY_RENT_VIEW,
				// [parseInt(limit), parseInt(offset)],
				(err, result) => {
					if (err) return reject(err);
					return resolve(result);
				}
			);
		});
	},

	getById: (id) => {
		return new Promise((resolve, reject) => {
			db.query(query.SELECT_BY_ID, id, (err, result) => {
				if (err) return reject(err);
				return resolve(result[0]);
			});
		});
	},

	create: (newData) => {
		return new Promise(async (resolve, reject) => {
			try {
				const currentTime = sqlDate(Date.now());
				const rentData = {
					id: uuid.v4(),
					created_at: currentTime,
					user_id: newData.user_id,
					customer_id: newData.customer_id,
					location: newData.location,
					note: newData.note,
				};

				const rentedGerobakIdList = newData.gerobak_list;

				let rentDetail = {
					rent_id: rentData.id,
					start_time: currentTime,
					created_at: currentTime,
					user_id: rentData.user_id,
				};

				db.beginTransaction();
				db.query(query.INSERT, rentData);
				for (let id of rentedGerobakIdList) {
					await gerobakModel.updateStatus("DISEWA", id);
					rentDetail.gerobak_id = id;
					rentDetail.sub_amount = (
						await gerobakModel.getGerobakCharge(id)
					).charge;
					await rentDetailModel.create(rentDetail);
				}
				db.commit();
				resolve(true);
			} catch (e) {
				return reject(e);
			}
		});
	},

	addDetailToRent: (rentId, gerobakIdList, userId) => {
		return new Promise(async (resolve, reject) => {
			try {
				const currentTime = sqlDate(Date.now());

				let rentDetail = {
					rent_id: rentId,
					start_time: currentTime,
					created_at: currentTime,
					user_id: userId,
				};

				db.beginTransaction();
				for (let id of gerobakIdList) {
					await gerobakModel.updateStatus("DISEWA", id);
					rentDetail.gerobak_id = id;
					rentDetail.sub_amount = (
						await gerobakModel.getGerobakCharge(id)
					).charge;
					await rentDetailModel.create(rentDetail);
				}
				db.commit();
				resolve(true);
			} catch (e) {
				return reject(e);
			}
		});
	},

	setLastPayment: (paymentDateTime, rentId) => {
		return new Promise((resolve, reject) => {
			db.query(
				query.UPDATE,
				[
					{ last_payment_at: paymentDateTime ?? sqlDate(new Date.now()) },
					rentId,
				],
				(err) => {
					if (err) {
						console.error(err);
						return reject(err);
					}
					return resolve(true);
				}
			);
		});
	},

	// update: (newData) => {
	// 	newData.updated_at = sqlDate(Date.now());
	// 	return new Promise((resolve, reject) => {
	// 		db.query(query.UPDATE, [newData, newData.id], (err) => {
	// 			if (err) {
	// 				console.error(err);
	// 				return reject(err);
	// 			}
	// 			return resolve(true);
	// 		});
	// 	});
	// },

	// delete: (id) => {
	// 	return new Promise((resolve, reject) => {
	// 		db.query(
	// 			query.UPDATE,
	// 			[{ deleted_at: sqlDate(Date.now()) }, id],
	// 			(err) => {
	// 				if (err) {
	// 					console.error(err);
	// 					return reject(err);
	// 				}
	// 				return resolve(true);
	// 			}
	// 		);
	// 	});
	// },

	// permanentDelete: (id) => {
	// 	return new Promise((resolve, reject) => {
	// 		db.query(query.DELETE, id, (err) => {
	// 			if (err) {
	// 				console.error(err);
	// 				return reject(err);
	// 			}
	// 			return resolve(true);
	// 		});
	// 	});
	// },

	payAllDetail: (id, userId) => {
		return new Promise(async (resolve, reject) => {
			try {
				const unpaidGerobakIdList =
					await rentDetailModel.getUnpaidGerobakListByRentId(id);

				db.beginTransaction();

				for (let gerobakId of unpaidGerobakIdList) {
					await gerobakModel.updateStatus("ADA", gerobakId);
				}

				const currentDateTime = sqlDate(Date.now());

				await rentDetailModel.updateAllDetailStatus("OK", id);
				await rentDetailModel.setAllEndTime(currentDateTime, id);
				await module.exports.setLastPayment(currentDateTime, id);

				db.query(query.UPDATE, [{ status: "OK" }, id]);
				db.commit();

				return resolve();
			} catch (e) {
				console.error(e);
				return reject(e);
			}
		});
	},

	payPartialDetail: (id, gerobakIdList, userId) => {
		return new Promise(async (resolve, reject) => {
			try {
				const currentDateTime = sqlDate(Date.now());
				db.beginTransaction();
				for (let gerobakId of gerobakIdList) {
					await gerobakModel.updateStatus("ADA", gerobakId);
					await rentDetailModel.updateDetailStatus("OK", id, gerobakId);
					await rentDetailModel.setEndTime(currentDateTime, id, gerobakId);

					const subAmount = await getRentDetailSubAmount(id, gerobakId);
					await rentDetailModel.setSubAmount(subAmount, id, gerobakId);
				}

				await module.exports.setLastPayment(currentDateTime, id);
				return resolve();
			} catch (e) {
				console.error(e);
				return reject(e);
			}
		});
	},

	getTotalToPay: (rentId) => {
		return new Promise(async (resolve, reject) => {
			try {
				let totalUnpaid = 0;
				const unpaidGerobakList =
					await rentDetailModel.getUnpaidGerobakListByRentId(rentId);

				for (const gerobakId of unpaidGerobakList) {
					totalUnpaid += await rentDetailModel.getSubAmount(rentId, gerobakId);
				}
				return resolve(totalUnpaid);
			} catch (e) {
				console.error(e);
				return reject(e);
			}
		});
	},

	getPaymentHistory: (rentId) => {
		return new Promise((resolve, reject) => {
			db.query(
				query.SELECT_PAYMENT_HISTORY_BY_RENT_ID,
				rentId,
				(err, result) => {
					if (err) return reject(err);
					return resolve(result);
				}
			);
		});
	},
};
