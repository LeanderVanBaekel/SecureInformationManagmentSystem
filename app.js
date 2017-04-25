// server requirements
var express 			 = require('express');
		session 			 = require('express-session'),
		http 					 = require('http'),
		bodyParser 		 = require('body-parser'),
		exphbs  			 = require('express-handlebars');
		app 					 = express(),
		server 				 = http.Server(app),

		// database requirements
		MongoClient 	 = require('mongodb'),
		monk					 = require('monk'),
		url 					 = 'localhost:27017/simsDB',
		db			 			 = monk(url),

		permissionData = require('./data/permissions.js'),
		dataSource		 = require('./data/dataSource.js');


// Check database connection
db.then(() => {
  console.log('Connected correctly to server')
})
.then(() => db.close())

// set application variables
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: '1234567890!@#$%^&*()_+',
  saveUninitialized: false,
  resave: true
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
		bar: function () { return 'BAR!'; }
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

	var user = new dataSource.user('admin', 'administrator', 'admin@ac.nl', '12345', 1);
	var user2 = new dataSource.user('leander', 'Leander van Baekel', 'leander@ac.nl', '12345', 3);

	users.insert([user,user2])
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
