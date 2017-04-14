var express = require('express');
var router = express.Router();

var data = require('../data/testdata.js');
var dataFunctions = require('../data/dataFunctions.js');

const auth = require('./helpers/auth');
app.use(auth.login);

router.route('/').get(function(req, res, next) {

	res.render('manage/manage', {req: req, title: 'Beheer'});
});


router.route('/accounts').get(function(req, res, next) {

	var accounts = dataFunctions.getAccounts(data, false);

	console.log(req.originalUrl);

	res.render('manage/accounts', {req: req, url: req.originalUrl, title: 'Beheer accounts', accounts: accounts});
});




module.exports = router;
