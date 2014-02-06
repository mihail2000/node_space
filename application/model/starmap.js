/**
 Starmap model
 */
var util = require("util");
var baseModel = require(__dirname + '/matufw_base_model.js');

function _starmapModel() {};

_starmapModel.starmapWidth = 10000;
_starmapModel.starmapHeight = 10000;
_starmapModel.starmap = [];
/**
	randomizeStarmap

	Creates a randomized starmap and stores it into the internal _starmap structure
*/
_starmapModel.randomizeStarmap = function(countOfStars) {

	// Read contents of the starmap names file
	var fs = require('fs');
	fs.readFile(__dirname + '/../resources/planetnames', 'utf8', function (err, data) {
  		if (err) throw err;
  		var planetNames = data.match(/[^\s]+/g);
  		//console.log(planetNames[199]);
		for (var i = 0; i < countOfStars; i++) {
			var star = {
				x: Math.floor((Math.random() * _starmapModel.starmapWidth)+1),
				y: Math.floor((Math.random() * _starmapModel.starmapHeight)+1),
				name: planetNames[Math.floor(Math.random() * planetNames.length)]
			}
			_starmapModel.starmap.push(star);
		}

		console.log(_starmapModel.starmap);

	});


}

_starmapModel.collectionName = 'starmaps';
_starmapModel.primaryId = '_id';

var baseModel = new baseModel(_starmapModel);
module.exports = _starmapModel;
