var express = require('express');
var router = express.Router();
var auth = require('../helpers/auth.js');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

// app.get('/', function(req, res) {
// 	res.redirect('/login');
//   // res.send('hoi');
// });


// login
var loginCtrl = require('../controllers/loginCtrl');
router.get('/', loginCtrl.getSlash);
router.get('/login', loginCtrl.get);
router.post('/login', loginCtrl.post);
router.get('/logout', loginCtrl.logout);

// dashboard
var dashboardCtrl = require('../controllers/dashboardCtrl');
router.get('/dashboard', auth.login, dashboardCtrl.get);

// projects
var projectsCtrl = require('../controllers/projectsCtrl');
router.get('/projects', auth.login, projectsCtrl.getProjects);
router.get('/projects/create', auth.login, projectsCtrl.getCreate);
router.post('/projects/create', auth.login, projectsCtrl.postCreate);
router.get('/projects/:projectId', auth.login, projectsCtrl.projectRedirect);
router.get('/projects/:projectId/auth', auth.login, projectsCtrl.getProjectAuth);
// router.get('/projects/:projectId/files', auth.login, projectsCtrl.getProjectFiles);
router.get('/projects/:projectId/files/:folder?', auth.login, projectsCtrl.getProjectFiles);

// clients
var clientsCtrl = require('../controllers/clientsCtrl');
router.get('/clients', auth.login, clientsCtrl.getClients);
router.get('/clients/create', auth.login, clientsCtrl.getCreate);
router.post('/clients/create', auth.login, clientsCtrl.postCreate);
router.get('/clients/:clientId', auth.login, clientsCtrl.getClient);

// manage
var manageCtrl = require('../controllers/manageCtrl');
router.get('/manage', auth.login, auth.admin, manageCtrl.getManage);
router.get('/manage/accounts', auth.login, auth.admin, manageCtrl.getAccounts);

// file handeling
var fileCtrl = require('../controllers/fileCtrl');
router.get('/file', auth.login, fileCtrl.getFile);
router.get('/file/create', auth.login, fileCtrl.getCreate);
router.post('/file/create', auth.login, upload.array('file'), fileCtrl.postCreate);


module.exports = router;
