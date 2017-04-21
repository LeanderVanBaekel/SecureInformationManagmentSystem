var data = require('../data/testdata.js');
var dataFunctions = require('../data/dataFunctions.js');
var auth = require('../helpers/auth.js');

module.exports = {
  get : function(req, res){
    dataFunctions.getUserProjects(req, true).then((succes) => {
  		var recentProjects = succes;
  		res.render('dashboard', {req: req, title: 'Dashboard', recentProjects: recentProjects});
  	}).catch((err) => {
  		res.render('dashboard', {req: req, title: 'Dashboard', recentProjects: []});
  	});
  }
}
