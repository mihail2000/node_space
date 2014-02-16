var testCase  = require('nodeunit').testCase;

module.exports = testCase({
	"Game setup": function(test) {
		test.expect(3);
		var gameModel = require(__dirname + '/../model/game.js');
		test.ok(typeof gameModel !== 'undefined');

		var userModel = require(__dirname + '/../model/user.js');
		test.ok(typeof userModel !== 'undefined');

		userModel.fetch('', function(err, user) {
			gameModel.setupNewGame(user[0], function(newgame) {
				test.ok(newgame !== null);
				console.log('New game : ' + newgame);
				test.done();
			});

		});

	}
});
