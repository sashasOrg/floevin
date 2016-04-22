angular.module('SashasApp').service('mainService', function($http, $q, $localStorage, $cookies) {
  this.data = [];

  var date = new Date();
  var today = new Date().toDateString().slice(3);
  var today = today.split(" ")
  var today = today.slice(1)
  var today = [today[2], date.getMonth() + 1, today[1]]
  var newToday = today[0] + '-' + today[1] + '-' + today[2];
  var year = today[0] - 1
  var yearAgo = year + '-' + today[1] + '-' + today[2];


  

  this.getMoreInformation = function(symbol) {
    return $http.get('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22' + symbol + '%22,%22' + symbol + '%22)&format=json&env=http://datatables.org/alltables.env')
  }
  this.updateUser = function(currentUserObject) {
    return $http.put('user?id=' + $localStorage.currentUser._id, currentUserObject);
  }
  this.getUserPortfolio = function(username) {
    return $http.get('user/portfolio?username=' + username);
  }
  this.getBadMatches = function(username) {
    return $http.get('user/badmatches?username=' + username);
  }
  this.getOkayMatches = function(username) {
    return $http.get('user/okaymatches?username=' + username);
  }
  this.getGoodMatches = function(username) {
    return $http.get('user/goodmatches?username=' + username);
  }
  this.getBestMatches = function(username) {
    return $http.get('user/bestmatches?username=' + username);
  }
  this.getChartInfo = function(symbol) {
    return $http.jsonp('http://query.yahooapis.com/v1/public/yql?q= select * from   yahoo.finance.historicaldata          where  symbol    = "' + symbol + '"          and    startDate = "' + yearAgo + '"          and    endDate   = "' + newToday + '" &format=json &diagnostics=true &env=store://datatables.org/alltableswithkeys &callback=JSON_CALLBACK')
  }


});
