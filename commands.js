const help = require(`./commands/help.js`);
const metronome = require(`./commands/metronome.js`);
const movelist = require(`./commands/movelist.js`);
const cc = require(`./commands/customcommands.js`);
const luna = require(`./index.js`)
let msg;

exports.command = function(channel, userstate, message) {
	msg = message.toLowerCase().split(` `);

	switch (msg[0]){
		case `!help`:
			help.chat(channel, msg, luna.printsay);
			break;
		case `!metronome`:
			metronome.move(channel, msg, luna.printsay);
			break;
		case `!pkmnmove`:
			movelist.movedata(channel, msg, luna.printsay);
			break;
		case `!customcommand`:
		case `!cc`:
			cc.edit(channel, msg, message, userstate, luna.printsay);
			break;
		default:
			cc.custom(channel, message, luna.printsay);
			break;
	}

}

exports.whisper = function(userstate, message, self) {
	msg = message.toLowerCase().split(` `);

	
	if (msg[0] === `!help`) {
		help.chat(userstate[`username`], msg, luna.printwhisper);
	} 

}
