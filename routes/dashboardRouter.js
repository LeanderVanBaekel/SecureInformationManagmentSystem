var express = require('express');
var router = express.Router();

var data = require('../data/testdata.js');
var dataFunctions = require('../data/dataFunctions.js');
var dataSource		 = require('../data/dataSource.js');

const auth = require('./helpers/auth');
app.use(auth.login);

router.route('/').get(function(req, res, next) {

	dataFunctions.getUserProjects(req).then((succes) => {
		var recentProjects = succes;
		res.render('dashboard', {req: req, title: 'Dashboard', recentProjects: recentProjects});
	}).catch((err) => {
		res.send(err);
	});

});


module.exports = router;
