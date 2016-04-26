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
  $scope.getBarInfo = function() {
    $localStorage.goodBarData = {};
    $localStorage.goodBarData.data = [];
    $localStorage.goodBarData.labels = [];
    $localStorage.goodBarData.series = ["Price"];
    $localStorage.bestBarData = {};
    $localStorage.bestBarData.data = [];
    $localStorage.bestBarData.labels = [];
    $localStorage.bestBarData.series = ["Price"];
    console.log('running')
    for (var i = 0; i < $localStorage.currentUser.bestMatches.length; i++) {
      mainService.getMoreInformation($localStorage.currentUserBestMatches.bestMatches[i].symbol.toUpperCase()).then(function(response) {
        $localStorage.goodBarData.data.push(parseInt(response.data.query.results.quote.PreviousClose));
        $localStorage.goodBarData.labels.push(response.data.query.results.quote.Symbol)
      })
    }
    for (var i = 0; i < $localStorage.currentUser.goodMatches.length; i++) {
      mainService.getMoreInformation($localStorage.currentUserGoodMatches.goodMatches[i].symbol.toUpperCase()).then(function(response) {
        $localStorage.goodBarData.data.push(parseInt(response.data.query.results.quote.PreviousClose));
        $localStorage.goodBarData.labels.push(response.data.query.results.quote.Symbol);
      })
    }
  }

  if ($localStorage.currentUser) {
     $scope.getBarInfo();
   }
  // $scope.getChartInfo = function() {
  //   mainService.chartData = {};
  //   mainService.getChartInfo('AAPL').then(function(response) {
  //     console.log(response);
  //     for (var i = 0; i < response.data.query.results.quote.length; i++) {
  //       var dateArray =
  //       console.log(response.data.query.results.quote[i].Date.split('-'));
  //     }
  //   })
  // }
  // $scope.getChartInfo();
/**********************
image slideshow
**********************/

$("#slideshow > div:gt(0)").hide();

setInterval(function() {
  $('#slideshow > div:first')
    .fadeOut(6000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow');
},  10000);


});
