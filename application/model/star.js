/**
 Starmap model
 */
var util = require("util");
var baseModel = require(__dirname + '/matufw_base_model.js');

function _starModel() {};

_starModel.collectionName = 'stars';
_starModel.primaryId = '_id';

_starModel.randomizeStarsystem = function(gameID, starSystem, callback) {
	var dataToMongo = [];
	for (var i = 0; i < starSystem.length; i++) {
		var planetData = { gameid : gameID, starid: starSystem[i].name, planets: [] };

		var countOfPlanets = Math.floor(Math.random() * 1) + 1;
		var planetsInTheSystem = [];
		for (var j = 0; j < countOfPlanets; j++) {
			var planetName = starSystem[i].name + ' ' + (j + 1);
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

		dataToMongo[i] = planetData;
	}
	//console.log(planetData);
	_starModel.create(dataToMongo, function(id) {
		callback();
	});
}

_starModel.loadStar = function(starId, callback) {
	
}

var baseModel = new baseModel(_starModel);
module.exports = _starModel;
