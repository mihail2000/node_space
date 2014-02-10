var testCase  = require('nodeunit').testCase;

module.exports = testCase({
   "Randomize starmap": function(test) {
    	test.expect(2);
        var starmapModel = require(__dirname + '/../model/starmap.js');
        test.ok(typeof starmapModel !== 'undefined');

        starmapModel.randomizeStarmap(0, 1000, function() {
			test.ok(starmapModel.starmap.planets.length == 1000);
	        test.done();
        });
    },
    "Save starmap": function(test) {
    	test.expect(4);
        var starmapModel = require(__dirname + '/../model/starmap.js');
        test.ok(typeof starmapModel !== 'undefined');

        var gameModel = require(__dirname + '/../model/game.js');
        test.ok(typeof gameModel !== 'undefined');

        gameModel.setupNewGame(function(id) {
            test.ok(id !== null);
            console.log('Game ID : ' + id);

            starmapModel.randomizeStarmap(id, 1000, function() {
                starmapModel.saveStarmap();
                test.ok(starmapModel.starmap.planets.length == 1000);
                test.done();
            });
        });
        //test.done();
    },
    "Read starmap": function(test) {
        test.expect(2);
        var starmapModel = require(__dirname + '/../model/starmap.js');
        test.ok(typeof starmapModel !== 'undefined');

        starmapModel.loadStarmap('52f84276aaa7dd6e0b8205c8', function() {
            test.ok(starmapModel.starmap.planets.length > 0)
            test.done();
        });
    }
});
