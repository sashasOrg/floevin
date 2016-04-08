angular.module('SashasApp').controller('mainController', function($scope, $state, mainService) {
  $scope.data = mainService.data
  $scope.getSymbols = function() {
    mainService.getSymbols().success(function(response) {
      mainService.data = response;
      console.log(mainService.data);
      $state.reload();
    })
  }
  $scope.getSymbols();
})
