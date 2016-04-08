angular.module('SashasApp').service('mainService', function($http, $q) {
  this.data;
  this.getSymbols = function() {
    return $http.get('http://www.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nyse&render=download&format=json&view=detail')
  }
})
