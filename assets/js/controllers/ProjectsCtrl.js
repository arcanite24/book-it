app.controller('ProjectsCtrl', function($scope, $state, $help, $http, $rootScope, $q) {

  $scope.loadProjects = function (id) {
    $rootScope.rootLoader = true;
    var qProjects = [
      $http.get('/api/novela/getByUser/'+id),
      $http.get('/api/cuento/getByUser/'+id),
      $http.get('/api/guion/getByUser/'+id),
      $http.get('/api/poema/getByUser/'+id)
    ];
    
    $q.all(qProjects).then(function (dataQ) {
      $scope.proyectosRecientes = [];
      dataQ.forEach(function(project) {
        $scope.proyectosRecientes = $scope.proyectosRecientes.concat(project.data);
      });
      $rootScope.rootLoader = false;
    });
  }
  
  $scope.getEstadistica = function (data, type) {
    if (!data || !type) {
      return 0;
    }
    
    var tempNumber = 0;
    switch (type) {
      case 1:
        //Activos
        data.forEach(function(project) {
          if (project.estado == 'STATE_ACTIVO') {
            tempNumber++;
          }
        });
        return tempNumber;
        break;
      
      case 2:
        //Finalizados
        data.forEach(function(project) {
          if (project.estado == 'STATE_FINALIZADO') {
            tempNumber++;
          }
        });
        return tempNumber;
        break;
        
      case 3:
        //Publicar
        data.forEach(function(project) {
          if (project.estado == 'STATE_PUBLICAR') {
            tempNumber++;
          }
        });
        return tempNumber;
        break;
      
      default:
        return 0;
    }
  }
  
  $scope.modalNewProject = function () {
    $help.modalSimple('templates/dialogs/new-project.html', function ($scope, $back, $mdDialog, toastr, $rootScope, $help, $state) {
      $scope.close = function () {
        $mdDialog.hide();
      }
      
      $scope.newProject = function (data) {
        console.log(data)
        //First upload the cover
        var formData = new FormData();
        formData.append('image', data.cover[0].lfFile);
        $rootScope.rootLoader = true;
        $http.post('/api/helper/upload', formData, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }).then(function (dataUpload) {
          //Create the project
          console.log(dataUpload.data.url);
          data.coverUrl = dataUpload.data.url;
          data.owner = $rootScope._user.id;
          /*
            STATE_ACTIVO
            STATE_FINALIZADO
            STATE_PUBLICAR
          */
          data.estado = 'STATE_ACTIVO';
          delete data.cover;
          switch (data.projectType) {
            case 1:
              $http.post('/api/novela/', data).then(function(dataCreateNovela) {
                toastr.success('Novela creada correctamente.', '¡Exito!');
                $mdDialog.hide();
                $rootScope.rootLoader = false;
                $state.reload();
              }).catch(function(err) {
                console.log(err);
                $mdDialog.hide();
                toastr.error('Error creando proyecto...', '¡Error!');
                $rootScope.rootLoader = false;
              });
              break;
            
            case 2:
              $http.post('/api/cuento/', data).then(function(dataCreateCuento) {
                toastr.success('Cuento creado correctamente.', '¡Exito!');
                $mdDialog.hide();
                $rootScope.rootLoader = false;
                $state.reload();
              }).catch(function(err) {
                console.log(err);
                $mdDialog.hide();
                toastr.error('Error creando proyecto...', '¡Error!');
                $rootScope.rootLoader = false;
              });
              break;
              
            case 3:
              if (data.tipoCuento) {
                delete data.tipoCuento;
              }
              $http.post('/api/guion/', data).then(function(dataCreateGuion) {
                console.log(dataCreateGuion)
                toastr.success('Guión creado correctamente.', '¡Exito!');
                $mdDialog.hide();
                $rootScope.rootLoader = false;
                $state.reload();
              }).catch(function(err) {
                console.log(err);
                $mdDialog.hide();
                toastr.error('Error creando proyecto...', '¡Error!');
                $rootScope.rootLoader = false;
              });
              break;
            
            case 4:
              if (data.tipoCuento) {
                delete data.tipoCuento;
              }
              $http.post('/api/poema/', data).then(function(dataCreateGuion) {
                console.log(dataCreateGuion)
                toastr.success('Poema creado correctamente.', '¡Exito!');
                $mdDialog.hide();
                $rootScope.rootLoader = false;
                $state.reload();
              }).catch(function(err) {
                console.log(err);
                $mdDialog.hide();
                toastr.error('Error creando proyecto...', '¡Error!');
                $rootScope.rootLoader = false;
              });
              break;
            
            default:
              $mdDialog.hide();
              toastr.error('Error creando proyecto...', '¡Error!');
              $rootScope.rootLoader = false;
          }
        }).catch(function(err) {
          console.log(err);
          $rootScope.rootLoader = false;
          $mdDialog.hide();
          toastr.error('Error subiendo imágen...', '¡Error!');
        });
      }
    });
  }

});
