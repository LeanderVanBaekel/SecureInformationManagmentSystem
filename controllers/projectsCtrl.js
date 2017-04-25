var data = require('../data/testdata.js');
var dataFunctions = require('../data/dataFunctions.js');
var dataSource = require('../data/dataSource.js');
var helper = require('../helpers/functions.js');
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

    var accountsCall = dataFunctions.getUserAccounts().then((succes) => {
      var accounts = [];
      succes.forEach(function(account){
  			accounts.push({id:account._id, name:account.userName, permission:account.permissionId});
  		})
  		return accounts;
      console.log('accounts succes');
  	}).catch((err) => {
  		res.send(err);
  	});

    var clientsCall = dataFunctions.getClients().then((succes) => {
  		return succes;
      console.log('clients succes');
  	}).catch((err) => {
  		res.send(err);
  	});

    Promise.all([accountsCall, clientsCall]).then(values => {
      console.log(values);
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

  projectRedirect: function (req, res) {

    res.redirect(req.url + '/files');
  },


  getProjectFiles: function (req, res) {

    var data = {
      baseUrl: '/projects/' + req.params.projectId + '/files',
  		projectId: req.params.projectId,
  		title: req.params.projectId,
      folder: req.params.folder
  	};

    if (!req.params.folder) {
      console.log('No folder is specified root is called');
      var fileCall = dataFunctions.findRootFiles(data.projectId, null).then((succes) => {
        // console.log(succes);
        console.log('root files succes');
        return succes;
      }).catch((err) => {
        res.send(err);
      });
    } else {
      console.log('Folder is specified data is called');
      var fileCall = dataFunctions.findfolderAndContent(data.projectId, data.folder).then((succes) => {
        console.log('files succes');
        return succes;
      }).catch((err) => {
        res.send(err);
      });
    }


    Promise.all([fileCall]).then(values => {
      data.container = values[0].container;
      data.files = values[0].contains;

      res.render('projects/projectFiles', {req: req, data: data, title: data.title})

      // res.render('projects/createProject', {req: req, title: 'nieuw project', clients: clients, accounts: accounts});
    });
  },

  getProjectAuth: function (req, res) {
    var data = {
  		projectId: req.params.projectId,
  		title: req.params.projectId
  	};

    var rootFileCall = dataFunctions.findRootFiles(data.projectId).then((succes) => {
      return succes;
      console.log('clients succes');
    }).catch((err) => {
      res.send(err);
    });

    Promise.all([rootFileCall]).then(values => {
      console.log(values);
      data.rootFiles = values[0];

      res.render('projects/projectAuth', {req: req, data: data, title: data.title})

      // res.render('projects/createProject', {req: req, title: 'nieuw project', clients: clients, accounts: accounts});
    });
  }
}
