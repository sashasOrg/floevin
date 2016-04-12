angular.module('SashasApp', ['ui.router'])

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
    .state('stock', {
      url: '/stock',
      templateUrl: './views/stock.html',
      controller: 'mainController',
      access: {restricted: false}
    })
    .state('admin', {
      url: '/admin',
      templateUrl: '/views/admin.html',
      controller: 'formController',
      access: {restricted: false}
    })


    $urlRouterProvider.otherwise('/')
})
