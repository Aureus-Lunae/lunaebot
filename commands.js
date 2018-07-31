const connect = require('./index.js');
const help = require("./commands/help.js");
const metronome = require("./commands/metronome.js");
const movelist = require("./commands/movelist.js");
const cc = require("./commands/customcommands.js");

exports.command = function(channel, userstate, message, self) {
	var msg = message.toLowerCase().split(" ");

	switch (msg[0]){
		case '!help':
			help.chat(channel, msg, connect.printsay);
			break;
		case '!metronome':
			metronome.move(channel, msg, connect.printsay);
			break;
		case '!pkmnmove':
			movelist.movedata(channel, msg, connect.printsay);
			break;
		case '!customcommand':
			cc.edit(channel, msg, message, connect.printsay);
			break;
		case '!cc':
			cc.edit(channel, msg, message, userstate, connect.printsay);
			break;
		default:
			cc.custom(channel, message, connect.printsay);
			break;
	}

}

exports.whisper = function(userstate, message, self) {
	var msg = message.toLowerCase().split(" ");

	
	if (msg[0] === '!help') {
		help.chat(userstate['username'], msg, connect.printwhisper);
	} 

}
