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

        var userModel = require(__dirname + '/../model/user.js');

        userModel.fetch('', function(err, user) {
            gameModel.setupNewGame(user[0], function(newgame) {
                test.ok(newgame !== null);
                console.log('Game ID : ' + newgame._id);

                starmapModel.randomizeStarmap(newgame._id, 1000, function() {
                    starmapModel.saveStarmap();
                    test.ok(starmapModel.starmap.planets.length == 1000);
                    test.done();
                });
            });
        });

        //test.done();
    },
    "Read starmap": function(test) {
        test.expect(2);
        var starmapModel = require(__dirname + '/../model/starmap.js');
        test.ok(typeof starmapModel !== 'undefined');

        starmapModel.loadStarmap('53045ddfe1b9db84066ef98e', function() {
            test.ok(starmapModel.starmap.planets.length > 0)
            test.done();
        });
    }
});
