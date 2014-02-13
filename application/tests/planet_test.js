var testCase  = require('nodeunit').testCase;

var gameId = '52fb2518d021833b1faf4ad4';

module.exports = testCase({
	"Generate planet": function(test) {
		test.expect(2);
        var starmapModel = require(__dirname + '/../model/starmap.js');
        test.ok(typeof starmapModel !== 'undefined');

        var starModel = require(__dirname + '/../model/star.js');
        test.ok(typeof starModel !== 'undefined');

		starmapModel.loadStarmap(gameId, function() {
			starModel.randomizeStarsystem(gameId, starmapModel.starmap.planets, function() {
				test.done();
			});
		});
	}
});
