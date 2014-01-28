// Core controller

exports.route_get = function(req, res) {
	if (req.route.params[0] == '/') {
		res.render('index', { });
	} else {
		//controller_name = req.route.params[0].substring(1);
		//var controller = require(__dirname + '/application/controller/' + controller_name + '.js');



		res.render(req.route.params[0].substring(1) + '.html', { }, function(err, html)  {
			if (err !== null) {
				console.log(err);
				res.send('Unknown request');
				res.end();					
			} else {
				res.send(html);
				res.end();
			}
		});
	}
}