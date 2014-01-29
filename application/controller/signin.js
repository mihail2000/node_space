// Signin controller

exports.action_index = function(req, res) {
	res.render(__dirname + '/../html/signin/index.html', { }, function(err, html)  {
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