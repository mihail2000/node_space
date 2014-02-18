// Signup controller


exports.action_index = function(req, res) {
	//res.render(req.route.params[0].substring(1) + '.html', { }, function(err, html)  {
	res.render(__dirname + this.config.path + '/../html/signup/index.html', { }, function(err, html)  {
		if (err !== null) {
			console.log(err);
			res.send('Unknown request');
			res.end();
		} else {
			res.send(html);
			//res.end();
		}
	});	
}

exports.action_test = function(req, res) {
	res.send('<div>Foo</div>');
	res.end();
}