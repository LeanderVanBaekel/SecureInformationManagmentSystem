

module.exports = {

	// TODO: update user data if something changes

	getUserProjects: function(req, recent) {
		var searchIn;
		recent ? searchIn = req.session.user.recentProjects : searchIn = req.session.user.projects;

		return new Promise((resolve, reject) => {
			if (!searchIn) {return reject('Geen projecten gevonden.')};
			const projects = db.get('projects');
    	projects.find({_id: {$in:searchIn}})
    	.then((doc) => {
    		if (doc) {
          resolve(doc)
        } else {
          reject('Geen projecten gevonden.')
        }
      })
		})
	},

	getUserClients: function(req) {
		return new Promise((resolve, reject) => {
			const clients = db.get('clients');
    	clients.find()
    	.then((doc) => {
    		if (doc) {
          resolve(doc)
        } else {
          reject('Geen klanten gevonden.')
        }
      })
		})
	},

	getUserAccounts: function() {
		return new Promise((resolve, reject) => {
			const users = db.get('users');
    	users.find()
    	.then((doc) => {
    		if (doc) {
          resolve(doc)
        } else {
          reject('Geen users gevonden.')
        }
      })
		})
	}

};
