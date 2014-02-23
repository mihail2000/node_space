// Star API
var MongoClient = require('mongodb').MongoClient;

exports.loadstardata = function(data, callback) {
	console.log('star:loadstardata');
	var required_params = ['id'];

	MongoClient.connect('mongodb://localhost/space', function(err, db) {
		if(err) throw err;
		
		var starModel = require(__dirname + '/../model/star.js');
        starModel.loadStar(data.id, function() {
			callback(null, { output: 'Foo' });
        });
	});
}