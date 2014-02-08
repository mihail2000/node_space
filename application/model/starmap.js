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

/**
	Properties
*/
_starmapModel._super = null;
_starmapModel.starmapWidth = 10000;
_starmapModel.starmapHeight = 10000;
_starmapModel.starmap = [];
/**
	randomizeStarmap

	Creates a randomized starmap and stores it into the internal _starmap structure
*/
_starmapModel.randomizeStarmap = function(countOfStars, callback) {

	// Read contents of the starmap names file
	var fs = require('fs');
	fs.readFile(__dirname + '/../resources/planetnames', 'utf8', function (err, data) {
  		if (err) throw err;
  		var planetNames = [];
  		var nameIteration = 0;
  		var starmap = [];

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
				name: planetNames[nameIdx] + __StarmapNameHelper(nameIteration)
			}
			planetNames.splice(nameIdx, 1);
			starmap.push(star);

		}
		_starmapModel.starmap = starmap;
		callback();
	});
}

_starmapModel.saveStarmap = function(callback) {
	var i = 0;
	_starmapModel.create(_starmapModel.starmap);
}

_starmapModel.loadStarmap = function(callback) {
	_starmapModel.fetch('', function(err, doc) {
		_starmapModel.starmap = doc;
		callback();
    });
}

_starmapModel.collectionName = 'starmaps';
_starmapModel.primaryId = '_id';

var baseModel = new baseModel(_starmapModel);
module.exports = _starmapModel;
