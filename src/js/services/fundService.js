angular.module('SashasApp').service('fundService', function($http, $q, $cookies) {



  this.getFund = function(){
    return $http.get('/fund')
  };

  this.searchFund = function(symbol) {
    return $http.jsonp('http://finance.yahoo.com/webservice/v1/symbols/' + symbol + '/quote?format=json&view=detail&callback=JSON_CALLBACK')
  }

  this.newFund = function(obj){
    console.log(obj);
      $http.post('/fund', obj);
    };

  this.fundQuery = function(id){
    return $http.get('/fund/specific?id=' + id)
  };

  this.updateFund = function(id, updatedFund) {
    return $http.put('/fund?id=' + id, updatedFund);
  };

  this.deleteFund = function(id){
    return $http({
          method: 'DELETE',
          url: '/fund?id=' + id
        }).then(function successCallback(response) {
          return response;
        },function errorCallback(response) {
          return response;
      });
    };
})
