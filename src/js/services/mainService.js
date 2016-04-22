angular.module('SashasApp').service('mainService', function($http, $q, $localStorage, $cookies) {
  this.data = [];

  // this.getSymbols = function() {
  //   var stockData = [];
  //   var arrayOfLetters = [];
  //   function toLetters(num) {
  //       var mod = num % 26;
  //       var pow = num / 26 | 0;
  //       var out = mod ? String.fromCharCode(64 + mod) : (pow--, 'Z');
  //       return pow ? toLetters(pow) + out : out;
  //   }
  //   for (var x = 1, y; x <= 702; x++) {
  //       arrayOfLetters.push((y = toLetters(x)));
  //   }
  //   for (var i = 0; i < arrayOfLetters.length; i++) {
  //       $http.jsonp('http://d.yimg.com/aq/autoc?query=' + arrayOfLetters[i] + '&region=US&lang=en-US&callback=JSON_CALLBACK').then(function(response) {
  //         for (var z = 0; z < response.data.ResultSet.Result.length; z++) {
  //           stockData.push(response.data.ResultSet.Result[z]);
  //           console.log(stockData)
  //       }
  //     })
  //   }
  // }

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
  // this.getChartInfo = function(symbol) {
  //   return $http.jsonp('http://query.yahooapis.com/v1/public/yql?q= select * from   yahoo.finance.historicaldata          where  symbol    = "' + symbol + '"          and    startDate = "2012-09-11"          and    endDate   = "2014-02-11" &format=json &diagnostics=true &env=store://datatables.org/alltableswithkeys &callback=JSON_CALLBACK')
  // }


});
