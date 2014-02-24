/**
	Core controller
*/

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
				//controller.render = render;
				controller.custom_route(req, res);
			} else {
				console.log('CORE::Unknown action ' + controller_name + ':' + action_name);
				//res.end();
			}
		} else {
			console.log('CORE::Unknown controller: ' + controller_name);
			//res.end();
		}
	}
}

exports.route_api = function(req, res) {
	var i = req.route.params[0].search('/');
	
	if (i > -1) {
		var api_controller_name = req.route.params[0].substring(0, i);
		// Find the function name
		var function_name = req.route.params[0].substring(i + 1);

		if (function_name !== '') {
			var api = require(__dirname + '/../api/' + api_controller_name + '.js');			

			var allowed = true;
			if (typeof api.acl !== 'undefined') {
				allowed = restrict(req, res, api.acl, function_name);
			}
			if (allowed) {
				api[function_name](req.body, function(error, data) { 
					if (error == null) {
						if (typeof data.template !== 'undefined') {					
							swig.renderFile(__dirname + data.template, {}, function(err, output) {
								res.send({ tpl: output });
								//res.end();
							});
						} else {
							res.send({ data: data.output });
							//res.end();						
						}
					} else {
						res.send({ error: 'Error occurred' });
						//res.end();
					}
				}, req);
			} else {
				console.log('Access denied');
				res.end('Access denied');
			}
		} else {
			res.end('Unknown request');
		}
	} else {
		res.end('Unknown request');		
	}	
}