angular.module('SashasApp').controller('loginController', function($state, $scope, $location, $cookies, AuthService, mainService) {

    $scope.isLoggedIn = AuthService.isLoggedIn;

    $scope.login = function () {
      $scope.error = false;
      $scope.disabled = true;
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        .then(function (response) {
          $scope.disabled = false;
          $scope.loginForm = {};
          AuthService.isLoggedIn();
          $cookies.remove('currentUser');
          $cookies.put('currentUser', JSON.stringify(response));
          mainService.getUserPortfolio(JSON.parse($cookies.get('currentUser')).username).then(function(responseTwo) {
            console.log('response two', responseTwo)
            $cookies.remove('currentUserPortfolio');
            $cookies.put('currentUserPortfolio', JSON.stringify(responseTwo.data));
            $state.go('portfolio')
          });
        })
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
    };
});
angular.module('SashasApp').controller('logoutController', function ($scope, $location, $cookies, AuthService, mainService) {

    $scope.userLogged = AuthService.isLoggedIn();
    $scope.$watch($scope.userLogged);

    $scope.logout = function () {
      AuthService.logout()
        .then(function () {
          $cookies.remove('currentUser');
          $cookies.remove('currentUserPortfolio');
          $location.path('login');
        });
        console.log('logout')

    };

});
angular.module('SashasApp').controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
    $scope.secondPassword = '';

    $scope.register = function () {
      if ($scope.registerForm.password !== $scope.registerForm.secondPassword) {
        $scope.error = true;
        $scope.errorMessage = "Passwords do not match, please re-enter password.";
        $scope.registerForm.password = '';
        $scope.registerForm.secondPassword = '';
        return false;
      }
      $scope.error = false;
      $scope.disabled = true;
      AuthService.register($scope.registerForm.username, $scope.registerForm.password, $scope.registerForm.firstName, $scope.registerForm.lastName, $scope.registerForm.email)
        .then(function () {
          $location.path('login')
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);
