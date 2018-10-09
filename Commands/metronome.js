const sqlite3 = require(`sqlite3`).verbose();

const db = new sqlite3.Database(`databases/Pkmn.db`, (err) => {
	console.log(`pkmn metronome database connected! Errors: `, err);
});


exports.move = function(channel, message, callback) {
		let move = Math.floor(Math.random()*30)+1;
		db.get(`SELECT id, Move, Metronome FROM PkmnMoves WHERE id=$moveID`,
		{
			$moveID: move
		},
		(err, row) => {
			if (err) {
        		return console.log(err);
      		}
      		let Movename = row.Move;
      		let result = row.Metronome;
      		callback(channel, `${Movename}: You waggle your finger and ${result}`);
		});
		
};


