const req = require(`../required.js`);

exports.chat = function(channel, msg, callback) {

	let responsemsg;
	let help;

	let enoughparameters= req.hasenoughparameters(msg, 2, 2);

	if (enoughparameters) {
		help = req.addexclamationmarkifnotpresent(msg[1]);
	} else {
		help = ``;
	}

	switch (help) {
		case `!metronome`:
			responsemsg = `You use !metronome. This has no extra arguments.`;
			break;
		case `!pkmnmove`:
			responsemsg = `!pkmnmove [MoveName] <paramaters>. The movename is 1 word, if the move consist 2 words, please use _ between it. This command has the following parameters you can add: type, description, power, accuracy, category, nodescr.`;
			break;
		case `!customcommand`:
		case `!cc`:
			responsemsg = `Use !cc to add or remove custom commands. Use !cc add <command> <response> to add a custom command, and use !cc del <command> to delete a command. Only channel moderators can use this. A reminder that Custom commands require ! as a prefix.`;
			break;
		default:
			responsemsg = `This channel has the following commands: !help, !metronome, !pkmnmove, !cc. For more details use !help <command>.`;
			break;
		}
	callback(channel, responsemsg);
}
