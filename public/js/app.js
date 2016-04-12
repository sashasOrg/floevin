angular.module('SashasApp', ['ui.router', 'ngCookies'])

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
      controller: 'loginController'
    })
    .state('register', {
      url: '/register',
      templateUrl: './views/register.html',
      controller: 'registerController'
    })
    .state('portfolio', {
      url: '/portfolio',
      templateUrl: './views/portfolio.html',
      controller: 'userController'
    })
    .state('stock', {
      url: '/stock',
      templateUrl: './views/stock.html',
      controller: 'mainController'
    })
  

    $urlRouterProvider.otherwise('/')
})
