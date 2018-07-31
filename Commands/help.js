exports.chat = function(channel, msg, callback) {


	switch (msg[1]) {
		case "!metronome":
			var responsemsg = `You use !metronome. This has no extra arguments.`;
			break;
		case "!pkmnmove":
			var responsemsg = `!pkmnmove [MoveName] <paramaters>. The movename is 1 word, if the move consist 2 words, please use _ between it. This command has the following parameters you can add: type, description, power, accuracy, category, nodescr.`;
			break;
		case "!customcommand":
		case "!cc":
			var responsemsg = `Use !cc to add or remove custom commands. Use !cc add <command> <response> to add a custom command, and use !cc del <command> to delete a command. Only channel moderators can use this. A reminder that Custom commands require ! as a prefix.`;
			break;
		default:
			var responsemsg = `This channel has the following commands: !help, !metronome, !pkmnmove, !cc. For more details use !help <command>.`;
			break;
		}
	callback(channel, responsemsg);
}
