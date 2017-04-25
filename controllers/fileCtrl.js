var data = require('../data/testdata.js');
var dataFunctions = require('../data/dataFunctions.js');
var dataSource = require('../data/dataSource.js');
// var auth = require('../helpers/auth.js');
// app.use(auth.login);

module.exports = {
  getFile : function(req, res){
    res.redirect('/file/create');
  },

  getCreate : function(req, res){
    var data = {

    };
    res.render('files/createFile', {req: req, data: data})
  },

  postCreate: function(req, res) {
    var fileName      = req.body.fileName;
    // var root          = req.body.root;
    var type          = req.body.type;
    var filePath      = req.body.filePath;
    var containdIn     = req.body.containdIn;
    // var contains      = [];
    var projectId     = req.body.projectId;
    var byUser        = req.session.user._id;
    var permissionId  = req.body.permissionId;

    req.body.containdIn ? containdIn = req.body.containdIn : containdIn = null;

    var newFile = dataSource.file(
      fileName,
      // root,
      type,
      filePath,
      // contains,
      containdIn,
      projectId,
      byUser,
      permissionId
    );

    dataFunctions.saveFile(newFile)
    .then((succes) => {
      // res.redirect('/file/create');
      res.redirect(req.body.redirect);
    }).catch((err) => {
      res.send(err);
    });
  }
}
