var express = require('express');
var router = express.Router();

var data = require('../data/testdata.js');
var dataFunctions = require('../data/dataFunctions.js');

var dataSource = require('../data/dataSource.js');

const auth = require('./helpers/auth');
app.use(auth.login);

router.route('/').get(function(req, res) {
	// var clients = dataFunctions.getUserClients(req.session.user, data);

	const clients = db.get('clients');
	clients.find({})
	.then((doc) => {
			console.log(doc);
			var clients = doc;

			res.render('clients/clients', {req: req, title: 'Klanten', clients: clients});
		}).catch((err) => {
			console.log(err);
		})
});


router.route('/new').get(function(req, res, next) {

	const users = db.get('users');
	users.find({})
	.then((doc) => {

		var accounts = [];

		doc.forEach(function(account){
			accounts.push({id:account._id, name:account.userName, permission:account.permissionId});
		})

		console.log(accounts);

		res.render('clients/newClient', {req: req, title: 'nieuwe klant', accounts: accounts})
	});
});


router.route('/new').post(function(req, res, next) {

	console.log(req.body.clientName);

	var newClient = new dataSource.client(req.body.clientName, false);

	const clients = db.get('clients');
	clients.insert(newClient)
		.then((docs) => {
			console.log(docs);
			//save new project
			res.redirect('/clients');
		}).catch((err) => {
			console.log(err);
		})
});


module.exports = router;
