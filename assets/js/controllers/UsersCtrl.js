app.controller('UsersCtrl', function ($scope, $back, $help) {
  
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
  
});