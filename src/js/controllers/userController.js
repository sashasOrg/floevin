angular.module('SashasApp').controller('userController', function($scope, $state, $cookies, mainService, fundService) {
  $scope.currentUserCookie = JSON.parse($cookies.get('currentUser'));
  $scope.$watch($scope.currentUserCookie);
  $scope.currentUserPortfolioCookie = JSON.parse($cookies.get('currentUserPortfolio'))
  $scope.$watch($scope.currentUserPortfolioCookie);
  $scope.currentUserBadMatchesCookie = JSON.parse($cookies.get('currentUserBadMatches'))
  $scope.$watch($scope.currentUserBadMatchesCookie);
  $scope.currentUserOkayMatchesCookie = JSON.parse($cookies.get('currentUserOkayMatches'))
  $scope.$watch($scope.currentUserOkayMatchesCookie);
  $scope.currentUserGoodMatchesCookie = JSON.parse($cookies.get('currentUserGoodMatches'))
  $scope.$watch($scope.currentUserGoodMatchesCookie);
  $scope.currentUserBestMatchesCookie = JSON.parse($cookies.get('currentUserBestMatches'))
  $scope.$watch($scope.currentUserBestMatchesCookie);


  $scope.getCompatibleFunds = function() {
    var user = JSON.parse($cookies.get('currentUser'));
    fundService.getFund().then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i].riskCompatibility / user.suitabilityScore)
        if ((response.data[i].riskCompatibility / user.suitabilityScore) <= 1.1 && (response.data[i].riskCompatibility / user.suitabilityScore) >= .90) {
          if (!user.bestMatches.includes(response.data[i]._id)) {
            user.bestMatches.push(response.data[i]._id);
            user.bestMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            console.log('best match', user);
            mainService.updateUser(user);
            $cookies.remove('currentUser');
            $cookies.put('currentUser', JSON.stringify(user));
          }
        } else if ((response.data[i].riskCompatibility / user.suitabilityScore) < .90 && (response.data[i].riskCompatibility / user.suitabilityScore) >= .70) {
          if (!user.goodMatches.includes(response.data[i]._id)) {
            user.goodMatches.push(response.data[i]._id);
            user.goodMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            console.log('good match', user);
            mainService.updateUser(user);
            $cookies.remove('currentUser');
            $cookies.put('currentUser', JSON.stringify(user));
          }
        } else if ((response.data[i].riskCompatibility / user.suitabilityScore) <= 1.3 && (response.data[i].riskCompatibility / user.suitabilityScore) > 1.1) {
          if (!user.goodMatches.includes(response.data[i]._id)) {
            user.goodMatches.push(response.data[i]._id);
            user.goodMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            console.log('good match', user);
            mainService.updateUser(user);
            $cookies.remove('currentUser');
            $cookies.put('currentUser', JSON.stringify(user));
          }
        } else if ((response.data[i].riskCompatibility / user.suitabilityScore) <= 1.5 && (response.data[i].riskCompatibility / user.suitabilityScore) > 1.3) {
          if (!user.goodMatches.includes(response.data[i]._id)) {
            user.okayMatches.push(response.data[i]._id);
            user.okayMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            console.log('okay match', user);
            mainService.updateUser(user);
            $cookies.remove('currentUser');
            $cookies.put('currentUser', JSON.stringify(user));
          }
        } else if ((response.data[i].riskCompatibility / user.suitabilityScore) < .70 && (response.data[i].riskCompatibility / user.suitabilityScore) >= .50) {
          if (!user.okayMatches.includes(response.data[i]._id)) {
            user.okayMatches.push(response.data[i]._id);
            user.okayMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            console.log('okay match', user);
            mainService.updateUser(user);
            $cookies.remove('currentUser');
            $cookies.put('currentUser', JSON.stringify(user));
          }
        } else if ((response.data[i].riskCompatibility / user.suitabilityScore) < .50 && (response.data[i].riskCompatibility / user.suitabilityScore) >= 0) {
          if (!user.badMatches.includes(response.data[i]._id)) {
            user.badMatches.push(response.data[i]._id);
            user.badMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            console.log('bad match', user);
            mainService.updateUser(user);
            $cookies.remove('currentUser');
            $cookies.put('currentUser', JSON.stringify(user));
          }
        } else if ((response.data[i].riskCompatibility / user.suitabilityScore) <= 2 && (response.data[i].riskCompatibility / user.suitabilityScore) > 1.5) {
          if (!user.badMatches.includes(response.data[i]._id)) {
            user.badMatches.push(response.data[i]._id);
            user.badMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            console.log('bad match', user);
            mainService.updateUser(user);
            $cookies.remove('currentUser');
            $cookies.put('currentUser', JSON.stringify(user));
          }
        }
      };
      mainService.getBadMatches(JSON.parse($cookies.get('currentUser')).username).then(function(responseThree) {
        $cookies.remove('currentUserBadMatches');
        $cookies.put('currentUserBadMatches', JSON.stringify(responseThree.data))
        mainService.getOkayMatches(JSON.parse($cookies.get('currentUser')).username).then(function(responseFour) {
          $cookies.remove('currentUserOkayMatches');
          $cookies.put('currentUserOkayMatches', JSON.stringify(responseFour.data))
          mainService.getGoodMatches(JSON.parse($cookies.get('currentUser')).username).then(function(responseFive) {
            $cookies.remove('currentUserGoodMatches');
            $cookies.put('currentUserGoodMatches', JSON.stringify(responseFive.data))
            mainService.getBestMatches(JSON.parse($cookies.get('currentUser')).username).then(function(responseSix) {
              $cookies.remove('currentUserBestMatches');
              $cookies.put('currentUserBestMatches', JSON.stringify(responseSix.data))
              $state.reload();
            });
          });
        });
      })
    });
  };
  $scope.checkPortfolio = function(id) {
    for (var i = 0; i < JSON.parse($cookies.get('currentUserPortfolio')).portfolio.length; i++) {
      if (id === JSON.parse($cookies.get('currentUserPortfolio')).portfolio[i]._id) {
        return true;
      } else {
        return false;
      }
    }
  }
  $scope.removeFromPortfolio = function(id) {
    if (JSON.parse($cookies.get('currentUser')).portfolio.length === 1) {
      var user2 = JSON.parse($cookies.get('currentUser'));
      user2.portfolio = [];
      $cookies.remove('currentUser');
      $cookies.put('currentUser', JSON.stringify(user2));
      mainService.updateUser(user2)
      mainService.getUserPortfolio(JSON.parse($cookies.get('currentUser')).username).then(function(response) {
        $cookies.remove('currentUserPortfolio');
        $cookies.put('currentUserPortfolio', JSON.stringify(response.data));
        $state.reload();
      })
    }
    mainService.getUserPortfolio(JSON.parse($cookies.get('currentUser')).username).then(function(response) {
      $cookies.remove('currentUserPortfolio');
      $cookies.put('currentUserPortfolio', JSON.stringify(response.data));
    })
    for (var i = 0; i < JSON.parse($cookies.get('currentUser')).portfolio.length; i++) {
      if (id === JSON.parse($cookies.get('currentUser')).portfolio[i]) {
        var user = JSON.parse($cookies.get('currentUser'));
        user.portfolio.splice(i, 1);
        $cookies.remove('currentUser');
        $cookies.put('currentUser', JSON.stringify(user));
        mainService.updateUser(user)
        mainService.getUserPortfolio(JSON.parse($cookies.get('currentUser')).username).then(function(response) {
          $cookies.remove('currentUserPortfolio');
          $cookies.put('currentUserPortfolio', JSON.stringify(response.data));
          $state.reload();
        })
      }
    }
  };
  $scope.removeRecommendedFromPortfolio = function(id) {
    if (JSON.parse($cookies.get('currentUser')).portfolio.length === 1) {
      var user2 = JSON.parse($cookies.get('currentUser'));
      user2.portfolio = [];
      $cookies.remove('currentUser');
      $cookies.put('currentUser', JSON.stringify(user2));
      mainService.updateUser(user2)
      mainService.getUserPortfolio(JSON.parse($cookies.get('currentUser')).username).then(function(response) {
        $cookies.remove('currentUserPortfolio');
        $cookies.put('currentUserPortfolio', JSON.stringify(response.data));
        $state.reload();
      })
    }
    mainService.getUserPortfolio(JSON.parse($cookies.get('currentUser')).username).then(function(response) {
      $cookies.remove('currentUserPortfolio');
      $cookies.put('currentUserPortfolio', JSON.stringify(response.data));
    })
    for (var i = 0; i < JSON.parse($cookies.get('currentUser')).portfolio.length; i++) {
      if (id === JSON.parse($cookies.get('currentUser')).portfolio[i]) {
        var user = JSON.parse($cookies.get('currentUser'));
        user.portfolio.splice(i, 1);
        $cookies.remove('currentUser');
        $cookies.put('currentUser', JSON.stringify(user));
        mainService.updateUser(user)
        mainService.getUserPortfolio(JSON.parse($cookies.get('currentUser')).username).then(function(response) {
          $cookies.remove('currentUserPortfolio');
          $cookies.put('currentUserPortfolio', JSON.stringify(response.data));
          $state.reload()
        })
      }
    }
  };
  $scope.addRecommendedToPortfolio = function(id) {
    var user = JSON.parse($cookies.get('currentUser'));
    for (var i = 0; i < user.portfolio.length; i++) {
      if (id === JSON.parse($cookies.get('currentUser')).portfolio[i]) {
        return false;
      }
    }
    user.portfolio.push(id)
    $cookies.remove('currentUser');
    $cookies.put('currentUser', JSON.stringify(user));
    mainService.updateUser(user)
    mainService.getUserPortfolio(user.username).then(function(response) {
      $cookies.remove('currentUserPortfolio');
      $cookies.put('currentUserPortfolio', JSON.stringify(response.data))
      $state.reload();
    })
  };
  $scope.checkUserCookie = function() {
    console.log('yes', JSON.parse($cookies.get('currentUser')))
    console.log('hello', JSON.parse($cookies.get('currentUserPortfolio')));
  }
  $scope.checkPortfolio = function(id) {
    var user = JSON.parse($cookies.get('currentUser'));
    for (var i = 0; i < user.portfolio.length; i++) {
      if (id === JSON.parse($cookies.get('currentUser')).portfolio[i]) {
        return true;
      }
    }
    return false;
  }
  $scope.getMoreInformation = function(symbol) {
    mainService.getMoreInformation(symbol).then(function(response) {
      console.log(response);
      $cookies.remove('fundData')
      $cookies.put('fundData', JSON.stringify(response.data.query.results.quote))
      $state.reload();
    })
  }
})
