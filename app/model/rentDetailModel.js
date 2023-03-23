const db = require(`../../database`).db;
const sqlDate = require(`js-date-to-sql-datetime`);
const moment = require("moment");
const gerobakModel = require("./gerobakModel");

const tableName = "rent_detail";

const query = {
	// TODO: remove unneeded sqls
	// SELECT_ALL: `SELECT * FROM ${tableName} WHERE deleted_at IS null ORDER BY created_at ASC LIMIT ? OFFSET ?`,
	SELECT_BY_RENT_ID: `SELECT * FROM ${tableName} WHERE rent_id = ?`,
	SELECT_BY_RENT_ID_AND_GEROBAK_ID: `SELECT * FROM ${tableName} WHERE rent_id = ? AND gerobak_id = ?`,
	SELECT_BY_RENT_ID_WITH_GEROBAK_DETAILS: `SELECT g.*, rd.* FROM ${tableName} rd inner join gerobak g on rd.gerobak_id = g.id WHERE rd.rent_id = ?`,

	GET_GEROBAK_LIST_BY_RENT_ID: `SELECT gerobak_id FROM ${tableName} WHERE rent_id = ?`,

	GET_UNPAID_GEROBAK_LIST_BY_RENT_ID: `SELECT gerobak_id FROM ${tableName} WHERE rent_id = ? AND status != "OK"`,

	// GET_GEROBAK_LIST_BY_RENT_ID_AND_STATUS: `SELECT gerobak_id FROM ${tableName} WHERE rent_id = ? AND status = ?`,

	SET_ALL_DETAIL_STATUS_BY_RENT_ID: `UPDATE ${tableName} SET status = ? WHERE rent_id = ?`,
	SET_DETAIL_STATUS_BY_RENT_ID_AND_GEROBAK_ID: `UPDATE ${tableName} SET status = ? WHERE rent_id = ? AND gerobak_id = ?`,

	SET_ALL_END_TIME_BY_RENT_ID: `UPDATE ${tableName} SET end_time = ? WHERE rent_id = ?`,
	SET_END_TIME_BY_RENT_ID_AND_GEROBAK_ID: `UPDATE ${tableName} SET end_time = ? WHERE rent_id = ? AND gerobak_id = ?`,

	SET_SUB_AMOUNT_BY_RENT_ID_AND_GEROBAK_ID: `UPDATE ${tableName} SET sub_amount = ? WHERE rent_id = ? AND gerobak_id = ?`,

	INSERT: `INSERT INTO ${tableName} SET ?`,
	// UPDATE: `UPDATE ${tableName} SET ? WHERE id = ?`,
	// DELETE: `DELETE FROM ${tableName} WHERE id = ?`,
};

