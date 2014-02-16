// Core controller

addConfig = function(obj) {
	config = {
		path: '/../html/'
	};
	obj.config = config;
}

//restrict = function (req, res, next) {
restrict = function (req, res, acl, action_name) {
	var allowed = false;
	// Find out the type of the user
	if (req.session.user) {
		// Logged in user
		//next();
		var actionlist = acl.user;
		if (actionlist !== null) {
			for (var i = 0; i < actionlist.length; i++) {
				if (action_name === actionlist[i]) {
					allowed = true;
				}
			}			
		}

	} else {
		// Logged out user
		var actionlist = acl.guest;
		if (actionlist !== null) {
			for (var i = 0; i < actionlist.length; i++) {
				if (action_name === actionlist[i]) {
					allowed = true;
				}
			}

		}
	}

	if (!allowed) {
		res.redirect('/');
		res.end();		
	}

	return allowed;
}

exports.route_get = function(req, res) {
	if (req.originalUrl == '/') {
		res.render('index', { });
	} else {
		var controller_name = ''

		var i = req.originalUrl.substring(1).indexOf('/');
		var action_name = 'action_index';

		if (i != -1) {
			controller_name = req.originalUrl.substring(1, i + 1);
			console.log('case1');
			var y = req.originalUrl.substring(i + 2).indexOf('/');
			if (y != -1) {
				console.log('case2');
				console.log(req.originalUrl.substring(i + 1));
				action_name = 'action_' + req.originalUrl.substring(i + 1).substring(1, y + 1);
			} else {
				console.log('case3');
				action_name = 'action_' + req.originalUrl.substring(i + 2);		
			}
		} else {
			console.log('case4');
			controller_name = req.originalUrl.substring(1);
		}
		console.log('Controller : ' + controller_name);
		console.log('Action : ' + action_name);
		var controller = require(__dirname + '/' + controller_name + '.js');

		if (typeof controller !== 'undefined') {
			addConfig(controller);
			if (typeof controller[action_name] !== 'undefined') {
				var allowed = true;
				if (typeof controller.acl !== 'undefined') {
					allowed = restrict(req, res, controller.acl, action_name);
				}
				if (allowed) {
					controller[action_name](req, res);					
				}
			} else if (typeof controller['custom_route'] !== 'undefined') {
				controller.custom_route(req, res);
			} else {
				console.log('CORE::Unknown action ' + controller_name + ':' + action_name);
				res.end();
			}
		} else {
			console.log('CORE::Unknown controller: ' + controller_name);
			res.end();
		}
	}
}