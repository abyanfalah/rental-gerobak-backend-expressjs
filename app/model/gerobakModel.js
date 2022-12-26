const db = require("../../database").db;
const uuid = require("uuid");
const sqlDate = require("js-date-to-sql-datetime");
const gerobakTypeModel = require("./gerobakTypeModel");

const tableName = `gerobak`;

const query = {
	SELECT_ALL: `SELECT * FROM ${tableName} WHERE deleted_at IS null ORDER BY created_at ASC LIMIT ? OFFSET ?`,
	SELECT_BY_ID: `SELECT * FROM ${tableName} WHERE id = ? LIMIT 1`,

	INSERT: `INSERT INTO ${tableName} SET ?`,
	UPDATE: `UPDATE ${tableName} SET ? WHERE id = ?`,
	DELETE: `DELETE FROM ${tableName} WHERE id = ?`,

	GET_GEROBAK_STATUS: `SELECT status FROM ${tableName} WHERE id = ? LIMIT 1`,
	UPDATE_STATUS: `UPDATE ${tableName} SET status = ? WHERE id = ?`,

	GET_GEROBAK_CHARGE: `SELECT t.charge, t.hour_base as hourBase FROM gerobak_type t INNER JOIN gerobak g ON g.type_id = t.id WHERE g.id = ? LIMIT 1;
`,
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
		return new Promise((resolve, reject) => {
			try {
				newData.id = uuid.v4();
				newData.code = gerobakTypeModel.getNextCode(newData.type_id);

				db.beginTransaction();
				db.query(query.INSERT, newData);
				gerobakTypeModel.incrementCount(newData.type_id);
				db.commit();
				return resolve();
			} catch (e) {
				return reject(e);
			}
		});
	},

	update: async (newData) => {
		return new Promise((resolve, reject) => {
			try {
				db.beginTransaction();
				db.query(query.UPDATE, [newData, newData.id]);
				gerobakTypeModel.incrementCount(newData.type_id);
				db.commit();
				return resolve();
			} catch (e) {
				return reject(e);
			}
		});
	},

	delete: (id) => {
		return new Promise((resolve, reject) => {
			db.query(
				query.UPDATE,
				[{ deleted_at: sqlDate(Date.now()) }, id],
				(err) => {
					if (err) return reject(err);
					return resolve();
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

	updateStatus: async (newStatus, id) => {
		return new Promise((resolve, reject) => {
			db.query(query.UPDATE_STATUS, [newStatus, id], (err) => {
				if (err) {
					console.log(err);
					return reject(err);
				}
				return resolve(true);
			});
		});
	},

	getGerobakCharge: (id) => {
		return new Promise((resolve, reject) => {
			db.query(query.GET_GEROBAK_CHARGE, id, (err, result) => {
				if (err) return reject(err);
				return resolve(result[0]);
			});
		});
	},

	getGerobakStatus: (id) => {
		return new Promise((resolve, reject) => {
			db.query(query.GET_GEROBAK_STATUS, id, (err, result) => {
				if (err) return reject(err);
				return resolve(result[0].status);
			});
		});
	},
};
