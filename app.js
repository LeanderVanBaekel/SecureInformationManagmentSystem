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
  saveUninitialized: true,
  resave: false
}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// start server
server.listen(8080, () => console.log('listening on *:8080'));



/////////////////////////////////////////////////
//  basic routes
/////////////////////////////////////////////////

app.get('/', function(req, res) {
	res.redirect('/login');
});

app.get('/logout', function(req, res) {
	req.session.username ? req.session.destroy() : console.log('no username set');
	res.redirect('/');
});

var loginRouter = require('./routes/loginRouter');
app.use('/login', loginRouter);

var dashboardRouter = require('./routes/dashboardRouter');
app.use('/dashboard', dashboardRouter);

var clientsRouter = require('./routes/clientsRouter');
app.use('/clients', clientsRouter);

var projectsRouter = require('./routes/projectsRouter');
app.use('/projects', projectsRouter);

var manageRouter = require('./routes/manageRouter');
app.use('/manage', manageRouter);





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
