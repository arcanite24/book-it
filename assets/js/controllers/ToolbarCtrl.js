app.controller('ToolbarCtrl', function($scope, $state, $mdSidenav, $rootScope, $mdDialog) {
  
  $rootScope.$on('$stateChangeSuccess', function (event) {
    console.log('State: ', $state.current.name);
  });

  $scope.abrirSidenav = function () {
    $mdSidenav('left').toggle();
  }
  
  $rootScope.closeModal = function () {
    $mdDialog.hide();
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
