const sqlite3 = require(`sqlite3`).verbose();
const req = require(`../required.js`);
let enoughparameters;
let allcustomcommands = [];


const openCustomCommandsDatabase = function() {
	return new sqlite3.Database(`databases/lunabot.db`, (err) => {
		console.log(`Custom Commands database opened for editing! Errors: `, err);
	});	
}


const listcommands = function(channel, callback) {

	const cc = openCustomCommandsDatabase();

	cc.serialize(function() {
		cc.each(`SELECT Command FROM CustomCommands`, (err, row) => {
			if (err) {
    			console.log(err);
    			return;
			}

			allcustomcommands.push(row);
			}, function(err, count) {

			callback(channel,`This channel has the following custom commands: ${allcustomcommands}`);
			cc.close();
		});

	});

}

const addcommand = function (channel, msg, command, callback) {

	const cc = openCustomCommandsDatabase();

	enoughparameters = req.hasenoughparameters(msg, 4, 0);
	msg[2] = req.addexclamationmarkifnotpresent(msg[2]);
	if (enoughparameters === false) {
		callback(channel, `Please use !cc add <command> <response>`)
		return;
	}
	let csplit = command.split(` `)
	let cresponse = command.split(csplit[2] + ` `);

	cc.run(`INSERT INTO CustomCommands (Command, Response) VALUES ($Command, $Response)`,
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
      	cc.close();
	});
}

const deletecommand = function(channel, msg, command, callback){

	const cc = openCustomCommandsDatabase();

	enoughparameters = req.hasenoughparameters(msg, 3, 0);
	if (enoughparameters === false) {
		callback(channel, `Please use !cc delete <command>`)
		return;
	}
	msg[2] = req.addexclamationmarkifnotpresent(msg[2]);
	cc.run(`DELETE FROM CustomCommands WHERE Command IN ($Command)`,
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
    	cc.close();
	});
}

exports.edit = function(channel, msg, command, user, callback) {

	let haspermission = req.haspermission(user, channel);
	enoughparameters = req.hasenoughparameters(msg, 2, 0);
	if (enoughparameters === false) {
		callback(channel, `Please use list, add or delete`)
		return;
	}
	if (haspermission === false)
	{
		callback(channel, `You do not have the permissions to use this command.`)
		return;
	}

	switch (msg[1]){
		case `add`:
			addcommand(channel, msg, command, callback);
			break;
		case `del`:
		case `delete`:
			deletecommand(channel, msg, command, callback);
			break;
		/* case `list`:
			listcommands(channel,callback); 
			break; */
		default:
			callback(channel,`Please use list, add or delete`);
			break;
	}
};


exports.custom = function(channel, msg, callback) {
		
	const cc = openCustomCommandsDatabase();

		cc.get(`SELECT * FROM CustomCommands WHERE Command=$Command`,
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
	cc.close()
};

