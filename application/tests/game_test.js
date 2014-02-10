var testCase  = require('nodeunit').testCase;

module.exports = testCase({
	"Game setup": function(test) {
		test.expect(2);
		var gameModel = require(__dirname + '/../model/game.js');
		test.ok(typeof gameModel !== 'undefined');

		gameModel.setupNewGame(function(id) {
			test.ok(id !== null);
			console.log('Game ID : ' + id);
			test.done();
		});
	}
});
