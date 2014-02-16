/**
	API to handle all user object related things:
	- Register new users
	- Login users
*/

exports.register = function(userData, callback) {

	var required_params = ['username', 'email', 'pwd'];
	var userModel = require(__dirname + '/../model/user.js');
	var user = {
		username : userData.username,
		email : userData.email,
		pwd : userData.pwd
	};

	userModel.register(user, function(error, data) {
		if (error === null) {
			callback(null, 'User already exists');			
		} else {
			callback({ template: '/application/html/signup/signup_success.html' }, null)
		}
	});
}

exports.login = function(loginData, callback, req) {
	var required_params = ['username', 'pwd'];

	var userModel = require(__dirname + '/../model/user.js');
	userModel.checkLogin(loginData.username, loginData.pwd, function(userObject) {
		if (userObject !== null) {
			req.session.user = userObject;
			callback( {output: userObject} , null);
		} else {
			callback( {output: null}, null);
		}
	});
}