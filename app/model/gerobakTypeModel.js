const db = require("../../database").db;
const uuid = require("uuid");
const sha1 = require("sha1");
const sqlDate = require("js-date-to-sql-datetime");

const tableName = `gerobak_type`;

const query = {
	SELECT_ALL: `SELECT * FROM ${tableName} WHERE deleted_at IS null ORDER BY created_at ASC LIMIT ? OFFSET ?`,
	SELECT_BY_ID: `SELECT * FROM ${tableName} WHERE id = ? LIMIT 1`,
	GET_NEXT_CODE_BY_ID: `SELECT CONCAT(code,"-", count + 1) as next_code FROM ${tableName} WHERE id = ? LIMIT 1`,

	INSERT: `INSERT INTO ${tableName} SET ?`,
	UPDATE: `UPDATE ${tableName} SET ? WHERE id = ?`,
	DELETE: `DELETE FROM ${tableName} WHERE id = ?`,

	INCREMENT_COUNT: `UPDATE ${tableName} SET count = count + 1 WHERE id = ?`,
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

	create: (newData) => {
		return new Promise((resolve, reject) => {
			db.query(query.INSERT, newData, (err) => {
				if (err) return reject(err);
				return resolve();
			});
		});
	},

	update: (newData) => {
		newData.updated_at = sqlDate(Date.now());
		console.log(newData);
		return new Promise((resolve, reject) => {
			db.query(query.UPDATE, [newData, newData.id], (err) => {
				if (err) return reject(err);
				return resolve();
			});
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

	getNextCode: (id) => {
		return new Promise((resolve, reject) => {
			db.query(query.GET_NEXT_CODE_BY_ID, id, (err, result) => {
				if (err) {
					console.log(err);
					return reject(err);
				}
				return resolve(result[0].next_code);
			});
		});
	},

	incrementCount: (id) => {
		return new Promise((resolve, reject) => {
			db.query(query.INCREMENT_COUNT, id, (err) => {
				if (err) {
					console.log(err);
					return reject(err);
				}
				return resolve();
			});
		});
	},
};
