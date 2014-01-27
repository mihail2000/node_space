var express = require('express');
var swig  = require('swig');
var app = express();

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

app.post('/api/register', function (req, res) {
	var crypto = require('crypto');
	var MongoClient = require('mongodb').MongoClient;

	MongoClient.connect('mongodb://localhost/space', function(err, db) {
		if(err) throw err;
		
		var collection = db.collection('users');
		collection.find( { $or: [ { 'username' : req.body.username }, { 'email' : req.body.email } ] }).toArray(function(err, docs) {
			if (docs.length > 0) {
				console.log('User already exists');
			} else {
				var hash = crypto.createHash('md5').update(req.body.pwd).digest('hex');
				var user = {
					username : req.body.username,
					email : req.body.email,
					password : hash
				};

				db.collection('users').insert(user, function(err, records) {
					if (err) throw err;
					console.log("Record added as "+records[0]._id);
				});
			}
        });
	})
});

app.listen(3000);
console.log('Listening on port 3000');