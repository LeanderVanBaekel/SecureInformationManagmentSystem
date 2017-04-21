var data = require('../data/testdata.js');
var dataFunctions = require('../data/dataFunctions.js');
var dataSource = require('../data/dataSource.js');
// var auth = require('../helpers/auth.js');
// app.use(auth.login);

module.exports = {
  getFile : function(req, res){
    res.redirect('file/create');
  },

  getCreate : function(req, res){
    var data = {

    };

    res.render('files/createFile', {req: req, data: data})
  },

  postCreate: function(req, res) {
    console.log(req.body);
    res.redirect('/file/create');
  }
}
