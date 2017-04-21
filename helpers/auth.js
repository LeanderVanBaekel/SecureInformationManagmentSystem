module.exports = {
  // Middleware by Martijn Nieuwehuizen https://github.com/MartijnNieuwenhuizen
  login: (req, res, next) => {
    if (!req.session.userName) {
      console.log('niet ingelogd');
      // If there's no SessionID (so no logged in user), rederect
      res.redirect('/login');
    } else {
      // Set logedin to true
      // res.locals.loggedin = true;

      // Nothing on the hand, just continue
      console.log('CHECK: all good, continue');
      next();
    }
  },
  admin: (req, res, next) => {
    if (req.session.userName == 'admin') {
      next();
      // If there's no SessionID (so no logged in user), rederect
    } else {
      res.redirect('/dashboard');
    }
  },
  authenticate: function(req) {
    return new Promise((resolve, reject) => {
      const users = db.get('users');
    	users.findOne({userName: req.body.userName, password: req.body.password})
    	.then((doc) => {
    		if (doc) {
          resolve(doc)
        } else {
          reject('Gebruikersnaam of wachtwoord is onjuist.')
        }
      })
    })
  }
};
