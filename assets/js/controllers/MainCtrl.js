app.controller('MainCtrl', function($scope, $state, $back, $help, $mdToast, $rootScope) {

  $rootScope.$state = $state;

  if ($rootScope.logeado) {
    $state.go('dashboard');
  }
  
  if (!$rootScope._user) {
    if ($state.current.name == 'register' || $state.current.name == 'lostpassword') {
      return;
    }
    if (localStorage.getItem('user')) {
      $rootScope._user = JSON.parse(localStorage.getItem('user'));
      $rootScope.token = localStorage.getItem('token');
      $rootScope.logeado = true;
      $state.go('dashboard');
    } else {
      $state.go('index');
    }
  }
  
  $scope.registerUser = function (datos) {
    console.log('wea')
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
    });
  }
  
  $scope.loginUser = function (datos) {
    if (datos.username && datos.password) {
      $back.login(datos).success(function (data) {
        if (data.err) {
          $mdToast.show($mdToast.simple().textContent("La contraseña o el nombre de usuario son incorrectas.").hideDelay(2000).parent(angular.element(document.body)));
        } else if (!data.token) {
          $mdToast.show($mdToast.simple().textContent("La contraseña o el nombre de usuario son incorrectas.").hideDelay(2000).parent(angular.element(document.body)));
        } else {
          $rootScope._user = data.user;
          $rootScope.token = data.token;
          $rootScope.logeado = true;
          localStorage.setItem('user', JSON.stringify($rootScope._user));
          localStorage.setItem('token', $rootScope.token);
          $mdToast.show($mdToast.simple().textContent("Sesión iniciada correctamente.").hideDelay(2000).parent(angular.element(document.body)));
          $state.go('dashboard');
        }
      }).error(function (err) {
        $mdToast.show($mdToast.simple().textContent("Error con el servidor al iniciar sesión.").hideDelay(2000));
      });
    }
  }
  
});
