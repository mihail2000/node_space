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
		starmapModel.randomizeStarmap(newgame._id, 1, function(starmap) {
			starmapModel.saveStarmap(starmap, function(){

				var dataToMongo = [];

				for (var i = 0; i < starmap.length; i++) {
					starSystem.randomizeStarsystem(newgame._id, starmap[i], function(data) {
						dataToMongo.push(data);
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