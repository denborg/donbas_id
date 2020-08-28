class Gamble {
	constructor(channel) {
		this.channel = channel;
	}

	#coinSides = ['heads','tails'];
	coinFlip(memberAccount, pick, bet) {
		memberAccount.decreaseBalance(bet);
		let flip = Math.floor(Math.random() * 2);
		if (this.#coinSides[flip] == pick) {
			memberAccount.increaseBalance(bet*2);
			this.channel.send(`${memberAccount.discordMemberObject.displayName} побеждает в игре 'Coin Flip'. Ему начислено ${bet*2} донбасс-коинов.`)
				.then(message => console.log(`Sent message: ${message.content}`))
				.catch(console.error);
		} else {
			this.channel.send(`${memberAccount.discordMemberObject.displayName} проиграл ${bet} донбасс-коинов в игре 'Coin Flip'.`)
				.then(message => console.log(`Sent message: ${message.content}`))
				.catch(console.error);
		}
	}
	
	RollDice(memberAccount, picks, bet) {
		memberAccount.decreaseBalance(bet);
		let multiplier = 4 / picks.length;
		let roll = Math.floor(Math.random() * 7).toString();
		if (picks.includes(roll)) {
			memberAccount.increaseBalance(Math.floor(bet * multiplier) + 1);
			this.channel.send(`${memberAccount.discordMemberObject.displayName} побеждает в игре 'Roll a dice'. Ему начислено ${Math.floor((bet * multiplier) + 1)} донбасс-коинов.`)
				.then(message => console.log(`Sent message: ${message.content}`))
				.catch(console.error);
		} else {
			this.channel.send(`${memberAccount.discordMemberObject.displayName} проиграл ${bet} донбасс-коинов в игре 'Roll a dice'.`)
				.then(message => console.log(`Sent message: ${message.content}`))
				.catch(console.error);
		}
	}

	PickCard(memberAccount, pick, bet) {
		memberAccount.decreaseBalance(bet);
		let doubleCard = Math.floor(Math.random() * 6);
		let oneAndAHalfCard = -1;
		while (oneAndAHalfCard == -1 || oneAndAHalfCard == doubleCard) {
			oneAndAHalfCard = Math.floor(Math.random() * 6);
		}
		if (pick == doubleCard) {
			memberAccount.increaseBalance(bet * 2);
			this.channel.send(`${memberAccount.discordMemberObject.displayName} побеждает в игре 'Pick a card'. Ему начислено ${bet * 2} донбасс-коинов.`)
				.then(message => console.log(`Sent message: ${message.content}`))
				.catch(console.error);
		}
		if (pick == oneAndAHalfCard) {
			memberAccount.increaseBalance(Math.floor(bet * 1.5) + 1);
			this.channel.send(`${memberAccount.discordMemberObject.displayName} побеждает в игре 'Pick a card'. Ему начислено ${Math.floor(bet * 1.5) + 1} донбасс-коинов.`)
				.then(message => console.log(`Sent message: ${message.content}`))
				.catch(console.error);
		}

		if (pick != doubleCard && pick != oneAndAHalfCard) {
			this.channel.send(`${memberAccount.discordMemberObject.displayName} проиграл ${bet} донбасс-коинов в игре 'Pick a card'.`)
				.then(message => console.log(`Sent message: ${message.content}`))
				.catch(console.error);
		}
	}
}

module.exports = Gamble;