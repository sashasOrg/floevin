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

  //mutual fund info

  $scope.getFund = function(){
        mainService.getFund().then(function(response){
          $scope.fund = response.data;
          console.log($scope.fund)
      })
    };
$scope.getFund();

$scope.newFund = function(newname, newsymbol, newprice, newassetClass, newbeta, newexpenseRatio, newloadType, newriskBracket, newriskPotential){
  mainService.newFund(newname, newsymbol, newprice, newassetClass, newbeta, newexpenseRatio, newloadType, newriskBracket, newriskPotential).then(function(response){
    $scope.getFund();
  });
};

})


angular.module('SashasApp').directive('hideForm', function(){
  function link ($scope, element, attributes){
      var expression = attributes.hideForm;
      if ( ! $scope.$eval( expression)){
        element.hide();
      }
    $scope.$watch(expression, function(newValue, oldValue){
      if (newValue === oldValue) {
        return;
      } if ( newValue){
        element.stop(true, true).slideDown();
      }else{
        element.stop(true, true).slideUp();
      }

    });
  };
    return ({
      link:link,
      restrict: 'A'

    });
})
