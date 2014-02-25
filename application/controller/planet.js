/**
	Planet conroller
*/

exports.acl = {
	'guest' : null,
	'user' : ['custom_route']
}

exports.custom_route = function(req, res) {
	res.render(__dirname + '/../html/planet/index.html', { }, function(err, html)  {
		if (err !== null) {
			res.send('Unknown request');
			//res.end();					
		} else {
			res.send(html);
			//res.end();
		}
	});	

	
/*
	var path = req.url;
	var separator = path.lastIndexOf('/');
	var starid = '';
	if (separator > -1) {
		starid = path.substring(separator + 1);
	}
	var separator2 = path.lastIndexOf('/', separator - 1);
	if (separator > -1) {
		gameid = path.substring(separator2 + 1, separator);
	}

	var api = require(__dirname + '/../api/star.js');			
	api.loadstardata( {gameid : gameid, starid : starid}, function(err, data){
		res.render(__dirname + '/../html/planet/index.html', { }, function(err, html)  {
			if (err !== null) {
				res.send('Unknown request');
				//res.end();					
			} else {
				res.send(html);
				//res.end();
			}
		});	
	});*/
}