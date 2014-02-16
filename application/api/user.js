/**
	API to handle all user object related things:
	- Register new users
	- Login users
*/


/**
	register

	Register new user to system and creates new session if user gets created successfully 
*/
exports.register = function(userData, callback, req) {

	var required_params = ['username', 'email', 'pwd'];
	var userModel = require(__dirname + '/../model/user.js');
	var user = {
		username : userData.username,
		email : userData.email,
		pwd : userData.pwd
	};

	userModel.register(user, function(error, data) {
		if (error === null) {
			req.session.user = data;
			callback(null, { template: '/application/html/signup/signup_success.html' });		
		} else {
			callback('User already exists', null);
		}
	});
}

/**
	login

	Sings in an existing user if username and password matches

	Paramters:
		logindata - username & password pair tried to login
		callback - callback function called when registration gets completed successfully 
*/
exports.login = function(loginData, callback, req) {
	var required_params = ['username', 'pwd'];

	var userModel = require(__dirname + '/../model/user.js');
	userModel.checkLogin(loginData.username, loginData.pwd, function(userObject) {
		if (userObject !== null) {
			req.session.user = userObject;
			callback(null, {output: userObject});
		} else {
			callback(null, {output: null});
		}
	});
}