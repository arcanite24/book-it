app.controller('DashboardCtrl', function($scope, $state, $http, $q, $rootScope) {
  
  $scope.loadDashboardProjects = function (id) {
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
  
  $scope.deleteAcount = function () {
    //Aqui va la funcion para eliminar la cuenta que al eliminarla se cierra sesion y se redirecciona al login
    $state.go('index');
  }
  
  $scope.sliderPictures = [
    // TODO: Aqui deben de ir las posibilidades del proyecto, novela, tesis y lo demas
    { src: 'http://placehold.it/720x1280?text=Imágen%20Carousel%201'},
    { src: 'http://placehold.it/720x1280?text=Imágen%20Carousel%202'},
    { src: 'http://placehold.it/720x1280?text=Imágen%20Carousel%203'},
    { src: 'http://placehold.it/720x1280?text=Imágen%20Carousel%204'}
  ];

});
