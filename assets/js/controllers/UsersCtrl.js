app.controller('UsersCtrl', function ($scope, $back, $help, $state, $rootScope) {
  
  //Manage users
  $scope.initManageUsers = function () {
    
    $scope.allUsersTableConfig = {
      itemsPerPage: 5,
      fillLastPage: true
    };
    
    $back.getAllUsers().then(function (data) {
      $scope.allUsers = data.data;
    });
    
  }
  
  //Navbar goto
  $rootScope.currentNavItem = $state.current.name;
  $scope.goto = function (state) {
    $rootScope.currentNavItem = state;
    $state.go(state);
  }
  
});