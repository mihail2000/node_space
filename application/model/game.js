/**
 Game model
 */
var util = require("util");
var baseModel = require(__dirname + '/matufw_base_model.js');

function _gameModel() {};

_gameModel.setupNewGame = function(user, callback) {
	var create_time = Date.now();
	var gameData = { userid: user._id,
					date_created: create_time,
					last_played: create_time,
					};
	_gameModel.create(gameData, function(id) {
		_gameModel.fetchById(id, function(err, obj) {
			callback(obj);
		});
	});
}

_gameModel.fetchGamelistByUser = function(user, callback) {
	_gameModel.fetch( {userid : user._id }, function(err, doc) {
		callback(doc);
	});
}

_gameModel.collectionName = 'games';
_gameModel.primaryId = '_id';

var baseModel = new baseModel(_gameModel);
module.exports = _gameModel;
