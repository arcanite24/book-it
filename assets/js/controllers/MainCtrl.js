app.controller('MainCtrl', function($scope, $state, $back) {
  $scope.login = function (login) {
    $back.login(login).success(function(data) {
      console.log(data);
    });
  }
});
