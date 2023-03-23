const db = require("../../database").db;
const uuid = require("uuid");
const sqlDate = require("js-date-to-sql-datetime");
const gerobakTypeModel = require("./gerobakTypeModel");

const tableName = `gerobak`;
const viewName = "gerobak_view";

const query = {
	SELECT_ALL: `SELECT * FROM ${tableName} WHERE deleted_at IS null ORDER BY created_at ASC LIMIT ? OFFSET ?`,
	SELECT_ALL_NO_PAGINATION: `SELECT * FROM ${tableName} WHERE deleted_at IS null ORDER BY created_at ASC `,
	SELECT_BY_ID: `SELECT * FROM ${tableName} WHERE id = ? LIMIT 1`,

	SELECT_VIEW: `SELECT g.*, gt.name AS 'type_name', gt.hour_base, gt.charge FROM ${tableName} g INNER JOIN gerobak_type gt ON g.type_id = gt.id WHERE g.deleted_at IS null ORDER BY created_at ASC`,

	INSERT: `INSERT INTO ${tableName} SET ?`,
	UPDATE: `UPDATE ${tableName} SET ? WHERE id = ?`,
	DELETE: `DELETE FROM ${tableName} WHERE id = ?`,

	GET_GEROBAK_STATUS: `SELECT status FROM ${tableName} WHERE id = ? LIMIT 1`,
	GET_GEROBAK_CODE: `SELECT code FROM ${tableName} WHERE id = ? LIMIT 1`,
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

	getView: (limit, offset) => {
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

	getAllNoPagination: () => {
		return new Promise((resolve, reject) => {
			db.query(query.SELECT_ALL_NO_PAGINATION, (err, result) => {
				if (err) return reject(err);
				return resolve(result);
			});
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

	getCodeById: (id) => {
		return new Promise((resolve, reject) => {
			db.query(query.GET_GEROBAK_CODE, id, (err, result) => {
				if (err) return reject(err);
				return resolve(result[0]);
			});
		});
	},

	create: (newData) => {
		return new Promise(async (resolve, reject) => {
			try {
				newData.id = uuid.v4();
				newData.code = await gerobakTypeModel.getNextCode(newData.type_id);

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

	update: (newData) => {
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
					console.error(err);
					return reject(err);
				}
				return resolve(true);
			});
		});
	},

	updateStatus: (newStatus, id) => {
		return new Promise((resolve, reject) => {
			db.query(query.UPDATE_STATUS, [newStatus, id], (err) => {
				if (err) {
					console.error(err);
					return reject(err);
				}
				return resolve(true);
			});
		});
	},

	/* 
		getGerobakCharge()
		returns charge, hour_base
	*/
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
