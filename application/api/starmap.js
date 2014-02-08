// Starmap API
//var crypto = require('crypto');
var MongoClient = require('mongodb').MongoClient;

exports.loadstarmap = function(callback) {

	//var required_params = ['username', 'email', 'pwd'];
	//var controllerUtils = require('../utils/controllerutil.js');
	//controllerUtils.checkParams(required_params, )

	MongoClient.connect('mongodb://localhost/space', function(err, db) {
		if(err) throw err;
		
		var starmapModel = require(__dirname + '/../model/starmap.js');
        //starmapModel.loadStarmap(function() {
        //	callback(starmapModel.starmap);
        //});
		callback('foo');

	});
}