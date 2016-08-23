<<<<<<< HEAD
app.controller('MainCtrl', function($scope, $state, $back) {
  $scope.login = function (login) {
    $back.login(login).success(function(data) {
      console.log(data);
=======
app.controller('MainCtrl', function($scope, $state, $back, $help, $mdToast, $rootScope) {

  $rootScope.$state = $state;

  if ($rootScope.logeado) {
    $state.go('dashboard');
  }

  $scope.loginUser = function (datos) {
    if (datos.username && datos.password) {
      $back.login(datos).success(function (data) {
        if (data.err) {
          console.log(data.err);
          $mdToast.show($mdToast.simple().textContent("La contraseña o el nombre de usuario son incorrectas.").hideDelay(2000).parent(angular.element(document.body)));
        } else if (!data.token) {
          $mdToast.show($mdToast.simple().textContent("La contraseña o el nombre de usuario son incorrectas.").hideDelay(2000).parent(angular.element(document.body)));
        } else {
          console.log('Login Data', data);
          $rootScope._user = data.user;
          $rootScope.token = data.token;
          $rootScope.logeado = true;
          $mdToast.show($mdToast.simple().textContent("Sesión iniciada correctamente.").hideDelay(2000).parent(angular.element(document.body)));
          $state.go('dashboard');
        }
      }).error(function (err) {
        $mdToast.show($mdToast.simple().textContent("Error con el servidor al iniciar sesión.").hideDelay(2000));
      });
    }
  }

  $scope.registerUser = function (datos) {
    if (datos.password != datos.repassword) {
      $help.toast('Las contraseñas no coinciden.');
      return;
    }
    $back.register(datos).success(function(data) {
      if (!data.error) {
        $help.toast("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
        $state.go('index');
      }
    }).error(function (err) {
      console.log(err);
      $help.toast("Error con el servidor, intenta de nuevo.");
>>>>>>> 30e7b7f4811ac45e271f846f0d88c41bb4ff8ab2
    });
  }
});
