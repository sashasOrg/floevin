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

$scope.getChartInfo = function(symbol) {
  $scope.disabled = true;
  mainService.chartData = {};
  mainService.chartData.data = [];
  mainService.getChartInfo(symbol.toUpperCase()).then(function(response) {
    for (var i = 0; i < response.data.query.results.quote.length; i++) {
      var dateArray = response.data.query.results.quote[i].Date.split('-')
      var dataObject = {}
      dataObject.Open = response.data.query.results.quote[i].Open;
      dataObject.Low = response.data.query.results.quote[i].Low;
      dataObject.High = response.data.query.results.quote[i].High;
      dataObject.Close = response.data.query.results.quote[i].Close;
      dataObject.Volume = response.data.query.results.quote[i].Volume;
      dataObject.Date = response.data.query.results.quote[i].Date
      dataObject._date_Date = dataObject.Date;
      mainService.chartData.data.push(dataObject);
    }
    $localStorage.chartData = mainService.chartData;
    $scope.chartData = $localStorage.chartData;
    mainService.getMoreInformation(symbol).then(function(response) {
      mainService.specificData = response.data.query.results.quote;
      $localStorage.fundData = mainService.specificData;
        $scope.data = [];
        $scope.data[0] = [];
        $scope.data[1] = [];
        $scope.data[2] = [];
        $scope.labels = [];
        var neededData = $scope.chartData.data.reverse();
        for (var i = 0; i < $scope.chartData.data.length; i++) {
          $scope.labels.push(neededData[i].Date);
          $scope.data[0].push(neededData[i].High)
          $scope.data[1].push(neededData[i].Low)
          $scope.data[2].push(neededData[i].Open)
        }
        $localStorage.data = $scope.data;
        $localStorage.labels = $scope.labels;
        neededData = null;
        fundService.searchFund(symbol).then(function(response) {
          $localStorage.fundData = response.data.list.resources[0].resource.fields;
          console.log($localStorage.fundData)
          console.log(response)
          $scope.disabled = false;
          $state.go('fundinfo')
      })
    })
  })
}



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

  $scope.addToPortfolio = function(id, number) {
    if (number) {
      var user = $localStorage.currentUser
      for (var i = 0; i < user.portfolio.length; i++) {
        if (id === $localStorage.currentUser.portfolio[i]) {
          return false;
        }
      }
      user.portfolio.push(id)
      user.portfolioNumber.push({number: number})
      $localStorage.currentUser = user;
      $scope.currentUserCookie = $localStorage.currentUser;
      number = '';
      mainService.updateUser(user)
      mainService.getUserPortfolio(user.username).then(function(response) {
        $localStorage.currentUserPortfolio = response.data;
        $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
      })
    } else {
      return false;
    }
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

  $scope.calculatePortfolioPrice = function() {
    var user = $localStorage.currentUser;
    user.portfolioPrice = 0;
    for (var i = 0; i < $localStorage.currentUserPortfolio.portfolio.length; i++) {
      var number = $localStorage.currentUserPortfolio.portfolioNumber[i].number;
      mainService.getMutualInfo($localStorage.currentUserPortfolio.portfolio[i].symbol.toUpperCase()).then(function(response) {
        var price = (parseInt(response.data.list.resources[0].resource.fields.price));
        var multiply = price * number;
        user.portfolioPrice = user.portfolioPrice + multiply;
        mainService.updateUser(user)
        $localStorage.currentUser = user;
        mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
          $localStorage.currentUserPortfolio = response.data;
          $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
        })
      })
    };
  }

  $scope.removeFromPortfolio = function(id) {
    if ($localStorage.currentUser.portfolio.length === 1) {
      var user2 = $localStorage.currentUser;
      user2.portfolio = [];
      user2.portfolioNumber = [];
      $localStorage.currentUser = user2;
      mainService.updateUser(user2)
      mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
        $localStorage.currentUserPortfolio = response.data;
        $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
        $scope.calculatePortfolioPrice();
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
        user.portfolioNumber.splice(i, 1);
        $localStorage.currentUser = user;
        mainService.updateUser(user)
        mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
          $localStorage.currentUserPortfolio = response.data;
          $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio
          $scope.calculatePortfolioPrice();
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
