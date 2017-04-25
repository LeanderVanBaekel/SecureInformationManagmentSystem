

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
      }).catch((err) => {
				console.log(err);
		  }).then(() => db.close())
		})
	},

	getProjectData: function(id) {
		return new Promise((resolve, reject) => {
			const projects = db.get('projects');
    	projects.findOne({_id: id})
    	.then((doc) => {
    		if (doc) {
          resolve(doc)
        } else {
          reject('Geen project gevonden.')
        }
      }).catch((err) => {
				console.log(err);
		  }).then(() => db.close());
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
      }).catch((err) => {
				console.log(err);
		  }).then(() => db.close());
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
      }).catch((err) => {
				console.log(err);
		  }).then(() => db.close());
		})
	},

	getClients: function() {
		return new Promise((resolve, reject) => {
			const clients = db.get('clients');
  		clients.find()
  		.then((doc) => {
				if (doc) {
          resolve(doc)
        } else {
          reject('Geen clients gevonden.')
        }
  		}).catch((err) => {
				console.log(err);
		  }).then(() => db.close());
		})
	},

	saveFile: function(file) {
		return new Promise((resolve, reject) => {
			const files = db.get('files');
			files.insert(file)
			.then((doc) => {
				if (doc) {
					resolve(doc)
				} else {
					reject('File niet opgeslagen.')
				}
			}).catch((err) => {
				console.log(err);
			}).then(() => db.close());
		});
	},

	findRootFiles: function(projectId, containdIn) {
		return new Promise((resolve, reject) => {
			const files = db.get('files');
			files.findOne({projectId: projectId, containdIn: containdIn})
			.then((doc) => {
				if (doc) {

					files.find({containdIn: doc._id.toString()})
					.then((result) => {
						if (result) {
							data = {container: doc, contains: result};
							resolve(data)
						} else {
							reject('Files niet gevonden.')
						}
					}).catch((err) => {
						console.log(err);
					}).then(() => db.close());

				} else {
					reject('Files niet gevonden.')
				}
			}).catch((err) => {
				console.log(err);
			})
		});
	},

	findfolderAndContent: function(projectId, folderId) {
		return new Promise((resolve, reject) => {
			const files = db.get('files');
			files.findOne({projectId: projectId, _id: folderId})
			.then((doc) => {
				if (doc) {

					files.find({containdIn: doc._id.toString()})
					.then((result) => {
						if (result) {
							data = {container: doc, contains: result};
							resolve(data)
						} else {
							reject('Files niet gevonden.')
						}
					}).catch((err) => {
						console.log(err);
					}).then(() => db.close());

				} else {
					reject('Files niet gevonden.')
				}
			}).catch((err) => {
				console.log(err);
			})
		});
	}
};
