/**
	Game API
*/

exports.acl = {
	'guest' : null,
	'user' : ['newgame']
}

exports.newgame = function(data, callback, req) {

	var required_params = ['id'];
	var gameModel = require(__dirname + '/../model/game.js');

	var user = req.session.user;

	gameModel.setupNewGame(user, function(newgame) {
		callback(null, { output: {game : newgame} });		
	});
}

exports.gamelist = function(data, callback, req) {
	var gameModel = require(__dirname + '/../model/game.js');

	var user = req.session.user;
	gameModel.fetchGamelistByUser(user, function(doc) {
		callback(null, { output: doc });
	});
}