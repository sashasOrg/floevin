angular.module('SashasApp', ['ui.router', 'ngCookies', 'ui.bootstrap'])

angular.module('SashasApp').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
       url: '/',
       templateUrl: '/home.html',
       controller: 'mainController',
       access: {restricted: false}
    })
    .state('questionaire', {
      url: '/questionaire',
      templateUrl: '/questionaire.html',
      controller: 'questionaireController',
      access: {restricted: false}
    })
    .state('login', {
      url: '/',
      template: '<login></login>',
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
      access: {restricted: true}
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
      controller: 'fundController',
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
      controller: 'fundController',
      access: {restricted: false}
    })


    $urlRouterProvider.otherwise('/')
})

angular.module('SashasApp').run(function ($state, $cookies, $rootScope, $location, AuthService) {
  $rootScope.$on('$stateChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus();
      if (next.access.restricted &&
          $cookies.get('currentUser') === null) {
            event.preventDefault();
            $state.go('login')
      }
  });
});
