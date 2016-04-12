angular.module('SashasApp').service('formService', function($http, $q) {



  this.getFund = function(){
    return $http.get('/fund')
  };
  this.newFund = function(name, symbol, price, assetClass, beta, expenseRatio, loadType, riskBracket, riskPotential){
          var deferred = $q.defer();
      $http.post('/fund', {name: name, symbol: symbol, price: price, assetClass: assetClass, beta: beta, expenseRatio: expenseRatio, loadType: loadType, riskBracket: riskBracket, riskPotential: riskPotential})
      .success(function (data, status){
          if(status === 200 && data.status){
            deferred.resolve();
          }else{
            deferred.reject();
          }
        })
        .error(function (data){
          deferred.reject(data);
        });
        return deferred.promise;
    };

})
