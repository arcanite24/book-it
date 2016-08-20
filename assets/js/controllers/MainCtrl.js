app.controller('MainCtrl', function($scope, $state, $back, $help) {
  $scope.loginUser = function (datos) {

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
    });
  }
});
