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

  }
}
