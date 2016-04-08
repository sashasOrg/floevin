angular.module('SashasApp', ['ui.router'])

<<<<<<< HEAD
angular.config(function($stateProvider, $urlRouterProvider) {
=======
angular.module('SashasApp').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
       url: '/',
       templateUrl: './views/home.html',
       controller: 'mainController'
    })
    .state('form', {
      url: '/form',
      templateUrl: './views/form.html',
      controller: 'formController'
    })
    .state('login', {
      url: '/login',
      templateUrl: './views/login.html',
      controller: 'authController'
    })
    .state('register', {
      url: '/register',
      templateUrl: './views/register.html',
      controller: 'authController'
    })
    .state('portfolio', {
      url: '/portfolio',
      templateUrl: './views/portfolio.html',
      controller: 'userController'
    })
    $urlRouterProvider.otherwise('/')
>>>>>>> master
})
