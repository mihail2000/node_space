/** 
	Starsystem controller

	This controller is responsible on handling starsystem screen.
	All requests come here in a format of /starsystem/<starsystem_name>
	--> that's why there is a custom route in place to handle everything here in the same place
*/
exports.custom_route = function(req, res) {
	res.render(__dirname + '/../html/starsystem/index.html', { }, function(err, html)  {
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

exports.action_index = function(req, res) {
	res.end();
}