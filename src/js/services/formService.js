angular.module('SashasApp').service('formService', function($http, $q) {



  this.getFund = function(){
    return $http.get('/fund')
  };


  this.newFund = function(obj){
    console.log(obj);
      $http.post('/fund', obj);
    };

this.fundQuery = function(id){
  return $http.get('/fund/specific?id=' + id)
};

  this.updateFund = function(id){
  return $http.put('/fund' +id, update );
};
  this.deleteFund = function(id){
    $http({
          method: 'DELETE',
          url: '/fund?id=' + id
        }).then(function successCallback(response) {
          return response;
        },function errorCallback(response) {
          return response;
      });
    };
})
