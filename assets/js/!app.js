var app = angular.module('BookIt', [
  'ui.router',
  'ngMaterial',
  'ngSails',
  'ngCkeditor',
  'jkAngularCarousel',
  'angular-table',
  'lfNgMdFileInput',
  'ngAnimate',
  'toastr'
]);

app.config(function ($urlRouterProvider, $stateProvider, $mdThemingProvider, $mdIconProvider) {
  $mdIconProvider.defaultIconSet('/svg/mdi.svg');
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('grey');

  $urlRouterProvider.otherwise('/index');
  $stateProvider
    .state('index', {url: '/index', templateUrl: 'templates/index.html', controller: 'MainCtrl'})
    .state('register', {url: '/register', templateUrl: 'templates/register.html', controller: 'UsersCtrl'})
    .state('lostpassword', {url: '/recover', templateUrl: 'templates/lostpassword.html', controller: 'MainCtrl'})
    .state('dashboard', {url: '/dashboard', templateUrl: 'templates/dashboard.html', controller: 'DashboardCtrl'})
    .state('my-account', {url: '/profile', templateUrl: 'templates/profile.html', controller: 'DashboardCtrl'})

    //Gestion de usuarios
    .state('manage-users', {url: '/users/admin', templateUrl: 'templates/users/manage.html', controller: 'UsersCtrl'})
    .state('add-users', {url: '/users/new', templateUrl: 'templates/users/new.html', controller: 'UsersCtrl'})
    
    //Projects
    .state('project-list', {url: '/projects/list', templateUrl: 'templates/projects/list.html', controller: 'ProjectsCtrl'})
    
    //Novela
    .state('novela-detail', {url: '/novela/:id', templateUrl: 'templates/projects/novela/detail.html', controller: 'NovelaCtrl'})
    .state('novela-chapter', {url: '/novela/chapter/:id', templateUrl: 'templates/projects/novela/edit-chapter.html', controller: 'NovelaCtrl'})
    .state('novela-scene', {url: '/novela/scene/:id', templateUrl: 'templates/projects/novela/edit-scene.html', controller: 'NovelaCtrl'})
    
    //Guion
    .state('guion-detail', {url: '/guion/:id', templateUrl: 'templates/projects/guion/detail.html', controller: 'GuionCtrl'})
    .state('guion-acto', {url: '/guion/acto/:id', templateUrl: 'templates/projects/guion/edit-acto.html', controller: 'GuionCtrl'})
    .state('guion-scene', {url: '/guion/scene/:id/:root', templateUrl: 'templates/projects/guion/edit-scene.html', controller: 'GuionCtrl'})
    .state('guion-cuadro', {url: '/guion/cuadro/:id/:root', templateUrl: 'templates/projects/guion/edit-cuadro.html', controller: 'GuionCtrl'})
    
    //Cuento
    .state('cuento-detail', {url: '/cuento/:id', templateUrl: 'templates/projects/cuento/detail.html', controller: 'CuentoCtrl'})
    .state('cuento-edit', {url: '/cuento/editar/:id', templateUrl: 'templates/projects/cuento/edit-cuento.html', controller: 'CuentoCtrl'})
    
    //Poema
    .state('poema-detail', {url: '/poema/:id', templateUrl: 'templates/projects/poema/detail.html', controller: 'PoemaCtrl'})
    .state('poema-edit', {url: '/poema/editar/:id', templateUrl: 'templates/projects/poema/edit-poema.html', controller: 'PoemaCtrl'})

    //Test routes
    .state('text-editor-test', {url: '/text-editor/admin', templateUrl: 'templates/text-editor/test.html', controller: 'AdminCtrl'})
});

app.run(function ($rootScope) {
  $rootScope.mainLoaderAnimation = true;
  setTimeout(function () {
    $rootScope.mainLoaderHide = true;
  }, 500)
  
});
