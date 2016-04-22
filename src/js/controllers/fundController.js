angular.module('SashasApp').controller('fundController', function($scope, $cookies, $state, $localStorage, fundService, mainService) {


//mutual fund info
$scope.seachFund = '';
$scope.orderByField = '';
$scope.reverseSort = false;
$scope.fundData = $localStorage.fundData

$scope.chartData = $localStorage.chartData;


$scope.data = $localStorage.data;
$scope.$watch($scope.data);
$scope.labels = $localStorage.labels;
$scope.$watch($scope.labels);
$scope.series = ['High', 'Low', 'Open'];
$scope.onClick = function (points, evt) {
    console.log(points, evt);
};




$scope.createRiskCompatability = function() {
  fundService.getFund().then(function(response) {
    $scope.fundStuff = response.data;
    for (var i = 0; i < $scope.fundStuff.length; i++) {
      $scope.fundStuff[i].riskCompatibility = $scope.fundStuff[i].riskPotential * 2 + $scope.fundStuff[i].riskBracket * 2;
      $scope.fundStuff[i].riskCompatibility = $scope.fundStuff[i].riskCompatibility * 5;
      fundService.updateFund($scope.fundStuff[i]._id, $scope.fundStuff[i]).then(function(response2) {
      })
    }
  });
}

$scope.createRiskCompatability();

$scope.changeMutualFund = function(fund) {
  $scope.changedFund = fund;
}

$scope.updateMutualFund = function(fund) {
  fundService.updateFund(fund._id, fund).then(function(response) {
    $scope.changedFund = {};
  }).catch(function(response) {
    $scope.changedFund = {};
  })
}

$scope.anyfund = function(){

  $scope.error = false;
  $scope.disabled = true;
  fundService.newFund($scope.newfundForm)

};

$scope.fundQuery = function(){
  fundService.fundQuery($scope.searchFund).then(function(response){
    $scope.fund = response;
  })
}

$scope.getFund = function(){
      fundService.getFund().then(function(response){
        $scope.fundinfo = response.data;
    })
  };
  $scope.getFund();

$scope.newFund = function(newname, newsymbol,  newassetClass, newbeta, newexpenseRatio, newloadType, newriskBracket, newriskPotential){
  fundService.newFund(newname, newsymbol,  newassetClass, newbeta, newexpenseRatio, newloadType, newriskBracket, newriskPotential).then(function(response){
    $scope.getFund();
});
};

$scope.toggle = function(){
  $scope.showing = !$scope.showing;
};
  $scope.showing = false;

  $scope.addToPortfolio = function(id) {
    var user = $localStorage.currentUser
    for (var i = 0; i < user.portfolio.length; i++) {
      if (id === $localStorage.currentUser.portfolio[i]) {
        return false;
      }
    }
    user.portfolio.push(id)
    $localStorage.currentUser = user;
    $scope.currentUserCookie = $localStorage.currentUser;
    mainService.updateUser(user)
    mainService.getUserPortfolio(user.username).then(function(response) {
      $localStorage.currentUserPortfolio = response.data;
      $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
    })
  };


  $scope.checkPortfolio = function(id) {
    var user = $localStorage.currentUser;
    for (var i = 0; i < user.portfolio.length; i++) {
      if (id === $localStorage.currentUser.portfolio[i]) {
        return true;
      }
    }
    return false;
  }

  $scope.removeFromPortfolio = function(id) {
    if ($localStorage.currentUser.portfolio.length === 1) {
      var user2 = $localStorage.currentUser;
      user2.portfolio = [];
      $localStorage.currentUser = user2;
      mainService.updateUser(user2)
      mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
        $localStorage.currentUserPortfolio = response.data;
        $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
      })
    }
    mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
      $localStorage.currentUserPortfolio = response.data;
      $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
    })
    for (var i = 0; i < $localStorage.currentUser.portfolio.length; i++) {
      if (id === $localStorage.currentUser.portfolio[i]) {
        var user = $localStorage.currentUser;
        user.portfolio.splice(i, 1);
        $localStorage.currentUser = user;
        mainService.updateUser(user)
        mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
          $localStorage.currentUserPortfolio = response.data;
          $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio
        })
      }
    }
  };

});

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
