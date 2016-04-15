angular.module('SashasApp', ['ui.router', 'ngCookies'])

angular.module('SashasApp').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
       url: '/',
       templateUrl: '/home.html',
       controller: 'mainController',
       access: {restricted: false}
    })
    .state('form', {
      url: '/form',
      templateUrl: '/form.html',
      controller: 'formController',
      access: {restricted: false}
    })
    .state('login', {
      url: '/login',
      templateUrl: '/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .state('register', {
      url: '/register',
      templateUrl: '/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
    .state('portfolio', {
      url: '/portfolio',
      templateUrl: '/portfolio.html',
      controller: 'userController',
      access: {restricted: false}
    })
    .state('stock', {
      url: '/stock',
      templateUrl: '/stock.html',
      controller: 'mainController',
      access: {restricted: false}
    })
    .state('fundtable',{
      url: '/fundtable',
      templateUrl: '/fundtable.html',
      controller: 'formController',
      access: {restricted: false}
    })
    .state('fundinfo', {
      url: '/fundinfo',
      templateUrl: '/fundinfo.html',
      controller: 'fundController',
      access: {restricted: false}
    })
    .state('admin', {
      url: '/admin',
      templateUrl: '/admin.html',
      controller: 'formController',
      access: {restricted: false}
    })


    $urlRouterProvider.otherwise('/')
})

angular.module('SashasApp').run(function ($state, $rootScope, $location, AuthService) {
  $rootScope.$on('$stateChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus();
      if (next.access.restricted &&
          !AuthService.isLoggedIn()) {
            event.preventDefault();
            $state.go('login')
      }
  });
});
