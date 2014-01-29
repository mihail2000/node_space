// Core controller

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
			if (typeof controller[action_name] !== 'undefined') {
				controller[action_name](req, res);
			} else {
				console.log('CORE::Unknown action ' + controller_name + ':' + action_name);
			}
		} else {
			console.log('CORE::Unknown controller: ' + controller_name);
		}
	}
}