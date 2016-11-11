app.controller('GuionCtrl', function ($scope, $state, $http, $help, $mdDialog, toastr, $rootScope) {
  
  $scope.editorOptions = {
    language: 'es',
    uiColor: '#ffffff' 
  };
  
  $scope.loadGuion = function () {
    var id = $state.params.id;
    $http.get('/api/guion/'+id).then(function (data) {
      $scope.guion = data.data;
    });
  }
  
  $scope.loadActScenes = function(id) {
    $http.get('/api/guion/getActScenes/'+id).then(function (data) {
      for (var i in $scope.guion.acts) {
        if ($scope.guion.acts[i].id == id) {
          $scope.guion.acts[i].scenes = data.data;
        }
      }
    });
  }
  
  $scope.loadCuadros = function(id, iScene) {
    $http.get('/api/guion/getCuadrosEscena/'+id).then(function (data) {
      for (var i in $scope.guion.acts) {
        for (var j in $scope.guion.acts[i].scenes) {
          if ($scope.guion.acts[i].scenes[j].id == id) {
            $scope.guion.acts[i].scenes[j].cuadros = data.data;
          }
        }
      }
    });
  }
  
  $scope.loadEscenasGuion = function () {
    var id = $state.params.id;
    $http.get('/api/guion/getGuionScenes/'+id).then(function(data) {
      $scope.scenesNewCuadro = data.data;
    }).catch(function(err) {
      toastr.error('No se ha podido cargar las escenas.', '¡Error!');
    });
  }
  
  $scope.loadActo = function () {
    var id = $state.params.id;
    $rootScope.rootLoader = true;
    $http.get('/api/guionActo/'+id).then(function(data) {
      $scope.acto = data.data;
      $rootScope.rootLoader = false;
    }).catch(function (err) {
      toastr.error('No se ha podido cargar el acto.', '¡Error!');
      $rootScope.rootLoader = false;
      $state.go('dashboard');
    });
  }
  
  $scope.loadScene = function () {
    var id = $state.params.id;
    $rootScope.rootLoader = true;
    $http.get('/api/guionEscena/'+id).then(function(data) {
      $scope.scene = data.data;
      $rootScope.rootLoader = false;
      $scope.scene.proyecto_id = $state.params.root;
    }).catch(function (err) {
      toastr.error('No se ha podido cargar la escena.', '¡Error!');
      $rootScope.rootLoader = false;
      $state.go('dashboard');
    });
  }
  
  $scope.loadCuadro = function () {
    var id = $state.params.id;
    $rootScope.rootLoader = true;
    $http.get('/api/guionCuadro/'+id).then(function(data) {
      $scope.scene = data.data;
      $rootScope.rootLoader = false;
      $scope.scene.proyecto_id = $state.params.root;
    }).catch(function (err) {
      toastr.error('No se ha podido cargar el cuadro.', '¡Error!');
      $rootScope.rootLoader = false;
      $state.go('dashboard');
    });
  }
  
  $scope.openEditAct = function (id) {
    $state.go('guion-acto', {id: id});
  }
  
  $scope.openEditScene = function (id, root) {
    $state.go('guion-scene', {id: id, root: root});
  }
  
  $scope.openEditCuadro = function (id, root) {
    $state.go('guion-cuadro', {id: id, root: root});
  }
  
  $scope.openChangeState = function () {
    $help.modalSimple('/templates/dialogs/guion-change-chapter.html', 'GuionCtrl');
  }
  
  $scope.openNewAct = function () {
    $help.modalSimple('/templates/dialogs/add-new-act.html', 'GuionCtrl');
  }
  
  $scope.openNewScene = function () {
    $help.modalSimple('/templates/dialogs/add-new-scene-guion.html', 'GuionCtrl');
  }
  
  $scope.openNewCuadro = function () {
    $help.modalSimple('/templates/dialogs/add-new-cuadro.html', 'GuionCtrl');
  }
  
  $scope.closeModal = function () {
    $mdDialog.hide();
  }
  
  $scope.returnToGuionIndex = function (id) {
    $state.go('guion-detail', {id: id});
  }
  
  $scope.addNewAct = function (name) {
    $rootScope.rootLoader = true;
    $http.post('/api/guionActo', {
      name: name,
      guionRoot: $state.params.id
    }).then(function (data) {
      toastr.success('Acto agregado correctamente.', '¡Exito!');
      $mdDialog.hide();
      $state.reload();
      $rootScope.rootLoader = false;
    }).catch(function (err) {
      toastr.error('No se ha podido agregar el acto.', '¡Error!');
      $mdDialog.hide();
      $rootScope.rootLoader = false;
    });
  }
  
  $scope.addNewScene = function (guionId, chapterId, name) {
    $http.post('/api/guionEscena', {
      name: name,
      actoRoot: chapterId
    }).then(function (data) {
      toastr.success('Escena agregada correctamente.', '¡Exito!');
      $mdDialog.hide();
      $state.reload();
      $rootScope.rootLoader = false;
    }).catch(function (err) {
      toastr.error('No se ha podido agregar la escena.', '¡Error!');
      $mdDialog.hide();
      $rootScope.rootLoader = false;
    });
  }
  
  $scope.addNewCuadro = function (guionId, sceneId, name) {
    $http.post('/api/guionCuadro', {
      name: name,
      escenaRoot: sceneId
    }).then(function (data) {
      toastr.success('Cuadro agregado correctamente.', '¡Exito!');
      $mdDialog.hide();
      $state.reload();
      $rootScope.rootLoader = false;
    }).catch(function (err) {
      toastr.error('No se ha podido agregar el cuadro.', '¡Error!');
      $mdDialog.hide();
      $rootScope.rootLoader = false;
    });
  }
  
  $scope.updateActo = function (cap) {
    $rootScope.rootLoader = true;
    $http.put('/api/guionActo/'+cap.id, {
      name: cap.name,
      text: cap.text
    }).then(function (data) {
      toastr.success('Acto guardado correctamente.', '¡Exito!');
      $rootScope.rootLoader = false;
    }).catch(function (err) {
      toastr.success('No se ha podido guardar el acto.', '¡Error!');
      $rootScope.rootLoader = false;
    });
  }
  
  $scope.updateScene = function (cap) {
    $rootScope.rootLoader = true;
    $http.put('/api/guionEscena/'+cap.id, {
      name: cap.name,
      text: cap.text
    }).then(function (data) {
      toastr.success('Escena guardada correctamente.', '¡Exito!');
      $rootScope.rootLoader = false;
    }).catch(function (err) {
      toastr.success('No se ha podido guardar la escena.', '¡Error!');
      $rootScope.rootLoader = false;
    });
  }
  
  $scope.updateCuadro = function (cap) {
    $rootScope.rootLoader = true;
    $http.put('/api/guionCuadro/'+cap.id, {
      name: cap.name,
      text: cap.text
    }).then(function (data) {
      toastr.success('Cuadro guardado correctamente.', '¡Exito!');
      $rootScope.rootLoader = false;
    }).catch(function (err) {
      toastr.success('No se ha podido guardar el cuadro.', '¡Error!');
      $rootScope.rootLoader = false;
    });
  }
  
  $scope.changeGuionState = function (state) {
    var id = $state.params.id;
    $rootScope.rootLoader = true;
    $http.put('/api/guion/'+id, {
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