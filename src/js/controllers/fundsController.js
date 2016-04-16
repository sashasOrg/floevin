angular.module('SashasApp').controller('fundController', function($scope, $cookies, fundsService) {


//mutual fund info
$scope.seachFund = '';
$scope.orderByField = '';
$scope.reverseSort = false;





$scope.anyfund = function(){
    console.log('test');
  $scope.error = false;
  $scope.disabled = true;
  formService.newFund($scope.newfundForm)

};

$scope.fundQuery = function(){
  formService.fundQuery($scope.searchFund).then(function(response){
    $scope.fund = response;
  })
}

$scope.getFund = function(){
      formService.getFund().then(function(response){
        $scope.fundinfo = response.data;
    })
  };
  $scope.getFund();

$scope.newFund = function(newname, newsymbol,  newassetClass, newbeta, newexpenseRatio, newloadType, newriskBracket, newriskPotential){
  formService.newFund(newname, newsymbol,  newassetClass, newbeta, newexpenseRatio, newloadType, newriskBracket, newriskPotential).then(function(response){
    $scope.getFund();
});
};

$scope.toggle = function(){
  $scope.showing = !$scope.showing;
};
  $scope.showing = false;

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
