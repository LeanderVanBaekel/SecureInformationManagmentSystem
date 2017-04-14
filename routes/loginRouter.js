var express = require('express');
var router = express.Router();

var data = require('../data/testdata.js');
var dataFunctions = require('../data/dataFunctions.js');
var auth = require('./helpers/auth.js');

router.route('/').get(function(req, res) {
	if (req.session.userName) {
		res.redirect('/dashboard');
		return;
	}
	res.render('login', {req: req, title: 'Login'});
});


router.route('/').post(function(req, res) {
	auth.authenticate(req).then((succes) => {

		req.session.userName = succes.userName;
		res.redirect('/dashboard');

	}).catch((err) => {

		res.render('login', {
			title: 'Login',
			username: req.body.username,
			password: req.body.password,
			error: err
		});
	});
});

module.exports = router;
