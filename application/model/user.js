/**
 User model
 */
var util = require("util");
var baseModel = require(__dirname + '/matufw_base_model.js');

function _userModel() {
};

_userModel.collectionName = 'users';
_userModel.primaryId = '_id';


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
