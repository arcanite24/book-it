app.factory('$back', function ($sails, $q) {
  return {
  
    //Login & Register
    register: function (datos) {
      return $sails.post('/api/user/register', {datos: datos});
    },

    login: function (datos) {
      return $sails.post('/api/user/login', {username: datos.username, password: datos.password});
    },
    
    //Users management
    getAllUsers: function () {
      return $sails.get('/api/user');
    }

  };
});
