// Star API
var MongoClient = require('mongodb').MongoClient;

exports.loadstardata = function(data, callback) {

	var required_params = ['id'];

	MongoClient.connect('mongodb://localhost/space', function(err, db) {
		if(err) throw err;
		
		var starmapModel = require(__dirname + '/../model/star.js');
        starmapModel.loadStarmap(data.id, function() {
			callback({ output: starmapModel.starmap.planets }, null)
        });
	});
}