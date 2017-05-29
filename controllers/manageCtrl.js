var data = require('../data/testdata.js');
var dataFunctions = require('../data/dataFunctions.js');
var dataSource = require('../data/dataSource.js');
// var auth = require('../helpers/auth.js');
// app.use(auth.login);

module.exports = {
  getManage : function(req, res){
		res.render('manage/manage', {req: req, title: 'Beheer'});
  },
  getAccounts: function(req, res) {
    dataFunctions.getUserAccounts()
    .then((succes) => {
      console.log(succes);
      res.render('manage/accounts', {req: req, url: req.originalUrl, title: 'Beheer accounts', accounts: succes});
    }).catch((err) => {
      res.send(err);
    });
  },
  getAccount: function(req, res) {

    var id = req.params.account

    var getAccount = dataFunctions.getUserAccount(id)
    .then((succes) => {
      console.log(succes);
      return succes;
    }).catch((err) => {
      res.send(err);
    });

    Promise.all([getAccount]).then(values => {
      console.log(values);
      data = {account: values[0]};

      res.render('manage/account', {req: req, data: data, title: data.account.userName + "'s account"});
    });

  },

  createAccount: function(req, res) {


    var getPermissions = dataFunctions.getPermissions()
    .then((succes) => {
      return succes;
    }).catch((err) => {
      res.send(err);
    });

    Promise.all([getPermissions]).then(values => {
      data = {permissions: values[0]};
      res.render('manage/create', {req: req, data: data, title: "account aanmaken"});
    });

  },

  postCreate: function(req, res) {

    var user = new dataSource.user(req.body.userName, req.body.name, req.body.email, '12345', req.body.roll, req.body.level, req.body.avatar);

    const users = db.get('users');
    users.insert(user)
  		.then((docs) => {
  			console.log(docs);
        res.redirect('/manage/accounts');
  		}).catch((err) => {
  			console.log(err);
  		}).then(() => db.close())
    //
    // var getPermissions = dataFunctions.getPermissions()
    // .then((succes) => {
    //   console.log(succes);
    //   return succes;
    // }).catch((err) => {
    //   res.send(err);
    // });
    //
    // Promise.all([getAccount]).then(values => {
    //   console.log(values);
    //   data = {permissions: values[0]};


    // });

  },

}
