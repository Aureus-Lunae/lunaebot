exports.chat = function(channel, msg, callback) {

	switch (msg[1]) {
		case "!metronome":
			var responsemsg = `You use !metronome. This has no extra arguments.`;
			break;
		case "!pkmnmove":
			var responsemsg = `!pkmnmove [MoveName] <paramaters>. The movename is 1 word, if the move consist 2 words, please use _ between it. This command has the following parameters you can add: type, description, power, accuracy, category, nodescr.`;
			break;
		default:
			var responsemsg = `This channel has the following commands: !help, !metronome. For more details use !help <command>`;
			break;
		}
	callback(channel, responsemsg);
}
