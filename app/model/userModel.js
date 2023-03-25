const db = require(`../../database`).db;
const uuid = require(`uuid`);
const sha1 = require(`sha1`);
const sqlDate = require(`js-date-to-sql-datetime`);

const tableName = `user`;

const query = {
	SELECT_ALL: `SELECT * FROM ${tableName} WHERE deleted_at IS null ORDER BY created_at ASC`,
	SELECT_ALL_PAGINATED: `SELECT * FROM ${tableName} WHERE deleted_at IS null ORDER BY created_at ASC LIMIT ? OFFSET ?`,
	SELECT_BY_ID: `SELECT * FROM ${tableName} WHERE id = ? LIMIT 1`,
	SELECT_BY_CREDENTIALS: `SELECT * FROM ${tableName} WHERE username = ? AND password = ? LIMIT 1`,
	SELECT_USERNAME: `SELECT username FROM ${tableName} WHERE username = ? LIMIT 1`,

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

	getAllPaginated: (limit, offset) => {
		return new Promise((resolve, reject) => {
			db.query(
				query.SELECT_ALL_PAGINATED,
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
		newData.id = newData.id ?? uuid.v4();
		newData.password = sha1(newData.password);
		newData.access = newData.access ?? "user";

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

	getByCredentials: (credentials) => {
		return new Promise((resolve, reject) => {
			db.query(
				query.SELECT_BY_CREDENTIALS,
				[credentials.username, sha1(credentials.password)],
				(err, result) => {
					if (err) {
						console.error(err);
						return reject(err);
					}
					return resolve(result[0]);
				}
			);
		});
	},

	isAvailableUsername: (username) => {
		return new Promise((resolve, reject) => {
			db.query(query.SELECT_USERNAME, username, (err, result) => {
				if (err) return reject(err);

				if (result.length > 0) return resolve(false);
				return resolve(true);
			});
		});
	},
};
