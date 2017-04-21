var express = require('express');
var router = express.Router();

var data = require('../data/testdata.js');
var dataFunctions = require('../data/dataFunctions.js');
var dataSource = require('../data/dataSource.js');

const auth = require('./helpers/auth');
app.use(auth.login);

router.route('/').get(function(req, res, next) {
  res.redirect('file/create');
});


router.route('/create').get(function(req, res, next) {
  var data = {

  };

  res.render('files/createFile', {req: req, data: data})
});


router.route('/create').post(function(req, res, next) {
  console.log(req.body);
  res.redirect('/file/create');
});

module.exports = router;
