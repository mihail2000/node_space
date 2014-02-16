/**
 User model
 */
var util = require("util");
var baseModel = require(__dirname + '/matufw_base_model.js');

function _userModel() {
};

_userModel.collectionName = 'users';
_userModel.primaryId = '_id';

/**
	checkLogin

	Validates if the given username & password is correct and returns the maching USER object.
	Otherwise returns NULL
*/
_userModel.checkLogin = function(username, password, callback) {
	var MongoClient = require('mongodb').MongoClient;

	MongoClient.connect('mongodb://localhost/space', function(err, db) {
		if(err) throw err;
		var pwdHash = _userModel.encodePassword(password);
		var collection = db.collection('users');
		collection.find( {$and: [ {$or: [ {'username' : username}, {'email' : username} ] }, {'password' : pwdHash} ]}).toArray(function(err, docs) {
			var userObject = null;
			if (docs.length > 0) {
				var userObject = _userModel.createObject(docs[0]);
			}
			callback(userObject);
		});
	});
}

_userModel.post_cache_data = function() {
	console.log('post_cache_data');
}

_userModel.encodePassword = function(password) {
	var crypto = require('crypto');
	var hash = crypto.createHash('md5').update(password).digest('hex');
	return hash;
}

var baseModel = new baseModel(_userModel);
module.exports = _userModel;
