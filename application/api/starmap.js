// Starmap API
//var crypto = require('crypto');
var MongoClient = require('mongodb').MongoClient;

exports.loadstarmap = function(data, callback) {

	var required_params = ['id'];
	//var controllerUtils = require('../utils/controllerutil.js');
	//controllerUtils.checkParams(required_params, )

	MongoClient.connect('mongodb://localhost/space', function(err, db) {
		if(err) throw err;
		
		var starmapModel = require(__dirname + '/../model/starmap.js');
        starmapModel.loadStarmap(data.id, function() {
			callback(null, { output: starmapModel.starmap.planets });
        });
	});
}