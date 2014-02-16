// Game controller

exports.acl = {
	'guest' : null,
	'user' : ['action_index']
}

exports.action_index = function(req, res) {

	res.render(__dirname + '/../html/game/main.html', { }, function(err, html)  {
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