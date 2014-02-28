/**
	Entry point for the application

	QC represents the top level object
*/

var QC = {
	app : null,
	config : {
		server_version: "0.0.1",
		server_name: "Dev Server",
		port: 3000,
		valid_routes: "/signin|/signup|/game|/logout|/starsystem|/lobby|/planet/:gameid/:starid|/game/:gameid"
	},
	init: function () {
		var express = require('express');
		QC.app = express();
		var swig  = require('swig');
		var MongoStore = require('connect-mongo')(express);

		// Initializing all necessary objects
		QC.app.engine('html', swig.renderFile);
		QC.app.use(express.bodyParser());
		QC.app.set('view engine', 'html');

		// Initialize public directories and views
		QC.app.set('views', __dirname + '/application/html');
		QC.app.use('/public', express.static(__dirname + '/public'));

		// Initialize session handler
		QC.app.use(express.cookieParser());
		QC.app.use(express.session( { 
			secret : 'lHDS4bObe68QtAnhZ9gRYOrZof3wGUkXZWwPUs9EABY63HbWGh0YYZ8mxRItsdX6ralOpN6XIB9NNbmeBDdHHfnWM0VzDkmt8shG' ,
			store: new MongoStore({
					db: 'space'
			}),
			cookie : {
				maxAge : 100000000 }
			})
		);


		// Enable / disable view cache
		// !!! NOTE: Don't leave both of these to `false` in production! !!!
		// !!! NOTE2: Don't set both to TRUE either :)

		// Enable / disable Express.js's cache
		QC.app.set('view cache', false);
		// Enable / disable Swig's cache
		swig.setDefaults({ cache: false });

		QC.app.get('/', function(req, res) {
			if (req.session.user !== null) {
				res.redirect('/lobby');
			} else {
				QC.setTemplateVariables(req);
				var core_controller = require(__dirname + '/application/controller/core.js');
				core_controller.route_get(req, res);				
			}
		});

		// Route all needed HTTP GET requests through here
		QC.app.get(QC.config.valid_routes, function (req, res) {
			// TODO: There is something weird happening with this freaking system. This currently matches all possible routes.
			QC.setTemplateVariables(req);
			var core_controller = require(__dirname + '/application/controller/core.js');
			core_controller.route_get(req, res);
		});

		// Route all API requests here
		QC.app.post('/api/*', function (req, res) {
			// Find the API call name
			var core_controller = require(__dirname + '/application/controller/core.js');
			core_controller.route_api(req, res);
		});

		// Launch the app
		// TODO: Read the port from a config file
		QC.app.listen(QC.config.port);
		console.log('----------------------');
		console.log('QuadCluster server ' + ' version: ' + QC.config.server_version);
		console.log('Server name : ' + QC.config.server_name);
		console.log('Listening on port ' + QC.config.port);
	},

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
	setTemplateVariables: function(req) {
		if (req.session.user != null) {
			QC.app.locals.current_user = req.session.user;
			QC.app.locals.user_data_credits = 1000;
		} else {
			delete QC.app.locals.current_user;
		}
		if (req.session.gameid != null) {
			QC.app.locals.gameid = req.session.gameid;
		} else {
			delete QC.app.locals.gameid;
		}
	}
};

QC.init();