const db = require(`../../database`).db;
const uuid = require(`uuid`);
const sqlDate = require(`js-date-to-sql-datetime`);
const gerobakModel = require("./gerobakModel");
const rentDetailModel = require("./rentDetailModel");

const tableName = "rent";

const query = {
	SELECT_ALL: `SELECT * FROM ${tableName} ORDER BY created_at ASC LIMIT ? OFFSET ?`,
	SELECT_BY_ID: `SELECT * FROM ${tableName} WHERE id = ? LIMIT 1`,

	INSERT: `INSERT INTO ${tableName} SET ?`,
	// UPDATE: `UPDATE ${tableName} SET ? WHERE id = ?`,
	// DELETE: `DELETE FROM ${tableName} WHERE id = ?`,
};

module.exports = {
	getAll: (limit, offset) => {
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

	getById: (id) => {
		return new Promise((resolve, reject) => {
			db.query(query.SELECT_BY_ID, id, (err, result) => {
				if (err) return reject(err);
				return resolve(result[0]);
			});
		});
	},

	create: async (newData) => {
		return new Promise(async (resolve, reject) => {
			try {
				const today = sqlDate(Date.now());
				const rentData = {
					id: uuid.v4(),
					created_at: today,
					user_id: newData.user_id,
					customer_id: newData.customer_id,
				};

				const rentedGerobakIdList = newData.gerobak_list;
				for (let id of rentedGerobakIdList) {
					if ((await gerobakModel.getGerobakStatus(id)) != "ADA")
						return reject(
							"invalid gerobak list (probably trying to rent rented one(s)?)"
						);
				}

				let rentDetail = {
					rent_id: rentData.id,
					start_time: today,
					created_at: today,
				};

				db.beginTransaction();
				db.query(query.INSERT, rentData);
				for (let id of rentedGerobakIdList) {
					gerobakModel.updateStatus("DISEWA", id);
					rentDetail.gerobak_id = id;
					rentDetail.sub_amount = await gerobakModel.getGerobakCharge(id);
					rentDetailModel.create(rentDetail);
				}
				db.commit();
				resolve(true);
			} catch (e) {
				return reject(e);
			}
		});
	},

	update: (newData) => {
		newData.updated_at = sqlDate(Date.now());
		return new Promise((resolve, reject) => {
			db.query(query.UPDATE, [newData, newData.id], (err) => {
				if (err) {
					console.log(err);
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
						console.log(err);
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
					console.log(err);
					return reject(err);
				}
				return resolve(true);
			});
		});
	},
};
