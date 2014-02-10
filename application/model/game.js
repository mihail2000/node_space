/**
 Game model
 */
var util = require("util");
var baseModel = require(__dirname + '/matufw_base_model.js');

function _gameModel() {};

_gameModel.setupNewGame = function(callback) {
	var gameData = {test: 'test'};
	_gameModel.create(gameData, function(id) {
		callback(id);
	});
}

_gameModel.collectionName = 'games';
_gameModel.primaryId = '_id';

var baseModel = new baseModel(_gameModel);
module.exports = _gameModel;
