let sqlite3 = require('sqlite3').verbose();


class DBHandler {
	static getBalanceFromDatabas(id, callback, discordMemberObject) {
		let balance;
		let db = new sqlite3.Database('database.db');
		db.serialize(function () {
			db.each('SELECT * FROM members WHERE id = ' + id.toString(), function(err, row) {
				return callback(discordMemberObject, row.balance);
			});
		});
		db.close();
	}

	static getBalanceFromDatabase(id, callback) {
		let balance;
		let db = new sqlite3.Database('database.db');
		db.serialize(function () {
			db.each('SELECT * FROM members WHERE id = ' + id.toString(), function(err, row) {
				return callback(row.balance);
			});
		});
		db.close();
	}

	static increaseBalanceInDatabase(id, value) {
		let db = new sqlite3.Database('database.db');
		db.serialize(function () {
			db.run('UPDATE members SET balance = balance + ' + value.toString() + ' WHERE id = ' + id.toString());
		});
		db.close();
	}

	static increaseAllBalances(value) {
		let db = new sqlite3.Database('database.db');
		db.serialize(function () {
			db.run('UPDATE members SET balance = balance + ' + value.toString());
		});
		db.close();
	}

	static decreaseBalanceInDatabase(id, value) {
		let db = new sqlite3.Database('database.db');
		let result;
		db.serialize(function () {
			db.run('UPDATE members SET balance = balance - ' + value.toString() + ' WHERE id = ' + id.toString() + ' AND  balance - ' + value.toString() + ' >= 0 ', function(err, row) {
				result = this.changes;
			});
		});
		db.close();
		if (result > 0) {
			return 'ok';
		} else {
			return 'fail';
		}
	}

	static setBalanceInDatabase(id, value) {
		let db = new sqlite3.Database('database.db');
		db.serialize(function () {
			db.run('UPDATE members SET balance = '+ value.toString() + ' WHERE id = ' + id.toString());
		});
		db.close();
	}

	static addUserToDatabase(id, balance) {
		let db = new sqlite3.Database('database.db');
		db.serialize(function () {
			db.run(`INSERT INTO members
					SELECT ${id}, ${balance} 
					WHERE NOT EXISTS
					(SELECT * FROM members WHERE id = ${id});`);
		});
		db.close();
	}
}

module.exports = DBHandler;