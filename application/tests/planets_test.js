var testCase  = require('nodeunit').testCase;

module.exports = testCase({
    "Generate planets": function(test) {
    	test.expect(3);
        var starmapModel = require(__dirname + '/../model/starmap.js');
        test.ok(typeof starmapModel !== 'undefined');

        var gameModel = require(__dirname + '/../model/game.js');
        test.ok(typeof gameModel !== 'undefined');

        var userModel = require(__dirname + '/../model/user.js');

        var starSystem = require(__dirname + '/../model/star.js');

        userModel.fetch('', function(err, user) {
            gameModel.setupNewGame(user[0], function(newgame) {
                test.ok(newgame !== null);
                gameId = newgame._id;
                starmapModel.randomizeStarmap(newgame._id, 1000, function(starmap) {
                    starmapModel.saveStarmap(starmap, function(id) {

                        var dataToMongo = [];

                        for (var i = 0; i < starmap.length; i++) {
                            starSystem.randomizeStarsystem(gameId, starmap[i], function(data) {
                                dataToMongo.push(data);
                            });
                        }

                        starSystem.create(dataToMongo, function(id) {
                            test.done();
                        })
                    
                    });
                });
            });
        });
    }
});
