app.controller('NovelaCtrl', function ($scope, $state, $http, $help, $mdDialog, toastr, $rootScope) {
  
  $scope.editorOptions = {
    language: 'es',
    uiColor: '#ffffff' 
  };
  
  $scope.loadNovela = function () {
    var id = $state.params.id;
    $http.get('/api/novela/'+id).then(function (data) {
      $scope.novela = data.data;
    });
  }
  
  $scope.loadChapterScenes = function(id) {
    $http.get('/api/novela/getChapterScenes/'+id).then(function (data) {
      for (var i in $scope.novela.chapters) {
        if ($scope.novela.chapters[i].id == id) {
          $scope.novela.chapters[i].scenes = data.data;
        }
      }
    });
  }
  
  $scope.loadChapter = function () {
    var id = $state.params.id;
    $rootScope.rootLoader = true;
    $http.get('/api/novelaCapitulo/'+id).then(function(data) {
      $scope.capitulo = data.data;
      $rootScope.rootLoader = false;
    }).catch(function (err) {
      toastr.error('No se ha podido cargar el capítulo.', '¡Error!');
      $rootScope.rootLoader = false;
      $state.go('dashboard');
    });
  }
  
  $scope.loadScene = function () {
    var id = $state.params.id;
    $rootScope.rootLoader = true;
    $http.get('/api/novelaEscena/'+id).then(function(data) {
      $scope.scene = data.data;
      $rootScope.rootLoader = false;
      $http.get('/api/novelaCapitulo/'+$scope.scene.capituloRoot.id).then(function(data2) {
        $scope.scene.proyecto = data2.data.proyecto;
      })
    }).catch(function (err) {
      toastr.error('No se ha podido cargar la escena.', '¡Error!');
      $rootScope.rootLoader = false;
      $state.go('dashboard');
    });
  }
  
  $scope.openEditChapter = function (id) {
    $state.go('novela-chapter', {id: id});
  }
  
  $scope.openEditScene = function (id) {
    $state.go('novela-scene', {id: id});
  }
  
  $scope.openChangeState = function () {
    $help.modalSimple('/templates/dialogs/novela-change-chapter.html', 'NovelaCtrl');
  }
  
  $scope.openNewChapter = function () {
    $help.modalSimple('/templates/dialogs/add-new-chapter.html', 'NovelaCtrl');
  }
  
  $scope.openNewScene = function () {
    $help.modalSimple('/templates/dialogs/add-new-scene.html', 'NovelaCtrl');
  }
  
  $scope.closeModal = function () {
    $mdDialog.hide();
  }
  
  $scope.returnToNovelaIndex = function (id) {
    $state.go('novela-detail', {id: id});
  }
  
  $scope.addNewChapter = function (name) {
    $rootScope.rootLoader = true;
    $http.post('/api/novelaCapitulo', {
      name: name,
      proyecto: $state.params.id
    }).then(function (data) {
      toastr.success('Capítulo agregado correctamente.', '¡Exito!');
      $mdDialog.hide();
      $state.reload();
      $rootScope.rootLoader = false;
    }).catch(function (err) {
      toastr.error('No se ha podido agregar el capítulo.', '¡Error!');
      $mdDialog.hide();
      $rootScope.rootLoader = false;
    });
  }
  
  $scope.addNewScene = function (novelaId, chapterId, name) {
    $http.post('/api/novelaEscena', {
      name: name,
      capituloRoot: chapterId
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
  
  $scope.updateChapter = function (cap) {
    $rootScope.rootLoader = true;
    $http.put('/api/novelaCapitulo/'+cap.id, {
      name: cap.name,
      text: cap.text
    }).then(function (data) {
      toastr.success('Capítulo guardado correctamente.', '¡Exito!');
      $rootScope.rootLoader = false;
    }).catch(function (err) {
      toastr.success('No se ha podido guardar el capítulo.', '¡Error!');
      $rootScope.rootLoader = false;
    });
  }
  
  $scope.changeNovelaState = function (state) {
    var id = $state.params.id;
    $rootScope.rootLoader = true;
    $http.put('/api/novela/'+id, {
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