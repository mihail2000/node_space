// Star API
var MongoClient = require('mongodb').MongoClient;

exports.loadstardata = function(data, callback) {
	console.log('star:loadstardata');
	var required_params = ['id'];

	MongoClient.connect('mongodb://localhost/space', function(err, db) {
		if(err) throw err;
		
		var starModel = require(__dirname + '/../model/star.js');

		var BSON = require('mongodb').BSONPure;
		var gameObjID = new BSON.ObjectID(data.gameid);
		var starObjID = new BSON.ObjectID(data.starid);

        starModel.loadStar(gameObjID, starObjID, function(err, doc) {
        	console.log(doc);
			callback(err, { output: doc });
        });
	});
}