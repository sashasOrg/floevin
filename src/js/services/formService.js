angular.module('SashasApp').service('formService', function($http, $q, $cookies) {



  this.getFund = function() {
    return $http.get('/fund')
  };


  this.newFund = function(obj) {
    console.log(obj);
      $http.post('/fund', obj);
    };

  this.fundQuery = function(id) {
    return $http.get('/fund/specific?id=' + id)
  };

  this.updateFund = function(id, update) {
    return $http.put('/fund?id=' + id, update);
  };

  this.deleteFund = function(id){
    return $http.delete('/fund?id=' + id);
  };

  this.updateFund = function(id, updatedFund) {
    return $http.put('/fund?id=' + id, updatedFund);
  };

})
