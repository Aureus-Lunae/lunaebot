const connect = require('./index.js');
const help = require("./commands/help.js");
const metronome = require("./commands/metronome.js");
const movelist = require("./commands/movelist.js");

exports.command = function(channel, userstate, message, self) {
	var msg = message.toLowerCase().split(" ");


	if (msg[0] === '!help') {
		help.chat(channel, msg, connect.printsay);
	} 

	if (msg[0] === '!metronome') {
		metronome.move(channel, msg, connect.printsay);
	}
	if (msg[0] === '!pkmnmove') {
		movelist.movedata(channel, msg, connect.printsay);
	} 
}

exports.whisper = function(userstate, message, self) {
	var msg = message.toLowerCase().split(" ");

	
	if (msg[0] === '!help') {
		help.chat(userstate['username'], msg, connect.printwhisper);
	} 

}
