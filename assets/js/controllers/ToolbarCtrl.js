app.controller('ToolbarCtrl', function($scope, $state, $mdSidenav, $rootScope) {
  
  $rootScope.$on('$stateChangeSuccess', function (event) {
    if ($state.current.name != 'index') {
      if (!$rootScope.logeado) {
        $state.go('index');
      }
    }
  });

  $scope.abrirSidenav = function () {
    $mdSidenav('left').toggle();
  }

  $rootScope.rootLogout = function () {
    $rootScope.logeado = false;
    $rootScope.token = null;
    $rootScope._user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    if ($mdSidenav('left').isOpen()) {
      $mdSidenav('left').toggle();
    }
    $state.go('index');
  }
});
