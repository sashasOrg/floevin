angular.module('SashasApp').controller('mainController', function($scope, $state, $cookies, mainService, fundService) {
  $scope.data = mainService.data;
  $scope.stockQuery = '';
  $scope.mainService = {};



  // $scope.getSymbols = function() {
  //   mainService.getSymbols()
  //   console.log($scope.data)
  // }
  // $scope.getSymbols();

  $scope.searchFund = function(symbol) {
    fundService.searchFund(symbol).then(function(response) {
      console.log(response);
      $cookies.put('fundData', JSON.stringify(response.data.list.resources[0].resource.fields));
      $state.reload();
    })
  }

  $scope.getFunds = function() {
    fundService.getFund().then(function(response) {
      $scope.fundInfo = response.data
    })
  }
  $scope.getFunds();


  $scope.getMoreInformation = function(symbol) {
    mainService.getMoreInformation(symbol).then(function(response) {
      mainService.specificData = response.data.query.results.quote;
      $state.reload();
    })
  }
  $scope.checkPortfolio = function(id) {
    var user = JSON.parse($cookies.get('currentUser'));
    for (var i = 0; i < user.portfolio.length; i++) {
      if (id === JSON.parse($cookies.get('currentUser')).portfolio[i]) {
        return true;
      }
    }
    return false;
  }
  $scope.addToPortfolio = function(id) {
    var user = JSON.parse($cookies.get('currentUser'));
    for (var i = 0; i < user.portfolio.length; i++) {
      if (id === JSON.parse($cookies.get('currentUser')).portfolio[i]) {
        return false;
      }
    }
    user.portfolio.push(id)
    $cookies.remove('currentUser');
    $cookies.put('currentUser', JSON.stringify(user));
    mainService.updateUser(user)
    mainService.getUserPortfolio(user.username).then(function(response) {
      $cookies.remove('currentUserPortfolio');
      $cookies.put('currentUserPortfolio', JSON.stringify(response.data))
    })
    user = null;
  };
  $scope.removeFromPortfolio = function(id) {
    if (JSON.parse($cookies.get('currentUser')).portfolio.length === 1) {
      var user2 = JSON.parse($cookies.get('currentUser'));
      user2.portfolio = [];
      $cookies.remove('currentUser');
      $cookies.put('currentUser', JSON.stringify(user2));
      mainService.updateUser(user2)
      mainService.getUserPortfolio(JSON.parse($cookies.get('currentUser')).username).then(function(response) {
        $cookies.remove('currentUserPortfolio');
        $cookies.put('currentUserPortfolio', JSON.stringify(response.data));
      })
    }
    mainService.getUserPortfolio(JSON.parse($cookies.get('currentUser')).username).then(function(response) {
      $cookies.remove('currentUserPortfolio');
      $cookies.put('currentUserPortfolio', JSON.stringify(response.data));
    })
    for (var i = 0; i < JSON.parse($cookies.get('currentUser')).portfolio.length; i++) {
      if (id === JSON.parse($cookies.get('currentUser')).portfolio[i]) {
        var user = JSON.parse($cookies.get('currentUser'));
        user.portfolio.splice(i, 1);
        $cookies.remove('currentUser');
        $cookies.put('currentUser', JSON.stringify(user));
        mainService.updateUser(user)
        mainService.getUserPortfolio(JSON.parse($cookies.get('currentUser')).username).then(function(response) {
          $cookies.remove('currentUserPortfolio');
          $cookies.put('currentUserPortfolio', JSON.stringify(response.data));
        })
      }
    }
  };
});
