var data = require('../data/testdata.js');
var dataFunctions = require('../data/dataFunctions.js');
var auth = require('../helpers/auth.js');

// app.use(auth.login)

module.exports = {
  getSlash : function(req, res){
    res.redirect('/login');
  },

  get : function(req, res){
    if (req.session.userName) {
      res.redirect('/dashboard');
      return;
    }
    res.render('login', {req: req, title: 'Login'});
  },

  post : function(req, res){
    auth.authenticate(req).then((succes) => {

  		req.session.user = succes;
  		req.session.userName = succes.userName;
  		res.redirect('/dashboard');

  	}).catch((err) => {

  		res.render('login', {
  			title: 'Login',
  			username: req.body.username,
  			password: req.body.password,
  			error: err
  		});
  	});
  },
  logout: function(req, res) {
  	req.session.userName ? req.session.destroy() : console.log('no username set');
  	res.redirect('/');
  }
}
