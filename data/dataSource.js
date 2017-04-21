module.exports = {
  user: function(userName, fullName, email, password, permissionId) {
    date = new Date();
    var newUser = {
      active: null,
      date: null,
      userName: '',
      fullName: '',
      email: '',
      password: '',
      permissionId: null,
      profilePicture: '',
      projects: [],
      recentProjects: []
    }
    newUser.active = true;
    newUser.date = date;
    newUser.userName = userName;
    newUser.fullName = fullName;
    newUser.email = email;
    newUser.password = password;
    newUser.permissionId = permissionId;
    return newUser;
  },

  client: function(name, logo) {
    date = new Date();
    var newClient = {
      active: true,
      date: null,
      name: '',
      projects: [],
      logo: ''
    }
    newClient.name = name;
    newClient.date = date;
    newClient.logo = logo;
    return newClient;
  },

  project: function(name, managerId, image, usersPermissions) {
    date = new Date();
    var newProject = {
      active: true,
      date: null,
      managerId: '', // user id
      dateModified: null,
      name: '',
      image: '',
      usersPermissions: [] //example: [[userId, permissionId], [userId, permissionId]]
    }


    newProject.name = name;
    newProject.managerId = managerId;
    newProject.date = date;
    newProject.image = image;
    newProject.usersPermissions = usersPermissions;
    return newProject;
  },

  authData: function(name, content, visable, permissionId) {
    date = new Date();
    var newAuthData = {
      date: null,
      dateModified: null,
      name: '',
      content: '',
      visable: true,
      permissionId: null
    }

    newAuthData.name = name;
    newAuthData.date = date;
    newAuthData.content = content;
    newAuthData.visable = visable;
    newAuthData.permissionId = permissionId;
    return newAuthData;
  },

  file: function(name, path, projectId, permissionId) {
    date = new Date();
    var newFile = {
      name: '',
      path: '', // example: ['design', 'poster']
      projectId: null,
      byUser: null,
      date: null,
      dateModified: null,
      permissionId: null
    }

    newFile.date = date;
    newFile.name = name;
    newFile.path = path;
    newFile.projectId = projectId;
    newFile.permissionId = permissionId;
    return newFile;
  }
}
