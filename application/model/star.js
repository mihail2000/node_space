/**
 Starmap model
 */
var util = require("util");
var baseModel = require(__dirname + '/matufw_base_model.js');

function _starModel() {};

_starModel.collectionName = 'stars';
_starModel.primaryId = '_id';

_starModel.randomizeStarsystem = function(gameID, solarSystem, callback) {
	var planetData = { gameid : gameID, starid: solarSystem._id, planets: [] };

	var countOfPlanets = Math.floor(Math.random() * 1) + 1;
	var planetsInTheSystem = [];

	for (var j = 0; j < countOfPlanets; j++) {
		var planetName = solarSystem.name + ' ' + (j + 1);
		planetsInTheSystem[j] = {
			name: planetName,
			type: 'foo',
			minerals: {
				gold: 0,
				silver: 1,
				californium: 2,
				einsteinium: 3
			}
		};
	}

	planetData.planets = planetsInTheSystem;

	callback(planetData);
	//console.log(dataToMongo);
	//_starModel.create(dataToMongo, function(id) {
	//	callback();
	//});
}

_starModel.loadStar = function(starId, callback) {
	callback();	
}

var baseModel = new baseModel(_starModel);
module.exports = _starModel;
