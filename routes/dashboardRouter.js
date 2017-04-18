var express = require('express');
var router = express.Router();


var data = require('../data/testdata.js');
var dataFunctions = require('../data/dataFunctions.js');

var dataSource		 = require('../data/dataSource.js');

const auth = require('./helpers/auth');
app.use(auth.login);

router.route('/').get(function(req, res, next) {

	// var recentProjects = dataFunctions.getUserProjects(req.session.user, data, true);
	var recentProjects;

	res.render('dashboard', {req: req, title: 'Dashboard', recentProjects: recentProjects});
});


module.exports = router;
