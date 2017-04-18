

module.exports = {
	findAccount: function(name, password, data) {
		// function findAccount(accounts) {
	  //   return accounts.name === name;
		// }
		// return data.accounts.find(findAccount);

		const users = db.get('users');

		users.findOne({name: name, password: password}).then((doc) => {console.log(doc);})
	},
	getAccounts: function(data, query) {
		return data.accounts;
	},
	// getUserProjects: function(user, data, recent) {
	// 	var projects = [];
	// 	for (var i = 0; i < data.projects.length; i++) {
	// 		if (recent) {
	// 			if (user.recentProjects.indexOf(data.projects[i].id) >= 0) {
	// 				projects.push(data.projects[i]);
	// 			}
	// 		} else {
	// 			if (user.projects.indexOf(data.projects[i].id) >= 0) {
	// 				projects.push(data.projects[i]);
	// 			}
	// 		}
	// 	}
	// 	return projects;
	// },
	getUserClients: function(user, data) {
		var clients = [];
		var projects = this.getUserProjects(user, data, false);
		clientIds = [];
		for (var i = 0; i < projects.length; i++) {
			clientIds.push(projects[i].clientId);
		}

		for (var i = 0; i < data.clients.length; i++) {
			if (clientIds.indexOf(data.clients[i].id) >= 0) {
				clients.push(data.clients[i]);
			}
		}
		return clients;
	},

	// TODO: update user data if something changes

	getUserProjects: function(req) {
		return new Promise((resolve, reject) => {
			const projects = db.get('projects');
    	projects.find({_id: {$in:req.session.user.recentProjects}})
    	.then((doc) => {
    		if (doc) {
          resolve(doc)
        } else {
          reject('Geen projecten gevonden.')
        }
      })
		})
	},

};
