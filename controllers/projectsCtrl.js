var data = require('../data/testdata.js');
var dataFunctions = require('../data/dataFunctions.js');
var dataSource = require('../data/dataSource.js');
var helper = require('../helpers/functions.js');
// app.use(auth.login);

module.exports = {
  getProjects : function(req, res){
    dataFunctions.getUserProjects(req, false).then((succes) => {
  		var projects = succes;
  		res.render('projects/projects', {req: req, title: 'Projecten', projects: projects});
  	}).catch((err) => {
  		res.send(err);
  	});
  },

  getCreate : function(req, res){
    var accountsCall = dataFunctions.getUserAccounts().then((succes) => {
      var accounts = [];
      succes.forEach(function(account){
  			accounts.push({id:account._id, name:account.userName, permission:account.permissionId});
  		})
      console.log('accounts succes');
  		return accounts;
  	}).catch((err) => {
  		res.send(err);
  	});

    var clientsCall = dataFunctions.getClients().then((succes) => {
      console.log('clients succes');
  		return succes;
  	}).catch((err) => {
  		res.send(err);
  	});

    Promise.all([accountsCall, clientsCall]).then(values => {
      // console.log(values);
      var accounts = values[0];
      var clients = values[1];

      res.render('projects/createProject', {req: req, title: 'nieuw project', clients: clients, accounts: accounts});
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
  	users.findOne({_id: req.body.accountId[0]})
		.then((doc) => {
			var accounts = [[doc._id, doc.permissionId]];
			var newProject = new dataSource.project(req.body.projectName, req.body.managerId, '', accounts);
			const projects = db.get('projects');
			projects.insert(newProject)
				.then((doc) => {
					var project = doc;

          for (var i = 0; i < req.body.accountId.length; i++) {
            users.findOne({_id: req.body.accountId[i]}).then((doc) => {
              doc.projects.push(project._id)
              doc.recentProjects.push(project._id)

							users.update({_id: doc._id}, { $set: {projects: doc.projects, recentProjects: doc.recentProjects}})
							.then((result) => {
							}).catch((err) => {
								console.log(err);
							})
						}).catch((err) => {
							console.log(err);
						})
          }

					const clients = db.get('clients');
					clients.findOne({_id: req.body.client})
					.then((doc) => {
              var clientName = doc.name;

              projects.update({_id: project._id}, { $set: {clientName: clientName}})
							.then((result) => {
              }).catch((err) => {
								console.log(err);
							})

							doc.projects.push(project._id)

							clients.update({_id: doc._id}, { $set: {projects: doc.projects}})
							.then((result) => {
                helper.reloadProjectData(req, project._id);
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

  projectRedirect: function (req, res) {

    res.redirect(req.url + '/files');
  },


  getProjectFiles: function (req, res) {

    var data = {
      baseUrl: '/projects/' + req.params.projectId + '/files',
  		projectId: req.params.projectId,
      folder: req.params.folder,
      path: [] // array of map id's
  	};

    var projectDataCall = dataFunctions.getProjectData(data.projectId).then((succes) => {
      // console.log('project data succes');
      return succes;
    }).catch((err) => {
      res.send(err);
    });

    if (!req.params.folder) {
      // console.log('No folder is specified root is called');
      var fileCall = dataFunctions.findRootFiles(data.projectId, null).then((succes) => {
        // console.log(succes);
        // console.log('root files succes');
        return succes;
      }).catch((err) => {
        res.send(err);
      });
    } else {
      // console.log('Folder is specified data is called');
      var fileCall = dataFunctions.findFolderAndContent(data.projectId, data.folder).then((succes) => {
        // console.log('files succes');
        return succes;
      }).catch((err) => {
        res.send(err);
      });
    }


    getPath = function(folder) {
      var fileCall = dataFunctions.findFolder(folder).then((succes) => {
        // console.log(succes);
        return succes;
      }).catch((err) => {
        res.send(err);
      });
      fileCall.then(succes => {
        if(succes.containdIn != null) {
          data.path.push({id:succes._id, name:succes.name});
          getPath(succes.containdIn);
        } else {
          data.path.reverse();
          done();
        };
      });
    }

    var done = function() {
      Promise.all([fileCall, projectDataCall]).then(values => {
        data.container = values[0].container;
        data.files = values[0].contains;
        data.project = values[1];

        res.render('projects/projectFiles', {req: req, data: data, title: data.project.name})
      });
    }

    if (data.folder) {
      getPath(data.folder);
    } else {
      done();
    }

  },

  getProjectAuth: function (req, res) {
    var data = {
  		projectId: req.params.projectId,
  		title: req.params.projectId
  	};

    var projectDataCall = dataFunctions.getProjectData(data.projectId).then((succes) => {
      // console.log('project data succes');
      return succes;
    }).catch((err) => {
      res.send(err);
    });

    Promise.all([projectDataCall]).then(values => {
      data.project = values[0];

      res.render('projects/projectAuth', {req: req, data: data, title: data.project.name})

      // res.render('projects/createProject', {req: req, title: 'nieuw project', clients: clients, accounts: accounts});
    });
  }
}
