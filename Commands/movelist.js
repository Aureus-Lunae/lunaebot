const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('databases/Pkmn.db', (err) => {
	console.log('pkmnmoves database connected! Errors: ', err);
});

exports.movedata = function(channel, msg, callback) {
		if (!msg[1]) {
			callback(channel, `Please define a move.`);
			return;
		}

		var moveName = msg[1].toUpperCase();
		if (msg[2]) {
				var atri = msg[2];
			} else {
				var atri = "all";
			}
		
		db.get("SELECT * FROM PkmnMoves WHERE Move=$moveName",
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

      		var MoveName = row.Move;
      		switch(atri){
      			case "type":
      				var pkmnresult = "Type: " + row.Type;
      				break;
      			case "descr":
      				var pkmnresult = row.Description;
      				break;
       			case "description":
      				var pkmnresult = row.Description;
      				break;
      			case "power":
      				var pkmnresult = "Power: " + row.Power;
      				break;
      			case "acc":
      				var pkmnresult = "Accuracy: " + row.Accuracy;
      				break;
      			case "accuracy":
      				var pkmnresult = "Accuracy: " + row.Accuracy;
      				break;
      			case "category":
      				var pkmnresult = "Category: " + row.Category;
      				break;
      			case "cat":
      				var pkmnresult = "Category: " + row.Category;
      				break;
      			case "nodescr":
      				var pkmnresult = "Type: " + row.Type + "; Category: " + row.Category + "; Power: " + row.Power + "; Accuracy: " + row.Accuracy;
      				break;
      			default: 
      				var pkmnresult = row.Description + " Type: " + row.Type  + "; Category: " + row.Category + "; Power: " + row.Power + "; Accuracy: " + row.Accuracy;
      				break;
      		}

      		callback(channel, `${MoveName}: ${pkmnresult}`);
		});
		
};
