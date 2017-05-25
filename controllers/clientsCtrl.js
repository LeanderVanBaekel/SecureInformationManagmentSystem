var data = require('../data/testdata.js');
var dataFunctions = require('../data/dataFunctions.js');
var dataSource = require('../data/dataSource.js');
// var auth = require('../helpers/auth.js');
// app.use(auth.login);

module.exports = {
  getClients : function(req, res){
    dataFunctions.getUserClients(req).then((succes) => {
  		var clients = succes;
      // res.send(projects);
      res.render('clients/clients', {req: req, title: 'Klanten', clients: clients});
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

      res.render('clients/createClient', {req: req, title: 'nieuwe klant', accounts: accounts})
    });
  },

  postCreate: function(req, res) {
    // console.log(req.body.clientName);

    var createClient = new dataSource.client(req.body.clientName, false);

    const clients = db.get('clients');
    clients.insert(createClient)
      .then((docs) => {
        console.log(docs);
        //save new project
        res.redirect('/clients');
      }).catch((err) => {
        console.log(err);
      })
  },

  getClient: function (req, res) {
    // res.send('client info')

    var projectsCall = dataFunctions.getClientProjects(req, req.params.clientId).then((succes) => {
  		return succes;
  	}).catch((err) => {
  		res.send(err);
  	});

    var clientCall = dataFunctions.getClient(req.params.clientId).then((succes) => {
  		return succes;
  	}).catch((err) => {
  		res.send(err);
  	});

    Promise.all([projectsCall, clientCall]).then(values => {
      console.log(values);
      var projects = values[0];
      var client = values[1];
      console.log(client);
      // res.send(projects)
      // res.render('search', {req: req, title: 'nieuw project', projects: projects, clients: clients, searchQ: searchQ});
      res.render('clients/clientProjects', {req: req, title: 'Projecten van ' + client.name, projects: projects});

    });

  }
}
