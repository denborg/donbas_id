require('dotenv').config();
let Gamble = require('./gamble');
let members = new Map();
const DBHandler = require('./db');
const memberAccount = require('./memberAccount');
const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client();
const items = ["Observer Ward","Clarity","Smoke of Deceit","Enchanted Mango","Faerie Fire","Sentry Ward","Tome of Knowledge","Dust of Appearance","Tango","Town Portal Scroll","Healing Salve","Bottle","Iron Branch","Gauntlets of Strength","Mantle of Intelligence","Slippers of Agility","Circlet","Band of Elvenskin","Belt of Strength","Crown","Robe of the Magi","Blade of Alacrity","Ogre Axe","Staff of Wizardry","Quelling Blade","Ring of Protection","Infused Raindrops","Blight Stone","Orb of Venom","Blades of Attack","Gloves of Haste","Chainmail","Quarterstaff","Helm of Iron Will","Blitz Knuckles","Broadsword","Javelin","Claymore","Mithril Hammer","Ring of Regen","Sage's Mask","Magic Stick","Wind Lace","Cloak","Boots of Speed","Ring of Tarrasque","Gem of True Sight","Morbid Mask","Voodoo Mask","Shadow Amulet","Ghost Scepter","Blink Dagger","Ring of Health","Void Stone","Energy Booster","Vitality Booster","Point Booster","Platemail","Talisman of Evasion","Hyperstone","Ultimate Orb","Demon Edge","Mystic Staff","Eaglesong","Reaver","Sacred Relic","Magic Wand","Bracer","Null Talisman","Wraith Band","Soul Ring","Oblivion Staff","Phase Boots","Perseverance","Mask of Madness","Hand of Midas","Helm of the Dominator","Moon Shard","Buckler","Headdress","Ring of Basilius","Urn of Shadows","Tranquil Boots","Medallion of Courage","Arcane Boots","Drum of Endurance","Mekansm","Vladmir's Offering","Holy Locket","Spirit Vessel","Pipe of Insight","Guardian Greaves","Veil of Discord","Glimmer Cape","Necronomicon","Force Staff","Aether Lens","Dagon","Eul's Scepter of Divinity","Rod of Atos","Orchid Malevolence","Solar Crest","Aghanim's Scepter","Nullifier","Octarine Core","Refresher Orb","Scythe of Vyse","Hood of Defiance","Vanguard","Blade Mail","Aeon Disk","Soul Booster","Crimson Guard","Lotus Orb","Black King Bar","Hurricane Pike","Linken's Sphere","Manta Style","Shiva's Guard","Assault Cuirass","Bloodstone","Heart of Tarrasque","Crystalys","Meteor Hammer","Armlet of Mordiggian","Skull Basher","Shadow Blade","Battle Fury","Ethereal Blade","Monkey King Bar","Daedalus","Radiance","Butterfly","Divine Rapier","Silver Edge","Bloodthorn","Abyssal Blade","Dragon Lance","Kaya","Sange","Yasha","Echo Sabre","Maelstrom","Diffusal Blade","Desolator","Heaven's Halberd","Kaya and Sange","Sange and Yasha","Yasha and Kaya","Eye of Skadi","Mjollnir","Satanic","Aegis of the Immortal","Cheese","Refresher Shard","Arcane Ring","Broom Handle","Faded Broach","Iron Talon","Ironwood Tree","Keen Optic","Mango Tree","Ocean Heart","Poor Man's Shield","Royal Jelly","Trusty Shovel","Clumsy Net","Dragon Scale","Essence Ring","Grove Bow","Imp Claw","Nether Shawl","Philosopher's Stone","Pupil's Gift","Ring of Aquila","Vambrace (Agility)","Vambrace (Intelligence)","Vambrace (Strength)","Vampire Fangs","Craggy Coat","Enchanted Quiver","Greater Faerie Fire","Mind Breaker","Orb of Destruction","Paladin Sword","Quickening Charm","Repair Kit","Spider Legs","Telescope","Titan Sliver","Flicker","Havoc Hammer","Illusionist's Cape","Magic Lamp","Minotaur Horn","Ninja Gear","Prince's Knife","Spell Prism","The Leveller","Timeless Relic","Witless Shako","Apex","Ballista","Book of the Dead","Ex Machina","Fallen Sky","Force Boots","Mirror Shield","Pirate Hat","Seer Stone","Stygian Desolator","Woodland Striders","Trident"]
const TOKEN = process.env.DISCORD_TOKEN;
const prefix = "/";
const nicknames = ['Jerax','Ceb','Dj PeNiS', 'GriB', 'CCNC', 'Mind_Control', 'Dendi', 'XBOCT', 'EternalEnvy', 'Temik', 'Solek', 'rtz', 'Gorgc', 'Stabsen'];
let botChannel;
let currentDuels = new Map();
const commands = ['setbalance', 'getbalance'];
let currentStream;
let isTest = false;
let currentItem = '';
let failedTries = 0;


