app.factory('$back', function ($sails, $q) {
  return {

    register: function (datos) {
      return $sails.post('/api/user/register', datos);
    },

    login: function (datos) {
      return $sails.post('/api/user/login', datos);
    }

  };
});
