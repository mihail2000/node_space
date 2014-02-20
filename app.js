/**
 * Module dependencies.
 */
var express = require('express');
var app = express();
var swig  = require('swig');
var MongoStore = require('connect-mongo')(express);
var MatuFW = {};
/**
 * Initializing all necessary objects
 */

app.engine('html', swig.renderFile);
app.use(express.bodyParser());
app.set('view engine', 'html');
app.set('views', __dirname + '/application/html');
app.use('/public', express.static(__dirname + '/public'));
app.use(express.cookieParser());
app.use(express.session( { 
	secret : 'lHDS4bObe68QtAnhZ9gRYOrZof3wGUkXZWwPUs9EABY63HbWGh0YYZ8mxRItsdX6ralOpN6XIB9NNbmeBDdHHfnWM0VzDkmt8shG' ,
	store: new MongoStore({
			db: 'space'
	}),
	cookie : {
		maxAge : 1000000 }
	})
);

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!

/**
 * Initialize routes based on available controllers
 * TODO: This is not very scalable solution
 */
/*MatuFW.initializeRoutes = function() {
	var fs = require('fs');
	fs.readdir(__dirname + '/application/controller', function(err, files) {
		var routes = '/';

		for (var i = 0; i < files.length; i++) {
			routes += '|' + files;
		}
		console.log(routes);
	});
}

*/

app.get('/|/signin|/signup|/game|/logout|/starsystem|/lobby', function (req, res) {
	var core_controller = require(__dirname + '/application/controller/core.js');
	core_controller.route_get(req, res);
});

app.post('/api/*', function (req, res) {
	// Find the API call name
	var core_controller = require(__dirname + '/application/controller/core.js');
	core_controller.route_api(req, res);
});

app.listen(3000);
console.log('Listening on port 3000');