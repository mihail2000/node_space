// Core controller

exports.route_get = function(req, res) {
	if (req.route.params[0] == '/') {
		res.render('index', { });
	} else {
		controller_name = req.route.params[0].substring(1);
		console.log(controller_name);
		var controller = require(__dirname + '/' + controller_name + '.js');
		controller.action_index(req, res);
	}
}