module.exports = {
	// getAll: (limit, offset) => {
	// 	return new Promise((resolve, reject) => {
	// 		db.query(
	// 			query.SELECT_ALL,
	// 			[parseInt(limit), parseInt(offset)],
	// 			(err, result) => {
	// 				if (err) return reject(err);
	// 				return resolve(result);
	// 			}
	// 		);
	// 	});
	// },

	getByRentId: (id) => {
		return new Promise((resolve, reject) => {
			db.query(query.SELECT_BY_RENT_ID, id, (err, result) => {
				if (err) return reject(err);
				return resolve(result);
			});
		});
	},

	getByRentIdWithGerobakDetails: (id) => {
		return new Promise((resolve, reject) => {
			db.query(
				query.SELECT_BY_RENT_ID_WITH_GEROBAK_DETAILS,
				id,
				(err, result) => {
					if (err) return reject(err);
					return resolve(result);
				}
			);
		});
	},

	getByRentIdAndGerobakId: (rentId, gerobakId) => {
		return new Promise((resolve, reject) => {
			db.query(
				query.SELECT_BY_RENT_ID_AND_GEROBAK_ID,
				[rentId, gerobakId],
				(err, result) => {
					if (err) return reject(err);
					return resolve(result[0]);
				}
			);
		});
	},

	create: (newData) => {
		return new Promise((resolve, reject) => {
			db.query(query.INSERT, newData, (err) => {
				if (err) {
					console.error(err);
					return reject(err);
				}
				return resolve(true);
			});
		});
	},

	update: (newData) => {
		newData.updated_at = sqlDate(Date.now());
		return new Promise((resolve, reject) => {
			db.query(query.UPDATE, [newData, newData.id], (err) => {
				if (err) {
					console.error(err);
					return reject(err);
				}
				return resolve(true);
			});
		});
	},

	delete: (id) => {
		return new Promise((resolve, reject) => {
			db.query(
				query.UPDATE,
				[{ deleted_at: sqlDate(Date.now()) }, id],
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

	permanentDelete: (id) => {
		return new Promise((resolve, reject) => {
			db.query(query.DELETE, id, (err) => {
				if (err) {
					console.error(err);
					return reject(err);
				}
				return resolve(true);
			});
		});
	},

	getGerobakListByRentId: (id, status) => {
		let sql = query.GET_GEROBAK_LIST_BY_RENT_ID;
		if (status) sql += ` AND status = "${status}"`;

		return new Promise((resolve, reject) => {
			db.query(sql, id, (err, result) => {
				if (err) {
					console.error(err);
					return reject(err);
				}
				const gerobakIdList = result.map((rentDetail) => rentDetail.gerobak_id);
				return resolve(gerobakIdList);
			});
		});
	},

	getUnpaidGerobakListByRentId: (id) => {
		return new Promise((resolve, reject) => {
			db.query(query.GET_UNPAID_GEROBAK_LIST_BY_RENT_ID, id, (err, result) => {
				if (err) {
					console.error(err);
					return reject(err);
				}
				const gerobakIdList = result.map((rentDetail) => rentDetail.gerobak_id);
				return resolve(gerobakIdList);
			});
		});
	},

	updateAllDetailStatus: (status, rentId) => {
		return new Promise((resolve, reject) => {
			db.query(
				query.SET_ALL_DETAIL_STATUS_BY_RENT_ID,
				[status, rentId],
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

	updateDetailStatus: (status, rentId, gerobakId) => {
		return new Promise((resolve, reject) => {
			db.query(
				query.SET_DETAIL_STATUS_BY_RENT_ID_AND_GEROBAK_ID,
				[status, rentId, gerobakId],
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

	setAllEndTime: (endTime, rentId) => {
		return new Promise((resolve, reject) => {
			db.query(query.SET_ALL_END_TIME_BY_RENT_ID, [endTime, rentId], (err) => {
				if (err) {
					console.error(err);
					return reject(err);
				}
				return resolve(true);
			});
		});
	},

	setEndTime: (endTime, rentId, gerobakId) => {
		return new Promise((resolve, reject) => {
			db.query(
				query.SET_END_TIME_BY_RENT_ID_AND_GEROBAK_ID,
				[endTime, rentId, gerobakId],
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

	setSubAmount: (subAmount, rentId, gerobakId) => {
		return new Promise((resolve, reject) => {
			db.query(
				query.SET_SUB_AMOUNT_BY_RENT_ID_AND_GEROBAK_ID,
				[subAmount, rentId, gerobakId],
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

	getHoursDiff: (rentId, gerobakId, compareToTime) => {
		return new Promise((resolve, reject) => {
			db.query(
				query.SELECT_BY_RENT_ID_AND_GEROBAK_ID,
				[rentId, gerobakId],
				(err, result) => {
					if (err) {
						console.error(err);
						return reject(err);
					}

					compareToTime = moment(compareToTime ?? sqlDate(Date.now()));
					const startTime = moment(result[0].start_time);
					console.log(result[0].start_time);
					console.log(compareToTime.diff(startTime, "hours"));
					return resolve(compareToTime.diff(startTime, "hours"));
				}
			);
		});
	},

	getSubAmount: async (rentId, gerobakId) => {
		const { charge, hourBase } = await gerobakModel.getGerobakCharge(gerobakId);
		let hoursDifference = await module.exports.getHoursDiff(rentId, gerobakId);

		let subAmount = charge;
		hoursDifference -= hourBase;

		while (hoursDifference > hourBase) {
			subAmount += charge;
			hoursDifference -= hourBase;
		}

		const halfHourBase = hourBase / 2;

		if (hoursDifference > halfHourBase) subAmount += charge;
		else if (hoursDifference > 0)
			subAmount += (hoursDifference / hourBase) * charge;

		const resultSubAmount = Math.floor(subAmount / 1000) * 1000;
		module.exports.setSubAmount(resultSubAmount, rentId, gerobakId);
		return resultSubAmount;
	},
};
