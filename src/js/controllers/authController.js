angular.module('SashasApp').controller('loginController', function($state, $scope, $location, $localStorage, $cookies, AuthService, mainService) {

    $scope.isLoggedIn = AuthService.isLoggedIn;

    $scope.getBarInfo = function() {
      $localStorage.goodBarData = {};
      $localStorage.goodBarData.data = [];
      $localStorage.goodBarData.labels = [];
      $localStorage.goodBarData.series = ["Price"];
      $localStorage.bestBarData = {};
      $localStorage.bestBarData.data = [];
      $localStorage.bestBarData.labels = [];
      $localStorage.bestBarData.series = ["Price"];
      for (var i = 0; i < $localStorage.currentUser.bestMatches.length; i++) {
        mainService.getMoreInformation($localStorage.currentUserBestMatches.bestMatches[i].symbol.toUpperCase()).then(function(response) {
          $localStorage.goodBarData.data.push(parseInt(response.data.query.results.quote.PreviousClose));
          $localStorage.goodBarData.labels.push(response.data.query.results.quote.Symbol)
        })
      }
      for (var i = 0; i < $localStorage.currentUser.goodMatches.length; i++) {
        mainService.getMoreInformation($localStorage.currentUserGoodMatches.goodMatches[i].symbol.toUpperCase()).then(function(response) {
          $localStorage.goodBarData.data.push(parseInt(response.data.query.results.quote.PreviousClose));
          $localStorage.goodBarData.labels.push(response.data.query.results.quote.Symbol);
        })
      }
    }

    $scope.login = function () {
      $scope.error = false;
      $scope.disabled = true;
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        .then(function (response) {
          $scope.disabled = false;
          $scope.loginForm = {};
          AuthService.isLoggedIn();
          $localStorage.currentUser = response;
          mainService.getUserPortfolio($localStorage.currentUser.username).then(function(responseTwo) {
            $localStorage.currentUserPortfolio = responseTwo.data
            mainService.getBadMatches($localStorage.currentUser.username).then(function(responseThree) {
              $localStorage.currentUserBadMatches = responseThree.data
              mainService.getOkayMatches($localStorage.currentUser.username).then(function(responseFour) {
                $localStorage.currentUserOkayMatches = responseFour.data
                mainService.getGoodMatches($localStorage.currentUser.username).then(function(responseFive) {
                  $localStorage.currentUserGoodMatches = responseFive.data
                  mainService.getBestMatches($localStorage.currentUser.username).then(function(responseSix) {
                    $localStorage.currentUserBestMatches = responseSix.data
                    $scope.getBarInfo();
                    $state.go('portfolio');
                  });
                });
              });
            });
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
angular.module('SashasApp').controller('logoutController', function ($scope, $location, $cookies, $localStorage, AuthService, mainService) {

    $scope.userLogged = AuthService.isLoggedIn();
    $scope.$watch($scope.userLogged);

    $scope.checkForUser = function() {
      if ($localStorage.currentUser) {
        return false;
      } else {
        return true;
      }
    }

    $scope.logout = function () {
      AuthService.logout()
        .then(function () {
          $localStorage.$reset();
          $location.path('login');
        });

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
