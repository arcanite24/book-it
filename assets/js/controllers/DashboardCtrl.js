app.controller('DashboardCtrl', function($scope, $state) {

  $scope.sliderPictures = [
    // TODO: Aqui deben de ir las posibilidades del proyecto, novela, tesis y lo demas
    { src: 'http://placehold.it/720x1280?text=Imágen%20Carousel%201'},
    { src: 'http://placehold.it/720x1280?text=Imágen%20Carousel%202'},
    { src: 'http://placehold.it/720x1280?text=Imágen%20Carousel%203'},
    { src: 'http://placehold.it/720x1280?text=Imágen%20Carousel%204'}
  ];

  $scope.proyectosRecientes=[
    {title:'Test 1', text: '1234567'},
    {title:'Test 2', text: '1234567'},
    {title:'Test 3', text: '1234567'},
    {title:'Test 4', text: '1234567'},
    {title:'Test 5', text: '1234567'},
    {title:'Test 6', text: '1234567'}
  ];

});
