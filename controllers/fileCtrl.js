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
    var fileName      = req.body.fileName;
    var root          = req.body.root;
    var type          = req.body.type;
    var filePath      = req.body.filePath;
    var containdIn     = req.body.contaidIn;
    var contains      = [];
    var projectId     = req.body.projectId;
    var byUser        = req.session.user._id;
    var permissionId  = req.body.permissionId;

    var newFile = dataSource.file(
      fileName,
      root,
      type,
      filePath,
      contains,
      projectId,
      byUser,
      permissionId
    );
    console.log(newFile);

    dataFunctions.saveFile(newFile)
    .then((succes) => {
      console.log(succes);
      res.redirect('/file/create');
    }).catch((err) => {
      res.send(err);
    });
  }
}
