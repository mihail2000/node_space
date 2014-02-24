/**
	Game model
 */
var util = require("util");
var baseModel = require(__dirname + '/matufw_base_model.js');

function gameModel() {};

gameModel.setupNewGame = function(user, callback) {
	var create_time = Date.now();
	var gameData = { userid: user._id,
					date_created: create_time,
					last_played: create_time,
					};
	gameModel.create(gameData, function(id) {
		gameModel.fetchById(id, function(err, obj) {
			callback(obj);
		});
	});
}

gameModel.fetchGamelistByUser = function(user, callback) {
	gameModel.fetch( {userid : user._id }, function(err, doc) {
		callback(doc);
	});
}

gameModel.collectionName = 'games';
gameModel.primaryId = '_id';

var baseModel = new baseModel(gameModel);
module.exports = gameModel;
