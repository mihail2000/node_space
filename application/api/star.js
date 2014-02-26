// Star API

exports.acl = {
	'guest' : null,
	'user' : ['loadstardata' ]
}

exports.loadstardata = function(data, callback) {
	console.log('star:loadstardata');
	var required_params = ['id'];

	var starModel = require(__dirname + '/../model/star.js');

	var BSON = require('mongodb').BSONPure;
	var gameObjID = new BSON.ObjectID(data.gameid);
	var starObjID = new BSON.ObjectID(data.starid);

	starModel.loadStar(gameObjID, starObjID, function(err, doc) {
		callback(err, { output: doc });
	});
}