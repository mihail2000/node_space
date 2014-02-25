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

	var starmapModel = require(__dirname + '/../model/starmap.js');
	var BSON = require('mongodb').BSONPure;
	var gameID = new BSON.ObjectID(data.gameid);

	var userID = new BSON.ObjectID(data.userid);

	starmapModel.loadFOWStarmap(gameID, userID, function(data) {
		if (typeof starmapModel.starmap !== 'undefined') {
			callback(null, { output: data });
		} else {
			console.log('API:starmap:Data integrity error');
			callback('Data integrity error', null);
		}
	});
}