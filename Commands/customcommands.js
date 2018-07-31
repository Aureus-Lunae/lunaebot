const sqlite3 = require('sqlite3').verbose();

const cc = new sqlite3.Database('databases/lunabot.db', (err) => {
	console.log('Custom Commands database connected! Errors: ', err);
});


exports.edit = function(channel, msg, command, user, callback) {

		var broadcaster = `#${user.username}`;
		console.log(`${user.username} ${channel} ${broadcaster}`);
		if (user.mod === false && broadcaster !== channel)
		{
			callback(channel, `You do not have the permissions to use this command.`)
			return;
		}

		if (msg.length < 3) {
			callback(channel, `Not enough parameters has been added.`)
			return;
		}


		if (msg[2].charAt(0) !== "!")
		{
			msg[2] = `!${msg[2]}`;
		}

		if (msg[1]==="add") {

			if (msg.length < 4) {
				callback(channel, `Please use /cc add <command> <response>`)
				return;
			}
			var csplit = command.split(" ")
			var cresponse = command.split(csplit[2] + " ");

			cc.run("INSERT INTO CustomCommands (Command, Response) VALUES ($Command, $Response)",
			{
				$Command: msg[2],
				$Response: cresponse[1]
			},
			(err) => {
				if (err) {
    				callback(channel, `Something went wrong, custom command not added.`);
      				console.log(err);
      				return;
				}
      			callback(channel, `Command ${msg[2]} added`);
			});
		}

		if (msg[1]==="del" || msg[1]==="delete") {

			cc.run("DELETE FROM CustomCommands WHERE Command IN ($Command)",
			{
				$Command: msg[2]
			},
			(err) => {
				if (err) {
    				callback(channel, `Something went wrong, custom command not removed or not existing.`);
      				console.log(err);
      				return;
				}
      			callback(channel, `Command ${msg[2]} removed`);
			});

			
		}
};


exports.custom = function(channel, msg, callback) {
		
		cc.get("SELECT * FROM CustomCommands WHERE Command=$Command",
		{
			$Command: msg
		},
		(err, row) => {
			if (err) {
        		return console.log(err);
      		} 
      		if (!row) {
      			return;
      		} else {
      			var ccresponse = row.Response;
      			callback(channel, ccresponse);
      		}

		});
		
};

