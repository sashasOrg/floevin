angular.module('SashasApp').controller('userController', function($scope, $state, $cookies, mainService) {
  $scope.currentUserCookie = JSON.parse($cookies.get('currentUser'));
  $scope.$watch($scope.currentUserCookie);
  $scope.currentUserPortfolioCookie = JSON.parse($cookies.get('currentUserPortfolio'))
  $scope.$watch($scope.currentUserPortfolioCookie);
  $scope.checkPortfolio = function(id) {
    for (var i = 0; i < JSON.parse($cookies.get('currentUserPortfolio')).portfolio.length; i++) {
      if (id === JSON.parse($cookies.get('currentUserPortfolio')).portfolio[i]._id) {
        return true;
      } else {
        return false;
      }
    }
  }
  $scope.removeFromPortfolio = function(id) {
    console.log('length of thing', JSON.parse($cookies.get('currentUser')).portfolio.length)
    if (JSON.parse($cookies.get('currentUser')).portfolio.length === 1) {
      var user2 = JSON.parse($cookies.get('currentUser'));
      user2.portfolio = [];
      $cookies.remove('currentUser');
      $cookies.put('currentUser', JSON.stringify(user2));
      mainService.updateUser(user2)
      console.log("hope this works")
      mainService.getUserPortfolio(JSON.parse($cookies.get('currentUser')).username).then(function(response) {
        $cookies.remove('currentUserPortfolio');
        $cookies.put('currentUserPortfolio', JSON.stringify(response.data));
        $state.reload();
      })
    }
    mainService.getUserPortfolio(JSON.parse($cookies.get('currentUser')).username).then(function(response) {
      $cookies.remove('currentUserPortfolio');
      $cookies.put('currentUserPortfolio', JSON.stringify(response.data));
    })
    for (var i = 0; i < JSON.parse($cookies.get('currentUser')).portfolio.length; i++) {
      console.log(JSON.parse($cookies.get('currentUser')).portfolio[i])
      console.log(id);
      if (id === JSON.parse($cookies.get('currentUser')).portfolio[i]) {
        var user = JSON.parse($cookies.get('currentUser'));
        user.portfolio.splice(i, 1);
        $cookies.remove('currentUser');
        $cookies.put('currentUser', JSON.stringify(user));
        mainService.updateUser(user)
        mainService.getUserPortfolio(JSON.parse($cookies.get('currentUser')).username).then(function(response) {
          console.log('portfolio response here', response);
          $cookies.remove('currentUserPortfolio');
          $cookies.put('currentUserPortfolio', JSON.stringify(response.data));
          $state.reload();
        })
      } else {
          console.log('Wasnt Found');
      }
    }
  };
  $scope.checkUserCookie = function() {
    console.log('yes', JSON.parse($cookies.get('currentUser')))
    console.log('hello', JSON.parse($cookies.get('currentUserPortfolio')));
  }
})
