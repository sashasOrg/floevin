angular.module('SashasApp').controller('mainController', function($scope, $state, $cookies, $localStorage, mainService, fundService) {
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
      $localStorage.fundData = response.data.list.resources[0].resource.fields;
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


});
