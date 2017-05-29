var data = require('../data/testdata.js');
var dataFunctions = require('../data/dataFunctions.js');
var dataSource = require('../data/dataSource.js');
// var auth = require('../helpers/auth.js');
// app.use(auth.login);

module.exports = {
  getFile : function(req, res){
    res.redirect('/file/create');
  },

  serveFile : function(req, res){
    var fileId = req.params.fileId;
    var projectId = req.params.projectId;

    var getFile = dataFunctions.findFile(fileId).then((succes) => {
      console.log(succes);
      return succes;
    }).catch((err) => {
      res.send(err);
    });

    Promise.all([getFile]).then(values => {
      // data.container = values[0].container;
      if (req.params.action == 'view') {
        res.sendfile('./storage/projects/' + projectId + '/' + values[0].name);
      } else if (req.params.action == 'delete' ||req.params.action == 'folder') {
        res.redirect(req.get('referer'));
      } else {
        res.download('./storage/projects/' + projectId + '/' + values[0].name);
      }
    });
  },

  getCreate : function(req, res){
    var data = {

    };
    res.render('files/createFile', {req: req, data: data})
  },

  // postCreate: function(req, res) {
  //   var fileName      = req.files[0].originalname;
  //   // var root          = req.body.root;
  //   var type          = req.body.type;
  //   var filePath      = "storage/projects/" + projectId + "/" + req.files[0].originalname;
  //   var containdIn     = req.body.containdIn;
  //   // var contains      = [];
  //   var projectId     = req.body.projectId;
  //   var byUser        = req.session.user._id;
  //   var permissionId  = req.body.permissionId;
  //
  //   req.body.containdIn ? containdIn = req.body.containdIn : containdIn = null;
  //
  //   var upload = req.files;
  //   console.log(upload);
  //
  //   for (var i = 0; i < upload.length; i++) {
  //     // console.log("storage/projects/" + projectId + "/" + upload[i].originalname);
  //     // filePath = "storage/projects/" + projectId + "/" + upload[i].originalname;
  //     var dir = "storage/projects/" + projectId;
  //     if (!fs.existsSync(dir)){
  //       fs.mkdirSync(dir);
  //     }
  //     fs.rename(upload[i].path, "storage/projects/" + projectId + "/" + upload[i].originalname, function (err) {
  // 			if(err){
  // 				res.send(err);
  // 			} else {
  //         // console.log(upload[0]);
  //         // filePath = "storage/projects/" + projectId + "/" + upload[0].originalname;
  //       }
  //     });
  //   }
  //
  //   var newFile = dataSource.file(
  //     fileName,
  //     // root,
  //     type,
  //     filePath,
  //     // contains,
  //     containdIn,
  //     projectId,
  //     byUser,
  //     permissionId
  //   );
  //
  //
  //   dataFunctions.saveFile(newFile)
  //   .then((succes) => {
  //     // res.redirect('/file/create');
  //     res.redirect(req.body.redirect);
  //   }).catch((err) => {
  //     res.send(err);
  //   });
  // },

  postCreate: function(req, res) {

    var containdIn    = req.body.containdIn;
    var projectId     = req.body.projectId;
    var byUser        = req.session.user._id;
    var permissionId  = req.body.permissionId;
    var type          = req.body.type;

    if (req.body.type == 'folder') {
      var fileName      = req.body.fileName;
      var filePath      = req.body.filePath;

    } else {
      var fileName      = req.files[0].originalname;
      var filePath      = "storage/projects/" + projectId + "/" + req.files[0].originalname;

      var upload = req.files;
      console.log(upload);

      for (var i = 0; i < upload.length; i++) {
        var dir = "storage/projects/" + projectId;
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
        fs.rename(upload[i].path, "storage/projects/" + projectId + "/" + upload[i].originalname, function (err) {
          if(err){
            res.send(err);
          }
        });
      } // end for
    } // end else

    req.body.containdIn ? containdIn = req.body.containdIn : containdIn = null;

    var newFile = dataSource.file(fileName, type, filePath, containdIn, projectId, byUser, permissionId);
    dataFunctions.saveFile(newFile)
    .then((succes) => {
      // res.redirect('/file/create');
      res.redirect(req.body.redirect);
    }).catch((err) => {
      res.send(err);
    });

  }
}
