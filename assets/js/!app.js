var app = angular.module('BookIt', [
  'ui.router',
  'ngMaterial',
  'ngSails',
  'ngCkeditor',
  'jkAngularCarousel',
  'angular-table',
  'lfNgMdFileInput'
]);

app.config(function ($urlRouterProvider, $stateProvider, $mdThemingProvider, $mdIconProvider) {
  $mdIconProvider.defaultIconSet('/svg/mdi.svg');
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('grey');

  $urlRouterProvider.otherwise('/index');
  $stateProvider
    .state('index', {url: '/index', templateUrl: 'templates/index.html', controller: 'MainCtrl'})
    .state('register', {url: '/register', templateUrl: 'templates/register.html', controller: 'MainCtrl'})
    .state('lostpassword', {url: '/recover', templateUrl: 'templates/lostpassword.html', controller: 'MainCtrl'})
    .state('dashboard', {url: '/dashboard', templateUrl: 'templates/dashboard.html', controller: 'DashboardCtrl'})

    //Gestion de usuarios
    .state('manage-users', {url: '/users/admin', templateUrl: 'templates/users/manage.html', controller: 'UsersCtrl'})
    .state('add-users', {url: '/users/new', templateUrl: 'templates/users/new.html', controller: 'UsersCtrl'})
    
    //Projects
    .state('project-list', {url: '/projects/list', templateUrl: 'templates/projects/list.html', controller: 'ProjectsCtrl'})    

    //Test routes
    .state('text-editor-test', {url: '/text-editor/admin', templateUrl: 'templates/text-editor/test.html', controller: 'AdminCtrl'})
});
