let DBHandler = require('./db');


class memberAccount {
	constructor(discordMemberObject, balance) {
		this.discordMemberObject = discordMemberObject;
		this.balance = balance;
	}

	decreaseBalance(value) {
		DBHandler.decreaseBalanceInDatabase(this.discordMemberObject.id, value);
	}
	
	increaseBalance(value) {
		DBHandler.increaseBalanceInDatabase(this.discordMemberObject.id, value);
	}

	setBalance(value) {
		DBHandler.setBalanceInDatabase(this.discordMemberObject.id, value);
	}

	getBalance() {
		DBHandler.getBalanceFromDatabase(this.discordMemberObject.id);
	}

	//DMO is discordMemberObject
	transferPills(targetAccount, value) {
		DBHandler.decreaseBalanceInDatabase(this.discordMemberObject.id, value);
		DBHandler.increaseBalanceInDatabase(targetAccount.discordMemberObject.id, value);
	}
}

module.exports = memberAccount;