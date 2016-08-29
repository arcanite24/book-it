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
    $rootScope.rootLoader = true;
    $back.addUser(data).then(function (userCreated) {
      $rootScope.rootLoader = false;
      if (!userCreated.err) {
        $help.toast('Usuario ' + userCreated.data.user.name + ' agregado.');
        $scope.registerdata = null;
      }
    }, function(err) {
      $help.toast('Error al agregar usuario... Verifica tus datos.');
    });
  }
  
  $scope.editUser = function (user) {
    $help.modalSimple('/templates/dialogs/edit-user.html', function($scope, $mdDialog) {
      $scope.registerdata = user;
      $scope.borrarUser = function (id) {
        $scope.loader = true;
        $back.removeUser(id).then(function(data) {
          $scope.loader = false;
          $help.toast('Usuario eliminado...');
          $state.reload();
          $mdDialog.hide();
        });
      }
      
      $scope.editarUser = function (data) {
        $rootScope.rootLoader = true;
        var editUserData = {
          name: data.name,
          edad: data.edad,
          pregunta: data.pregunta,
          respuesta: data.respuesta
        };
        $back.editUser(data.id, editUserData).then(function (thenData) {
          $rootScope.rootLoader = false;
          if (thenData.status == 200) {
            $help.toast('Usuario editado correctamente.');
          } else {
            $help.toast('Error editando usuario. Verifica tus datos.');
          }
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