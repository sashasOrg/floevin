angular.module('SashasApp').controller('mainController', function($scope, $state, mainService) {
  $scope.data = mainService.data;
  $scope.specificData = mainService.specificData;
  $scope.stockQuery = '';
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

  //mutual fund info

  $scope.getFund = function(){
        mainService.getFund().then(function(response){
          $scope.fund = response.data;
          console.log($scope.fund)
      })
    };
$scope.getFund();

})
