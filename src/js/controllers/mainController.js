angular.module('SashasApp').controller('mainController', function($scope, $state, $cookies, mainService) {
  $scope.data = mainService.data;
  $scope.specificData = mainService.specificData;
  $scope.stockQuery = '';
  $scope.mainService = {};



  // $scope.getSymbols = function() {
  //   mainService.getSymbols()
  //   console.log($scope.data)
  // }
  // $scope.getSymbols();
  $scope.searchSymbols = function() {
    mainService.searchSymbols($scope.stockQuery).then(function(response) {
      mainService.data = response.data.ResultSet.Result;
      $state.reload();
    })
  }
  $scope.getMoreInformation = function(symbol) {
    mainService.getMoreInformation(symbol).then(function(response) {
      mainService.specificData = response.data.query.results.quote;
      console.log(mainService.specificData)
      $state.reload();
    })
  }
  $scope.addToPortfolio = function(id) {
    var user = JSON.parse($cookies.get('currentUser'));
    console.log(user.portfolio)
    for (var i = 0; i < user.portfolio.length; i++) {
      if (id === JSON.parse($cookies.get('currentUser')).portfolio[i]) {
        console.log('Already exists in portfolio');
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
    $state.reload();
    user = null;
  }
  $scope.checkPortfolio = function(id) {
    mainService.getUserPortfolio(JSON.parse($cookies.get('currentUser')).username).then(function(response) {
      $cookies.remove('currentUserPortfolio');
      $cookies.put('currentUserPortfolio', JSON.stringify(response.data));
    })
    for (var i = 0; i < JSON.parse($cookies.get('currentUserPortfolio')).portfolio.length; i++) {
      if (id === JSON.parse($cookies.get('currentUserPortfolio')).portfolio[i]._id) {
        return false;
        console.log('false, it shouldnt show', id);
      }
    }
    return true;
  }
  $scope.removeFromPortfolio = function(id) {
    mainService.getUserPortfolio(JSON.parse($cookies.get('currentUser')).username).then(function(response) {
      $cookies.remove('currentUserPortfolio');
      $cookies.put('currentUserPortfolio', JSON.stringify(response.data));
    })
    for (var i = 0; i < JSON.parse($cookies.get('currentUser')).portfolio.length; i++) {
      console.log(JSON.parse($cookies.get('currentUser')).portfolio[i])
      console.log(id);
      if (id === JSON.parse($cookies.get('currentUser')).portfolio[i]) {
        var user = JSON.parse($cookies.get('currentUser'));
        console.log('this is user before', user);
        user.portfolio.splice(i, 1);
        console.log('this is user after', user);
        mainService.updateUser(user).then(function(response) {
          $cookies.remove('currentUser');
          $cookies.put('currentUser', JSON.stringify(response.data));
          console.log('response here', response.data)
        })
      }
      else {
        console.log('Wasnt Found');
      }
    }
  };
})
