var express = require('express');
var swig  = require('swig');
var app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/html');

app.use('/js', express.static('js'));
app.use('/css', express.static('css'));

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

app.listen(3000);
console.log('Listening on port 3000');