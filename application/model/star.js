/**
 Starmap model
 */
var util = require("util");
var baseModel = require(__dirname + '/matufw_base_model.js');

function _starModel() {};

_starModel.collectionName = 'planets';
_starModel.primaryId = '_id';

_starModel.randomizeStarsystem = function(gameID, solarSystem, callback) {
	var countOfPlanets = Math.floor(Math.random() * 4) + 3;
	var planetsInTheSystem = [];
	var previousRad = 40;

	for (var j = 0; j < countOfPlanets; j++) {
		var planetName = solarSystem.name + ' ' + (j + 1);
		var pos = Math.floor(Math.random() * 8);

		planetsInTheSystem[j] = {
			gameid: gameID,
			starid: solarSystem._id,
			radius: previousRad + Math.floor(Math.random() * (j * 20)) + 5,
			position: pos,
			name: planetName,
			type: 'foo',
			minerals: {
				gold: 0,
				silver: 1,
				californium: 2,
				einsteinium: 3
			}
		};
		previousRad = planetsInTheSystem[j].radius;
	}

	callback(planetsInTheSystem);
	//console.log(dataToMongo);
	//_starModel.create(dataToMongo, function(id) {
	//	callback();
	//});
}

_starModel.loadStar = function(gameId, starId, callback) {
	console.log(gameId);
	console.log(starId);
	_starModel.fetch( {$and: [ {gameid : gameId, starid : starId} ]}, function(err, doc) {
		console.log('starId ' + doc);
		callback(err, doc);
	}); 
}

var baseModel = new baseModel(_starModel);
module.exports = _starModel;
