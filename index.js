const tmi = require('tmi.js');
const options = require('./config.js');
const commands = require('./commands.js');
const luna = new tmi.client(options);
module.exports.luna = luna;

//Connect to twitch server


luna.connect();

luna.on('connected', function(adress, port) {
	console.log( 'Address: ' + adress + '; Port: ' + port);
	luna.say('#Aureus_Lunae', "Lunaebot has connected");
});

exports.printsay = function (channel, result) {
	luna.say(channel, result);
}

exports.printwhisper = function (user, result) {
	luna.whisper(user, result);
}

luna.on("chat", function(channel, userstate, message, self) {
	if (self) return;
	if (message.charAt(0) === "!")
	{
		commands.command(channel, userstate, message, self);
	}

});

luna.on("whisper", function(channel, userstate, message, self) {
	if (self) return;
	
	if (message.charAt(0) === "!")
	{
		commands.whisper(userstate, message, self);
	}


});