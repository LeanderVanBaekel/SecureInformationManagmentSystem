var data = require('../data/testdata.js');
var dataFunctions = require('../data/dataFunctions.js');
var dataSource = require('../data/dataSource.js');
// var auth = require('../helpers/auth.js');
// app.use(auth.login);

module.exports = {
  getProjects : function(req, res){
    dataFunctions.getUserProjects(req, false).then((succes) => {
  		var projects = succes;
      console.log(succes);
  		res.render('projects/projects', {req: req, title: 'Projecten', projects: projects});
  	}).catch((err) => {
  		res.send(err);
  	});
  },

  getCreate : function(req, res){
    const users = db.get('users');
  	users.find({})
  	.then((doc) => {

  		var accounts = [];

  		doc.forEach(function(account){
  			accounts.push({id:account._id, name:account.userName, permission:account.permissionId});
  		})
  		console.log(accounts);
  		const clients = db.get('clients');
  		clients.find({})
  		.then((doc) => {
  			var clients = doc;
  			res.render('projects/createProject', {req: req, title: 'nieuw project', clients: clients, accounts: accounts})
  		});
  	});
  },

  postCreate: function(req, res) {
    console.log(req.body.client);
  	console.log(req.body.projectName);
  	console.log(req.body.accountId);

  	// TODO
  	// project aan klant toeveoegen!!
  	// account met permission koppelen aan prject
  	// projecten laden in project overzicht

  	const users = db.get('users');
  	users.findOne({_id: req.body.accountId})
		.then((doc) => {
			var accounts = [[doc._id, doc.permissionId]];
			var newProject = new dataSource.project(req.body.projectName, req.body.managerId, '', accounts);

			const projects = db.get('projects');
			projects.insert(newProject)
				.then((doc) => {
					var project = doc;

					const clients = db.get('clients');
					clients.findOne({_id: req.body.client})
					.then((doc) => {
							doc.projects.push(project._id)

							clients.update({_id: doc._id}, { $set: {projects: doc.projects}})
							.then((result) => {
								console.log(result);
								res.redirect('/projects');

							}).catch((err) => {
								console.log(err);
							})
						}).catch((err) => {
							console.log(err);
						})
				}).catch((err) => {
					console.log(err);
				})
		}).catch((err) => {
			console.log(err);
		});
  },

  getProject: function (req, res) {
    var data = {
  		projectId: req.params.projectId,
  		location: req.params.location,
  		title: req.params.projectId

  	};

  	if (data.location == undefined) {
  		data.location = 'files';
  	};

  	res.render('projects/projectDetail', {req: req, data: data, title: data.title})
  }
}