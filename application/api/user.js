// User API
var crypto = require('crypto');
var MongoClient = require('mongodb').MongoClient;

exports.register = function(userData, callback) {

	var required_params = ['username', 'email', 'pwd'];
	//var controllerUtils = require('../utils/controllerutil.js');
	//controllerUtils.checkParams(required_params, )

	MongoClient.connect('mongodb://localhost/space', function(err, db) {
		if(err) throw err;
		
		var userModel = require(__dirname + '/../model/matufw_base_model.js');

		var collection = db.collection('users');
		collection.find( { $or: [ { 'username' : userData.username }, { 'email' : userData.email } ] }).toArray(function(err, docs) {
			if (docs.length > 0) {
				console.log('User already exists');
				callback(null, 'User already exists');
			} else {
				var hash = crypto.createHash('md5').update(userData.pwd).digest('hex');
				var user = {
					username : userData.username,
					email : userData.email,
					password : hash
				};

				db.collection('users').insert(user, function(err, records) {
					if (err) throw err;
					console.log("Record added as "+records[0]._id);
					callback({ template: '/application/html/signup/signup_success.html' }, null)
				});
			}
		});
	});
}