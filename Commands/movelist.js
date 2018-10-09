const sqlite3 = require(`sqlite3`).verbose();

const db = new sqlite3.Database(`databases/Pkmn.db`, (err) => {
	console.log(`pkmnmoves database connected! Errors: `, err);
});

exports.movedata = function(channel, msg, callback) {
		if (!msg[1]) {
			callback(channel, `Please define a move.`);
			return;
		}

		let moveName = msg[1].toUpperCase();
		if (msg[2]) {
				var atri = msg[2];
			} else {
				var atri = `all`;
			}
		
		db.get(`SELECT * FROM PkmnMoves WHERE Move=$moveName`,
		{
			$moveName: moveName
		},
		(err, row) => {
			if (err) {
        		  return console.log(err);
      		}
      		if (!row) {
      			callback(channel, `Move not found in the database. If the move contains two words, please use _ to seperate the words, not a space.`);
      			return;
      		}

      		let MoveName = row.Move;
                  let pkmnresult;
      		switch(atri){
      			case `type`:
      				pkmnresult = `Type: ` + row.Type;
      				break;
      			case `descr`:
      				pkmnresult = row.Description;
      				break;
       			case `description`:
      				pkmnresult = row.Description;
      				break;
      			case `power`:
      				pkmnresult = `Power: ` + row.Power;
      				break;
      			case `acc`:
      			case `accuracy`:
      				pkmnresult = `Accuracy: ` + row.Accuracy;
      				break;
      			case `category`:
      			case `cat`:
      				pkmnresult = `Category: ` + row.Category;
      				break;
      			case `nodescr`:
      				pkmnresult = `Type: ` + row.Type + `; Category: ` + row.Category + `; Power: ` + row.Power + `; Accuracy: ` + row.Accuracy;
      				break;
      			default: 
      				pkmnresult = row.Description + ` Type: ` + row.Type  + `; Category: ` + row.Category + `; Power: ` + row.Power + `; Accuracy: ` + row.Accuracy;
      				break;
      		}

      		callback(channel, `${MoveName}: ${pkmnresult}`);
		});
		
};
