var express = require('express');
var app = express();
var swig  = require('swig');

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/html');

app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.use(express.bodyParser());

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!

app.get('/', function (req, res) {
	res.render('index', { });
});

app.get('/signup', function (req, res) {
	res.render('signup', { });
});

app.post('/api/*', function (req, res) {
	// Find the API call name
	var i = req.route.params[0].search('/');
	
	if (i > -1) {
		var api_controller_name = req.route.params[0].substring(0, i);
		// Find the function name
		var function_name = req.route.params[0].substring(i + 1);

		if (function_name !== '') {
			var api = require('./application/api/' + api_controller_name + '.js');			
			api[function_name](req.body, function(data, error) { 
				if (error === null) {
					res.redirect('/');
					res.end();					
					//res.end(data);
				} else {
					res.send({error: 'Error occurred'});
					res.end();
				}
			});
		} else {
			res.end('Unknown request');
		}
	} else {
		res.end('Unknown request');		
	}

});

app.listen(3000);
console.log('Listening on port 3000');