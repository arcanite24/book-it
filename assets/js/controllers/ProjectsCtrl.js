app.controller('ProjectsCtrl', function($scope, $state, $help) {

  $scope.proyectosRecientes = [
    {title:'123456789123456789', text: '1234567', img: 'https://placeholdit.imgix.net/~text?txtsize=52&txt=Sin%20Cover&w=152&h=240&txttrack=0'},
    {title:'Test 2', text: '1234567', img: 'https://placeholdit.imgix.net/~text?txtsize=52&txt=Sin%20Cover&w=152&h=240&txttrack=0'},
    {title:'Test 3 132312 312312312 3', text: '1234567', img: 'https://placeholdit.imgix.net/~text?txtsize=52&txt=Sin%20Cover&w=152&h=240&txttrack=0'},
    {title:'Test 4', text: '1234567', img: 'https://placeholdit.imgix.net/~text?txtsize=52&txt=Sin%20Cover&w=152&h=240&txttrack=0'},
    {title:'Test 5 123 123 123 123 ', text: '1234567', img: 'https://placeholdit.imgix.net/~text?txtsize=52&txt=Sin%20Cover&w=152&h=240&txttrack=0'}
  ];
  
  $scope.modalNewProject = function () {
    console.log('ProjectsCtrl - Modal nuevo proyecto');
    $help.modalSimple('templates/dialogs/new-project.html', function ($scope, $back, $mdDialog) {
      $scope.close = function () {
        $mdDialog.hide();
      }
      
      $scope.newProject = function (data) {
        console.log(data);
      }
    });
  }

});