function build(discordMemberObject, newbalance) {
    let balance;
    balance = newbalance;
    members.set(discordMemberObject.id, new memberAccount(discordMemberObject, balance));
}

bot.login(TOKEN);

bot.on('ready', () => {
	console.info(`Logged in as ${bot.user.tag}!`);
	//get guild channels and guild
	channels = bot.guilds.cache.get('384286086282870784').channels;
	guild = bot.guilds.cache.get('384286086282870784');
	botChannel = guild.channels.cache.get('747033550221606943');
	//privateBotChannel = guild.channels.cache.get('683351946454761623');
	//create db entries for new members and fill members collection
	for (const mbr of guild.members.cache.keys()) {
		if (!guild.members.cache.get(mbr).user.bot) {
			let id = guild.members.cache.get(mbr).id;
			DBHandler.addUserToDatabase(guild.members.cache.get(mbr).id, 1000);
			DBHandler.getBalanceFromDatabas(id, build, guild.members.cache.get(mbr));
		}
	}
	gambles = new Gamble(botChannel);
});


bot.on('voiceStateUpdate', (oldstate, newstate) => {
	if (oldstate.channelID && !newstate.channelID) {
		console.log('left');
	} else if (((!oldstate.channelID && newstate.channelID) || (oldstate.channelID && newstate.channelID)) && newstate.id == 1) {
		console.log('joined');
		newstate.kick();
		console.log(newstate.id);
	}
});

function isChannelExists(channelName, listOfChannels)
{
	for (channel of listOfChannels)
	{
		if (channel[1].name == channelName)
		{
			return channel[1];
		}
	}
	return false;
}

