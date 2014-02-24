// Game controller

exports.acl = {
	'guest' : null,
	'user' : ['action_index']
}

exports.custom_route = function(req, res) {

	res.render(__dirname + '/../html/game/main.html', { }, function(err, html)  {
		if (err !== null) {
			res.send('Unknown request');
			//res.end();				
		} else {
			var path = req.url;
			var separator = path.lastIndexOf('/');
			var gameid = '';
			if (separator > -1) {
				gameid = path.substring(separator + 1);
			}

			if (gameid !== '') {
				req.session.gameid = gameid;
			} else {
				delete req.session.gameid;
			}
			res.send(html);
			//res.end();
		}
	});	
}