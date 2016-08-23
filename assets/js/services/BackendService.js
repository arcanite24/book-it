app.factory('$back', function ($sails, $q) {
  return {

    register: function (datos) {
      return $sails.post('/api/user/register', {datos: datos});
    },

    login: function (datos) {
<<<<<<< HEAD
      return $sails.post('/api/user/login', datos);
=======
      return $sails.post('/api/user/login', {username: datos.username, password: datos.password});
>>>>>>> 30e7b7f4811ac45e271f846f0d88c41bb4ff8ab2
    }

  };
});