bot.on('message', message => {

	if (message.content == 'summon dj') {
		message.channel.send(`ЭЙ, РОГАТЫЙ  ( ͡° ͜ʖ ͡°)╭∩╮ <@229632740083892226>`);
	}

	//message.member.roles.add(message.guild.roles.cache.get('748638191933849640'));
    if (message.author.bot) return;
    if (message.content.toLowerCase() == 'тест') {
        isTest = true;
        currentItem = items[Math.floor(Math.random() * items.length)];
        failedTries = 0;
        return message.channel.send("Что за предмет на фото?", {files: ["./items/" + currentItem + '.png']});
    }

    if (isTest) {
        if (message.content.toLowerCase() == currentItem.toLowerCase()) {
            isTest = false;
            failedTries = 0;
			pro_player = nicknames[Math.floor(Math.random() * nicknames.length)];
			members.get(message.author.id).increaseBalance(50);
            return message.channel.send(`Верно! Вы получили 50 донбасс-коинов.`);
        } else {
            isTest = false;
			DBHandler.setBalanceInDatabase(message.author.id, Math.floor(members.get(message.author.id).balance * 0.25));
            return message.channel.send(`Вы не смогли назвать предмет на фото. Вы потеряли 75% своих донбасс-коинов. Правильный ответ: ${currentItem}`);
        }
    }
    
    DBHandler.getBalanceFromDatabas(message.author.id, build, message.member);
	if (message.content.startsWith('duel')) {
		duel(message);
	}

	if (message.content == 'string') {
		console.log(message.member);
		console.log(JSON.stringify(message.member));
	}
	
	if (currentDuels.length > 0 && message.content.startsWith('shoot')) {
		Duel.processDuels(message);
	}

	// if (message.content == 'members') {
	// 	console.log(members);
	// }b

	if (message.content.split(' ')[0].toLowerCase() == 'getbalance') {
		let id;
		if (message.content.split(' ').length == 1) {
			id = message.author.id;
			DBHandler.getBalanceFromDatabase(id, function(balance) {
			botChannel.send(`На вашем счету ${balance} донбасс-коинов`)
					.then(message => console.log(`Sent message: ${message.content}`))
					.catch(console.error);
			});
		} else if (message.author.id == '204797248452821002' && message.content.split(' ').length == 2) {
			id = message.content.split(' ')[1];
			DBHandler.getBalanceFromDatabase(id, function(balance) {
			botChannel.send(`На счету ${message.content.split(' ')[1]} ${balance} донбасс-коинов`)
					.then(message => console.log(`Sent message: ${message.content}`))
					.catch(console.error);
			});
		}
	}



	if (message.content == 'balance') {
		id = message.author.id;
		DBHandler.getBalanceFromDatabase(id, function(balance) {
		botChannel.send(`На вашем счету ${balance} донбасс-коинов`)
				.then(message => console.log(`Sent message: ${message.content}`))
				.catch(console.error);
		});
	}

	if (message.content.split(' ')[0].toLowerCase() == 'setbalance' && message.author.id == '204797248452821002') {
		//console.log('trying to change balance');
		if (message.content.split(' ').length == 2) {
			console.log(message.content.split(' ')[2]);
			DBHandler.setBalanceInDatabase(message.author.id, message.content.split(' ')[1]);
			botChannel.send(`На вашем счету теперь ${message.content.split(' ')[1]} донбасс-коинов`)
					.then(message => console.log(`Sent message: ${message.content}`))
					.catch(console.error);
		} else if (message.content.split(' ').length == 3) {
			DBHandler.setBalanceInDatabase(message.content.split(' ')[1], message.content.split(' ')[2]);
			botChannel.send(`На счету ${message.content.split(' ')[1]} теперь ${message.content.split(' ')[2]} донбасс-коинов`)
					.then(message => console.log(`Sent message: ${message.content}`))
					.catch(console.error);
		}
	}


	if (message.content.split(' ')[0].toLowerCase() == 'coinflip') {
		pick = message.content.split(' ')[1].toLowerCase();
		bet = message.content.split(' ')[2];
		if (members.get(message.author.id).balance >= bet) {
			gambles.coinFlip(members.get(message.author.id), pick, bet);
		}
	}

	if (message.content.split(' ')[0].toLowerCase() == 'cardpick') {
		pick = message.content.split(' ')[1];
		bet = message.content.split(' ')[2];
		if (members.get(message.author.id).balance >= bet) {
			gambles.PickCard(members.get(message.author.id), pick, bet);
		}
	}

	if (message.content.split(' ')[0] == 'diceroll') {
		picks = message.content.split(' ')[1].split(',');
		bet = message.content.split(' ')[2];
		if (members.get(message.author.id).balance >= bet) {
			gambles.RollDice(members.get(message.author.id), picks, bet);
		}
	}

	if (message.content.split(' ')[0] == 'transfer' && message.content.split(' ').length == 3) {
		let target = members.get(message.content.split(' ')[1].split('!')[1].slice(0,-1));
		let value = message.content.split(' ')[2]
		members.get(message.author.id).transferPills(target, value);
		botChannel.send(`${message.member.displayName} перевёл ${target.discordMemberObject.displayName} ${value} донбасс-коинов.`)
				.then(message => console.log(`Sent message: ${message.content}`))
				.catch(console.error);
	}

	if (message.content.split(' ')[0] == 'increaseall') {
		let value = message.content.split(' ')[1];
		DBHandler.increaseAllBalances(value);
		botChannel.send(`На счёта всех мужиков было зачислено ${value} донбасс-коинов.`)
				.then(message => console.log(`Sent message: ${message.content}`))
				.catch(console.error);
	}
});


if (msg.content.startsWith('setbalance') && (msg.author.id == 229632740083892226 || msg.author.id == 204797248452821002) && msg.content.split(' ').length == 3) {
	id = msg.content.split(' ')[1];
	new_balance = msg.content.split(' ')[2];
}