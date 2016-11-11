app.controller('CuentoCtrl', function ($scope, $state, $http, $help, $mdDialog, toastr, $rootScope) {
  
  $scope.editorOptions = {
    language: 'es',
    uiColor: '#ffffff' 
  };
  
  $scope.loadCuento = function () {
    var id = $state.params.id;
    $http.get('/api/cuento/'+id).then(function (data) {
      $scope.cuento = data.data;
    });
  }
  
  $scope.openEditCuento = function (id) {
    $state.go('cuento-edit', {id: id});
  }
  
  $scope.openChangeState = function () {
    $help.modalSimple('/templates/dialogs/cuento-change-chapter.html', 'CuentoCtrl');
  } 
  
  $scope.returnToCuentoIndex = function (id) {
    $state.go('cuento-detail', {id: id});
  }
  
  $scope.updateCuento = function (cap) {
    $rootScope.rootLoader = true;
    $http.put('/api/cuento/'+cap.id, {
      text: cap.text,
      name: cap.name
    }).then(function (data) {
      toastr.success('Cuento guardado correctamente.', '¡Exito!');
      $rootScope.rootLoader = false;
    }).catch(function (err) {
      toastr.success('No se ha podido guardar el cuento.', '¡Error!');
      $rootScope.rootLoader = false;
    });
  }
  
  $scope.changeCuentoState = function (state) {
    var id = $state.params.id;
    $rootScope.rootLoader = true;
    $http.put('/api/cuento/'+id, {
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