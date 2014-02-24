/**
	Planet conroller
*/

exports.acl = {
	'guest' : null,
	'user' : ['custom_route']
}

exports.custom_route = function(req, res) {
	res.render(__dirname + '/../html/planet/index.html', { current_user : req.session.user }, function(err, html)  {
		if (err !== null) {
			res.send('Unknown request');
			//res.end();					
		} else {
			res.send(html);
			//res.end();
		}
	});	
}