const db = require(`../../database`).db;
const uuid = require(`uuid`);
const sqlDate = require(`js-date-to-sql-datetime`);

const tableName = `customer`;

const query = {
	SELECT_ALL: `SELECT * FROM ${tableName} WHERE deleted_at IS null ORDER BY created_at ASC LIMIT ? OFFSET ?`,
	SELECT_BY_ID: `SELECT * FROM ${tableName} WHERE id = ? LIMIT 1`,

	INSERT: `INSERT INTO ${tableName} SET ?`,
	UPDATE: `UPDATE ${tableName} SET ? WHERE id = ?`,
	DELETE: `DELETE FROM ${tableName} WHERE id = ?`,
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
		newData.id = uuid.v4();

		return new Promise((resolve, reject) => {
			db.query(query.INSERT, newData, (err) => {
				if (err) {
					console.log(err);
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
