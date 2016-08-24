var app = angular.module('BookIt', [
  'ui.router',
  'ngMaterial',
  'ngSails',
  'jkAngularCarousel',
  'angular-table'
]);

app.config(function ($urlRouterProvider, $stateProvider, $mdThemingProvider, $mdIconProvider) {
  $mdIconProvider.defaultIconSet('/svg/mdi.svg');
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('orange');

  $urlRouterProvider.otherwise('/index');
  $stateProvider
    .state('index', {url: '/index', templateUrl: 'templates/index.html', controller: 'MainCtrl'})
    .state('register', {url: '/register', templateUrl: 'templates/register.html', controller: 'MainCtrl'})
    .state('dashboard', {url: '/dashboard', templateUrl: 'templates/dashboard.html', controller: 'DashboardCtrl'})
    
    //Gestion de usuarios
    .state('manage-users', {url: '/users/admin', templateUrl: 'templates/users/manage.html', controller: 'UsersCtrl'})    
        
});
