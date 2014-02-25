/**
	Game API
*/

exports.acl = {
	'guest' : null,
	'user' : ['newgame', 'gamelist']
}

exports.newgame = function(data, callback, req) {

	var required_params = ['id'];
	var gameModel = require(__dirname + '/../model/game.js');
	var starmapModel = require(__dirname + '/../model/starmap.js');
    var starSystem = require(__dirname + '/../model/star.js');
	var user = req.session.user;

	gameModel.setupNewGame(user, function(newgame) {
		starmapModel.randomizeStarmap(newgame._id, user._id, 1000, function(starmap) {
			starmapModel.saveStarmap(starmap, function(){

				var dataToMongo = null;

				for (var i = 0; i < starmap.length; i++) {
					//console.log(starmap);
					starSystem.randomizeStarsystem(newgame._id, starmap[i], function(data) {

						if (dataToMongo == null) {
							dataToMongo = data;							
						} else {
							var tmpArray = dataToMongo.concat(data);
							dataToMongo = tmpArray;
						}
					});
				}

				starSystem.create(dataToMongo, function(id) {
					callback(null, { output: {game : newgame} });
				})
			});
		});
	});
}

exports.gamelist = function(data, callback, req) {
	var gameModel = require(__dirname + '/../model/game.js');

	var user = req.session.user;
	gameModel.fetchGamelistByUser(user, function(doc) {
		callback(null, { output: doc });
	});
}