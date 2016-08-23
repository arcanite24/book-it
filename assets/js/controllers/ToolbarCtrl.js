app.controller('ToolbarCtrl', function($scope, $state, $mdSidenav, $rootScope) {

  $scope.abrirSidenav = function () {
    $mdSidenav('left').toggle();
  }

  $rootScope.rootLogout = function () {
    $rootScope.logeado = false;
    $rootScope.token = null;
    $rootScope._user = null;
    if ($mdSidenav('left').isOpen()) {
      $mdSidenav('left').toggle();
    }
    $state.go('index');
  }
});
