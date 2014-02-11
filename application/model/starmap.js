/**
 Starmap model
 */
var util = require("util");
var baseModel = require(__dirname + '/matufw_base_model.js');

function _starmapModel() {};

// Private parts

__StarmapNameHelper = function(iteration) {
	var ret = '';

	if (iteration > 1) {
		var num = iteration;

		if (!+num)
		    return false;
		var digits = String(+num).split(""),
			key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
				"","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
				"","I","II","III","IV","V","VI","VII","VIII","IX"],
			roman = "",
			i = 3;
		while (i--)
			roman = (key[+digits.pop() + (i * 10)] || "") + roman;
		ret = ' ' + Array(+digits.join("") + 1).join("M") + roman;

	}
	return ret;
}

__StarColorRandomizer = function(iteration) {
	var starColors = [
		'red',
		'orange',
		'yellow',
		'white',
		'blue',
		'cyan'
	];

	return starColors[Math.floor((Math.random() * 6))];
}

/**
	Properties
*/
_starmapModel._super = null;
_starmapModel.starmapWidth = 3000;
_starmapModel.starmapHeight = 3000;
_starmapModel.starmap = { gameid : null,
  						planets : [] };

/**
	randomizeStarmap

	Creates a randomized starmap and stores it into the internal _starmap structure
*/
_starmapModel.randomizeStarmap = function(gameID, countOfStars, callback) {

	// Read contents of the starmap names file
	var fs = require('fs');
	fs.readFile(__dirname + '/../resources/planetnames', 'utf8', function (err, data) {
  		if (err) throw err;
  		var planetNames = [];
  		var nameIteration = 0;
  		var starmap = [];
  		_starmapModel.starmap.gameid = gameID;

		for (var i = 0; i < countOfStars; i++) {
			// If we have exchausted all planet names, re-use the old ones with II, III, IV etc.
			if (planetNames.length == 0) {
 				planetNames = data.match(/[^\s]+/g);
 				nameIteration++;
			}

			var nameIdx = Math.floor(Math.random() * planetNames.length);

			var star = {
				x: Math.floor((Math.random() * _starmapModel.starmapWidth)+1),
				y: Math.floor((Math.random() * _starmapModel.starmapHeight)+1),
				name: planetNames[nameIdx] + __StarmapNameHelper(nameIteration),
				color: __StarColorRandomizer()
			}
			planetNames.splice(nameIdx, 1);
			starmap.push(star);

		}
		_starmapModel.starmap.planets = starmap;
		callback();
	});
}

_starmapModel.saveStarmap = function(callback) {
	var i = 0;
	_starmapModel.create(_starmapModel.starmap);
}

_starmapModel.loadStarmap = function(gameID, callback) {
	_starmapModel.fetchById(gameID, function(err, doc) {
		_starmapModel.starmap = doc;
		callback();
    });
}

_starmapModel.collectionName = 'starmaps';
_starmapModel.primaryId = '_id';

var baseModel = new baseModel(_starmapModel);
module.exports = _starmapModel;
