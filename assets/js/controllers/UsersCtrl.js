app.controller('UsersCtrl', function ($scope, $back, $help, $state, $rootScope, $sails) {
  
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
  
  $scope.registerUser = function (data) {
    if (data.password != data.repassword) {
      $help.toast('Las contraseñas no coinciden.');
      return;
    }
    $back.addUser(data).then(function (userCreated) {
      console.log('.then /user/addUser/', userCreated);
      if (!userCreated.err) {
        $help.toast('Usuario ' + userCreated.data.user.name + ' agregado.');
        $scope.registerdata = null;
      }
    }, function(err) {
      $help.toast('Error al agregar usuario... Verifica tus datos.');
    });
  }
  
  $scope.editUser = function (user) {
    $help.modalSimple('/templates/dialogs/edit-user.html', function($scope) {
      $scope.registerdata = user;
      $scope.borrarUser = function (id) {
        console.log('borrarUser', id);
        $back.removeUser(id).then(function(data) {
          console.log('borrarUser', data.data);
          $help.toast('Usuario eliminado...');
        });
      }
    });
  }
  
  //Navbar goto
  $rootScope.currentNavItem = $state.current.name;
  $scope.goto = function (state) {
    $rootScope.currentNavItem = state;
    $state.go(state);
  }
  
  //Sockets MODEL:USER
  $sails.on('user', function(msg) {
    switch(msg.verb) {
      case 'destroyed':
        if ($scope.allUsers) {
          $scope.allUsers = $scope.allUsers.filter(function(user) {
            return user.id != msg.id;
          });
        }
        break;
      
    }
  });
  
});