/**
	Lobby screen controller
*/

exports.acl = {
	'guest' : null,
	'user' : ['action_index']
}

exports.action_index = function(req, res) {

	res.render(__dirname + '/../html/lobby/index.html', { }, function(err, html)  {
		if (err !== null) {
			console.log(err);
			res.send('Unknown request');
		} else {
			res.send(html);
		}
	});	
}