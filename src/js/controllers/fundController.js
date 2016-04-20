angular.module('SashasApp').controller('fundController', function($scope, $cookies, $state, fundService, mainService) {


//mutual fund info
$scope.seachFund = '';
$scope.orderByField = '';
$scope.reverseSort = false;
if ($cookies.get('fundData') !== null) {
  $scope.fundData = JSON.parse($cookies.get('fundData'));
}


$scope.createRiskCompatability = function() {
  console.log('yes')
  fundService.getFund().then(function(response) {
    $scope.fundStuff = response.data;
    for (var i = 0; i < $scope.fundStuff.length; i++) {
      $scope.fundStuff[i].riskCompatibility = $scope.fundStuff[i].riskPotential * 2 + $scope.fundStuff[i].riskBracket * 2;
      $scope.fundStuff[i].riskCompatibility = $scope.fundStuff[i].riskCompatibility * 5;
      fundService.updateFund($scope.fundStuff[i]._id, $scope.fundStuff[i]).then(function(response2) {
        console.log(response2);
      })
    }
  });
}

$scope.changeMutualFund = function(fund) {
  $scope.changedFund = fund;
}

$scope.updateMutualFund = function(fund) {
  fundService.updateFund(fund._id, fund).then(function(response) {
    console.log(response);
    $scope.changedFund = {};
  }).catch(function(response) {
    console.log('Error')
    $scope.changedFund = {};
  })
}

$scope.anyfund = function(){
    console.log('test');
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
    var user = JSON.parse($cookies.get('currentUser'));
    console.log(user.portfolio)
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

  $scope.checkPortfolio = function(id) {
    var user = JSON.parse($cookies.get('currentUser'));
    for (var i = 0; i < user.portfolio.length; i++) {
      if (id === JSON.parse($cookies.get('currentUser')).portfolio[i]) {
        console.log('Already exists in portfolio');
        return true;
      }
    }
    return false;
  }

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
      } else {
          console.log('Wasnt Found');
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
