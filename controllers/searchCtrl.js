var data = require('../data/testdata.js');
var dataFunctions = require('../data/dataFunctions.js');
var auth = require('../helpers/auth.js');

module.exports = {
  get : function(req, res){
    // dataFunctions.getUserProjects(req, true).then((succes) => {
  	// 	var recentProjects = succes;
  	// 	res.render('search', {req: req, title: 'Zoeken', recentProjects: recentProjects});
  	// }).catch((err) => {
  	// 	res.render('search', {req: req, title: 'Zoeken', recentProjects: []});
  	// });

    var searchQ = req.body.search

    var projectsCall = dataFunctions.getUserProjects(req, true).then((succes) => {
  		return succes;
  	}).catch((err) => {
  		res.send(err);
  	});

    var clientsCall = dataFunctions.getClients().then((succes) => {
      console.log('clients succes');
  		return succes;
  	}).catch((err) => {
  		res.send(err);
  	});

    Promise.all([projectsCall, clientsCall]).then(values => {
      console.log(values);
      var projects = values[0];
      var clients = values[1];

      res.render('search', {req: req, title: 'Zoeken op: "' + searchQ + '"', projects: projects, clients: clients, searchQ: searchQ});
    });




  }
}
