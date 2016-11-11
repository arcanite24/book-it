app.controller('PoemaCtrl', function ($scope, $state, $http, $help, $mdDialog, toastr, $rootScope) {
  
  $scope.editorOptions = {
    language: 'es',
    uiColor: '#ffffff' 
  };
  
  $scope.loadPoema = function () {
    var id = $state.params.id;
    $http.get('/api/poema/'+id).then(function (data) {
      $scope.poema = data.data;
    });
  }
  
  $scope.openEditPoema = function (id) {
    $state.go('poema-edit', {id: id});
  }
  
  $scope.openChangeState = function () {
    $help.modalSimple('/templates/dialogs/poema-change-state.html', 'PoemaCtrl');
  } 
  
  $scope.returnToPoemaIndex = function (id) {
    $state.go('poema-detail', {id: id});
  }
  
  $scope.updatePoema = function (cap) {
    $rootScope.rootLoader = true;
    $http.put('/api/poema/'+cap.id, {
      text: cap.text,
      name: cap.name
    }).then(function (data) {
      toastr.success('Poema guardado correctamente.', '¡Exito!');
      $rootScope.rootLoader = false;
    }).catch(function (err) {
      toastr.success('No se ha podido guardar el poema.', '¡Error!');
      $rootScope.rootLoader = false;
    });
  }
  
  $scope.changePoemaState = function (state) {
    var id = $state.params.id;
    $rootScope.rootLoader = true;
    $http.put('/api/poema/'+id, {
      estado: state
    }).then(function (data) {
      toastr.success('Estado actualizado correctamente.', '¡Exito!');
      $rootScope.rootLoader = false;
      $mdDialog.hide();
      $state.reload();
    }).catch(function (err) {
      toastr.success('No se ha podido actualizar el estado.', '¡Error!');
      $rootScope.rootLoader = false;
    });
  }
  
});