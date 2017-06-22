// server requirements
var express 			 = require('express');
		session 			 = require('express-session'),
		FileStore 		 = require('session-file-store')(session),
		http 					 = require('http'),
		bodyParser 		 = require('body-parser'),
		exphbs  			 = require('express-handlebars');
		app 					 = express(),
		server 				 = http.Server(app),

		fs						 = require('fs'),
		path					 = require('path'),
		cors					 = require('cors'),
		multer				 = require('multer'),

		// database requirements
		MongoClient 	 = require('mongodb'),
		monk					 = require('monk'),
		url 					 = 'localhost:27017/simsDB',
		db			 			 = monk(url),

		permissionData = require('./data/permissions.js'),
		dataSource		 = require('./data/dataSource.js');


// set upload path
const UPLOAD_PATH = './uploads';
const upload = multer({ dest: UPLOAD_PATH });

// Check database connection
db.then(() => {
  console.log('Connected correctly to server')
})
.then(() => db.close())

// set application variables
app.use( cors() );
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(session({
	secret: 'heeel moeilijk wachtwoord', // CHANGE THIS!!!
  store: new FileStore(),
  saveUninitialized: true,
  resave: false
}));

var hbs = exphbs.create({
	// Specify helpers which are only registered on this instance.
	defaultLayout: 'main',
	helpers: {
		ifEqual: function (var1, var2) {
			if (var1 == var2) {
				return true;
			} else {
				return false;
			}
		},
		first: function (arr) {
			return arr[0];
		},
		lower: function (var1, var2) {
			if ( var1 < var2 ) {
				return true;
			} else {
				return false;
			}

		}
	}
});

// app.engine('handlebars', exphbs({defaultLayout: 'main'}));

// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.engine('handlebars', hbs.engine);
// app.set('handlebars', { defaultLayout: 'main' });
app.set('view engine', 'handlebars');

// start server
server.listen(8080, () => console.log('listening on *:8080'));



// Middleware
function logger(req,res,next){
  console.log(new Date(), req.method, req.url);
  next();
}

app.use(logger);


var LogEnabled = true;
if (LogEnabled !== true) {
    console.log = function() {};
}


/////////////////////////////////////////////////
//  basic routes
/////////////////////////////////////////////////

var routes = require('./routes/routes');
app.use('/', routes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(res.locals.error);
});






// db route
app.get('/db/:collection', function(req, res, next) {
	const message = "";
	const collection = req.params.collection;

	let promise = new Promise((resolve, reject) => {
		const collectionDB = db.get(collection);
		collectionDB.find()
		.then((doc) => {
			resolve(doc);
		}).catch((err) => {
			console.log(err);
		});
	});

	promise.then((succes) => {
		res.send(succes);
	});


});



// add permissions to DB
const checkIfCollectionIsEmpty = function(collection) {
	const collectionDB = db.get(collection);

	collectionDB.findOne()
		.then((doc) => {
			if(doc === null){
				db.close();
				global[collection+'Init']();
			}
		})
};

permissionsInit = function() {
	const permissions = db.get('permissions');

	permissionData.permissions.forEach(function (permission) {
    permissions.insert(permission)
		.then(() => db.close())
	});
}

usersInit = function() {

	const users = db.get('users');

	var user = new dataSource.user('Raymond', 'Raymond Martens', 'admin@ac.nl', '12345', 'Beheerder', 6, 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAjBAAAAJDlkZjFiZWI5LWVkOWYtNGRjMC05MzRlLWUyM2YyN2NjOTdjNg.jpg');
	var user2 = new dataSource.user('Leander', 'Leander van Baekel', 'leander@ac.nl', '12345', 'Developer', 2, 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/5/005/08e/1af/2194742.jpg');
	var user3 = new dataSource.user('Gavin', 'Gavin Ligthart', 'gavin@ac.nl', '12345', 'Developer', 3, 'https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-1/p320x320/18119588_10213496199706256_7578411443375059057_n.jpg?oh=7e87fe4cb5b72b025fdb4e6b88d407bf&oe=59B28C7E');
	var user4 = new dataSource.user('Arthur', 'Arthur van Schravendijk', 'arthur@ac.nl', '12345', 'Developer', 4, 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/0af/32b/39ce7e1.jpg');
	var user5 = new dataSource.user('Niels', 'Niels van Dijke', 'niels@ac.nl', '12345', 'Stagiair', 5, 'https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-1/p100x100/17523399_10209144668319211_404166692964834715_n.jpg?oh=cc529741f06b94aa4a5ce0dbb9bb06a3&oe=59A5BC34');
	var user6 = new dataSource.user('Jesper', 'Jesper Honders', 'jesper@ac.nl', '12345', 'Release Manager', 1, 'https://pbs.twimg.com/profile_images/1308193012/IMG-20110411-00097_400x400.jpg');

	users.insert([user6,user2,user3,user4,user5,user])
		.then((docs) => {
			// console.log(docs);
		}).catch((err) => {
			console.log(err);
		})
}

function init() {
	checkIfCollectionIsEmpty('permissions');
	checkIfCollectionIsEmpty('users');
}

init()
