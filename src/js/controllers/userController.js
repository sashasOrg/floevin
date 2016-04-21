angular.module('SashasApp').controller('userController', function($scope, $state, $cookies, $localStorage, mainService, fundService) {
  $scope.currentUserCookie = $localStorage.currentUser;
  $scope.$watch($scope.currentUserCookie);
  $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
  $scope.$watch($scope.currentUserPortfolioCookie);
  $scope.currentUserBadMatchesCookie = $localStorage.currentUserBadMatches;
  $scope.$watch($scope.currentUserBadMatchesCookie);
  $scope.currentUserOkayMatchesCookie = $localStorage.currentUserOkayMatches;
  $scope.$watch($scope.currentUserOkayMatchesCookie);
  $scope.currentUserGoodMatchesCookie = $localStorage.currentUserGoodMatches;
  $scope.$watch($scope.currentUserGoodMatchesCookie);
  $scope.currentUserBestMatchesCookie = $localStorage.currentUserBestMatches;
  $scope.$watch($scope.currentUserBestMatchesCookie);


  $scope.getCompatibleFunds = function() {
    var user = $localStorage.currentUser;
    fundService.getFund().then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i].riskCompatibility / user.suitabilityScore)
        if ((response.data[i].riskCompatibility / user.suitabilityScore) <= 1.1 && (response.data[i].riskCompatibility / user.suitabilityScore) >= .90) {
          if (!user.bestMatches.includes(response.data[i]._id)) {
            user.bestMatches.push(response.data[i]._id);
            user.bestMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            console.log('best match', user);
            mainService.updateUser(user);
            $localStorage.currentUser = user;
          }
        } else if ((response.data[i].riskCompatibility / user.suitabilityScore) < .90 && (response.data[i].riskCompatibility / user.suitabilityScore) >= .70) {
          if (!user.goodMatches.includes(response.data[i]._id)) {
            user.goodMatches.push(response.data[i]._id);
            user.goodMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            console.log('good match', user);
            mainService.updateUser(user);
            $localStorage.currentUser = user;
          }
        } else if ((response.data[i].riskCompatibility / user.suitabilityScore) <= 1.3 && (response.data[i].riskCompatibility / user.suitabilityScore) > 1.1) {
          if (!user.goodMatches.includes(response.data[i]._id)) {
            user.goodMatches.push(response.data[i]._id);
            user.goodMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            console.log('good match', user);
            mainService.updateUser(user);
            $localStorage.currentUser = user;
          }
        } else if ((response.data[i].riskCompatibility / user.suitabilityScore) <= 1.5 && (response.data[i].riskCompatibility / user.suitabilityScore) > 1.3) {
          if (!user.goodMatches.includes(response.data[i]._id)) {
            user.okayMatches.push(response.data[i]._id);
            user.okayMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            console.log('okay match', user);
            mainService.updateUser(user);
            $localStorage.currentUser = user;
          }
        } else if ((response.data[i].riskCompatibility / user.suitabilityScore) < .70 && (response.data[i].riskCompatibility / user.suitabilityScore) >= .50) {
          if (!user.okayMatches.includes(response.data[i]._id)) {
            user.okayMatches.push(response.data[i]._id);
            user.okayMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            console.log('okay match', user);
            mainService.updateUser(user);
            $localStorage.currentUser = user;
          }
        } else if ((response.data[i].riskCompatibility / user.suitabilityScore) < .50 && (response.data[i].riskCompatibility / user.suitabilityScore) >= 0) {
          if (!user.badMatches.includes(response.data[i]._id)) {
            user.badMatches.push(response.data[i]._id);
            user.badMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            console.log('bad match', user);
            mainService.updateUser(user);
            $localStorage.currentUser = user;
          }
        } else if ((response.data[i].riskCompatibility / user.suitabilityScore) <= 2 && (response.data[i].riskCompatibility / user.suitabilityScore) > 1.5) {
          if (!user.badMatches.includes(response.data[i]._id)) {
            user.badMatches.push(response.data[i]._id);
            user.badMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            console.log('bad match', user);
            mainService.updateUser(user);
            $localStorage.currentUser = user;
          }
        }
      };
      mainService.getBadMatches($localStorage.currentUser.username).then(function(responseThree) {
        $localStorage.currentUserBadMatches = responseThree.data
        mainService.getOkayMatches($localStorage.currentUser.username).then(function(responseFour) {
          $localStorage.currentUserOkayMatches = responseFour.data
          mainService.getGoodMatches($localStorage.currentUser.username).then(function(responseFive) {
            $localStorage.currentUserGoodMatches = responseFive.data
            mainService.getBestMatches($localStorage.currentUser.username).then(function(responseSix) {
              $localStorage.currentUserBestMatches = responseSix.data
              $state.reload();
            });
          });
        });
      })
    });
  };
  $scope.checkPortfolio = function(id) {
    for (var i = 0; i < $localStorage.currentUserPortfolio.portfolio.length; i++) {
      if (id === $localStorage.currentUserPortfolio.portfolio[i]._id) {
        return true;
      } else {
        return false;
      }
    }
  }
  $scope.removeFromPortfolio = function(id) {
    if ($localStorage.currentUser.portfolio.length === 1) {
      var user2 = $localStorage.currentUser;
      user2.portfolio = [];
      $localStorage.currentUser = user2;
      mainService.updateUser(user2)
      mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
        $localStorage.currentUserPortfolio = response.data;
        $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
        $state.reload();
      })
    }
    mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
      $localStorage.currentUserPortfolio = response.data;
      $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
    })
    for (var i = 0; i < $localStorage.currentUser.portfolio.length; i++) {
      if (id === $localStorage.currentUser.portfolio[i]) {
        var user = $localStorage.currentUser;
        user.portfolio.splice(i, 1);
        $localStorage.currentUser = user;
        mainService.updateUser(user)
        mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
          $localStorage.currentUserPortfolio = response.data;
          $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio
          $state.reload();
        })
      }
    }
  };
  $scope.removeRecommendedFromPortfolio = function(id) {
    if ($localStorage.currentUser.portfolio.length === 1) {
      var user2 = $localStorage.currentUser;
      user2.portfolio = [];
      $localStorage.currentUser = user2;
      mainService.updateUser(user2)
      mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
        $localStorage.currentUserPortfolio = response.data
        $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio
        $state.reload();
      })
    }
    mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
      $localStorage.currentUserPortfolio = response.data;
      $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
    })
    for (var i = 0; i < $localStorage.currentUser.portfolio.length; i++) {
      if (id === $localStorage.currentUser.portfolio[i]) {
        var user = $localStorage.currentUser;
        user.portfolio.splice(i, 1);
        $localStorage.currentUser = user;
        mainService.updateUser(user)
        mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
          $localStorage.currentUserPortfolio = response.data;
          $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
          $state.reload();
        })
      }
    }
  };
  $scope.addRecommendedToPortfolio = function(id) {
    var user = $localStorage.currentUser
    for (var i = 0; i < user.portfolio.length; i++) {
      if (id === $localStorage.currentUser.portfolio[i]) {
        return false;
      }
    }
    user.portfolio.push(id)
    $localStorage.currentUser = user;
    $scope.currentUserCookie = $localStorage.currentUser;
    mainService.updateUser(user)
    mainService.getUserPortfolio(user.username).then(function(response) {
      $localStorage.currentUserPortfolio = response.data;
      $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
      $state.reload();
    })
  };
  $scope.checkUserCookie = function() {
    console.log('yes', $localStorage.currentUser)
    console.log('hello', $localStorage.currentUserPortfolio);
  }
  $scope.checkPortfolio = function(id) {
    var user = $localStorage.currentUser;
    for (var i = 0; i < user.portfolio.length; i++) {
      if (id === $localStorage.currentUser.portfolio[i]) {
        return true;
      }
    }
    return false;
  }
  $scope.getMoreInformation = function(symbol) {
    mainService.getMoreInformation(symbol).then(function(response) {
      $localStorage.fundData = response.data.query.results.quote
      $state.reload();
    })
  }
})
