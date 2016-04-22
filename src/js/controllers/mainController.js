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
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow');
},  6000);


});
