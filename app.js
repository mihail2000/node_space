/**
	Entry point for the application
*/

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
		maxAge : 100000000 }
	})
);

/**
	setTemplateVariables

	Helper function to make certain session objects / variables available to swig temlpates.
	Whenever there is a need for global access of variables in templates, add them in here.

	TODO: Should move this into some sort of helper module and add some sort of configuration array to pass to the function.
	e.g. 
	var config = [
		'current_user' : 'req.session.user',
		'gameid' : 'req.session.gameid'
	]

*/
setTemplateVariables = function(req) {
	if (req.session.user != null) {
		app.locals.current_user = req.session.user;
	} else {
		delete app.locals.current_user;
	}
	if (req.session.gameid != null) {
		app.locals.gameid = req.session.gameid;
	} else {
		delete app.locals.gameid;
	}
}

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!

// TODO: There is something weird happening with this freaking system. This currently matches all possible routes.
app.get('/|/signin|/signup|/game|/logout|/starsystem|/lobby', function (req, res) {
	setTemplateVariables(req);
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