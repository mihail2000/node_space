// Signup controller


exports.action_index = function(req, res) {
	//res.render(req.route.params[0].substring(1) + '.html', { }, function(err, html)  {
	res.render(__dirname + '/../html/signup/index.html', { }, function(err, html)  {
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