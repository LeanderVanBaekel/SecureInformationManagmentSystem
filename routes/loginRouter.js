var express = require('express');
var router = express.Router();

var data = require('../data/testdata.js');
var dataFunctions = require('../data/dataFunctions.js');

router.route('/').get(function(req, res) {
	if (req.session.userName) {
		res.redirect('/dashboard');
		return;
	}

	res.render('login', {req: req, title: 'Login'});
});


router.route('/').post(function(req, res) {

  // req.session.user = dataFunctions.findAccount(req.body.username, req.body.password, data);
	const users = db.get('users');
	users.findOne({userName: req.body.userName, password: req.body.password})
	.then((doc) => {
		console.log(doc);
		if (doc) {
			req.session.userName = doc.userName;
			res.redirect('/dashboard');
		} else {
			res.render('login', {
	      title: 'Login',
	      username: req.body.username,
	      password: req.body.password,
	      error: 'Gebruikersnaam of wachtwoord is onjuist.'
	    });
		};
	});
	//
	// if (req.session.user) {
  // 	if (req.session.user.password === req.body.password) {
  //     req.session.username = req.body.username;
  //     res.redirect('/dashboard');
  //     return;
  //   } else {
  //     req.session.user = undefined;
  //     res.render('login', {
  //       title: 'Login',
  //       username: req.body.username,
  //       password: '',
  //       error: 'Wachtwoord is onjuist.'
  //     })
  //   }
  // } else {
  // 	res.render('login', {
  //     title: 'Login',
  //     username: req.body.username,
  //     password: req.body.password,
  //     error: 'Gebruikersnaam is onjuist.'
  //   })
  // }
});

module.exports = router;
