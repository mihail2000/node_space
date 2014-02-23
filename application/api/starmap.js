// Starmap API
//var crypto = require('crypto');

exports.acl = {
	'guest' : null,
	'user' : ['loadstarmap']
}

var MongoClient = require('mongodb').MongoClient;

exports.loadstarmap = function(data, callback) {

	var required_params = ['id'];
	//var controllerUtils = require('../utils/controllerutil.js');
	//controllerUtils.checkParams(required_params, )

	MongoClient.connect('mongodb://localhost/space', function(err, db) {
		if(err) throw err;
		var starmapModel = require(__dirname + '/../model/starmap.js');
		var BSON = require('mongodb').BSONPure;
		var oID = new BSON.ObjectID(data.gameid);

        starmapModel.loadStarmap(oID, function() {
        	if (typeof starmapModel.starmap !== 'undefined') {
				callback(null, { output: starmapModel.starmap });
        	} else {
        		console.log('API:starmap:Data integrity error');
        		callback('Data integrity error', null);
        	}
        });
	});
}