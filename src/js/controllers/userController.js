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
  $scope.chartData = $localStorage.chartData;
  $scope.disabled = undefined;
  $scope.labels = $localStorage.goodBarData.labels
  $scope.series = $localStorage.goodBarData.series
  $scope.data = [$localStorage.goodBarData.data]
  $localStorage.currentUser.portfolioPrice = 0;
  $scope.calcRunning = false;


  $scope.getBarInfo = function() {
    $localStorage.goodBarData = {};
    $localStorage.goodBarData.data = [];
    $localStorage.goodBarData.labels = [];
    $localStorage.goodBarData.series = ["Price"];
    $localStorage.bestBarData = {};
    $localStorage.bestBarData.data = [];
    $localStorage.bestBarData.labels = [];
    $localStorage.bestBarData.series = ["Price"];
    for (var i = 0; i < $localStorage.currentUser.bestMatches.length; i++) {
      mainService.getMoreInformation($localStorage.currentUserBestMatches.bestMatches[i].symbol.toUpperCase()).then(function(response) {
        $localStorage.goodBarData.data.push(parseInt(response.data.query.results.quote.PreviousClose));
        $localStorage.goodBarData.labels.push(response.data.query.results.quote.Symbol)
      })
    }
    for (var i = 0; i < $localStorage.currentUser.goodMatches.length; i++) {
      mainService.getMoreInformation($localStorage.currentUserGoodMatches.goodMatches[i].symbol.toUpperCase()).then(function(response) {
        $localStorage.goodBarData.data.push(parseInt(response.data.query.results.quote.PreviousClose));
        $localStorage.goodBarData.labels.push(response.data.query.results.quote.Symbol);
      })
    }
  }

  $scope.changeShareNumber = function(name, number) {
    if (number) {
      for (var i = 0; i < $localStorage.currentUserPortfolio.portfolioNumber.length; i++) {
        console.log('Yes')
        if ($localStorage.currentUserPortfolio.portfolioNumber.length === 1) {
          var user = $localStorage.currentUserPortfolio;
          user.portfolioNumber[0].number = number;
          mainService.updateUser(user)
          mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
            $localStorage.currentUserPortfolio = response.data;
            $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
            // $scope.calculatePortfolioPrice();
          });
        }
        if (name.toUpperCase() === $localStorage.currentUserPortfolio.portfolioNumber[i].name.toUpperCase() && $localStorage.currentUserPortfolio.portfolioNumber.length > 1) {
          console.log('found')
          var user = $localStorage.currentUserPortfolio;
          user.portfolioNumber[i].number = number;
          number = '';
          mainService.updateUser(user)
          mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
            $localStorage.currentUserPortfolio = response.data;
            $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
            // $scope.calculatePortfolioPrice();
          });
        }
      }
    }
  }

  // $scope.calculatePortfolioPrice = function() {
  //   if (!$scope.calcRunning) {
  //     $scope.counter = 0;
  //     $scope.calcRunning = true;
  //     $localStorage.currentUserPortfolio.portfolioPrice = 0;
  //     var user = $localStorage.currentUserPortfolio;
  //     $scope.newNumber = [];
  //     $scope.newPrice = [];
  //     $scope.newMultiply = 0;
  //     user.portfolioPrice = 0;
  //     for (var i = 0; i < $localStorage.currentUserPortfolio.portfolioNumber.length; i++) {
  //       $scope.newNumber.push($localStorage.currentUserPortfolio.portfolioNumber[i].number);
  //       console.log('num', $scope.newNumber)
  //       console.log($localStorage.currentUserPortfolio.portfolioNumber)
  //       if ($scope.newNumber.length === $localStorage.currentUserPortfolio.portfolioNumber.length) {
  //         for (var z = 0; z < $localStorage.currentUserPortfolio.portfolioNumber.length; z++) {
  //           mainService.getMutualInfo($localStorage.currentUserPortfolio.portfolio[z].symbol.toUpperCase()).then(function(response) {
  //             $scope.newPrice.push(parseInt(response.data.list.resources[0].resource.fields.price));
  //             if ($scope.newPrice.length === $localStorage.currentUserPortfolio.portfolioNumber.length) {
  //               console.log($scope.newPrice)
  //               for (var x = 0; x < $scope.newPrice.length; x++) {
  //                 $scope.newMultiply = $scope.newPrice[x] * $scope.newNumber[x];
  //                 user.portfolioPrice += $scope.newMultiply;
  //                 console.log(user.portfolioPrice)
  //                 $localStorage.currentUserPortfolio = user;
  //                 mainService.updateUser(user)
  //                 mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
  //                   $localStorage.currentUserPortfolio = response.data;
  //                   $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
  //                   $scope.calcRunning = false;
  //                 });
  //               }
  //             }
  //           })
  //         }
  //       }
  //     };
  //   }
  // }
  // $scope.calculatePortfolioPrice();





  $scope.getChartInfo = function(symbol) {
    $scope.disabled = true;
    mainService.chartData = {};
    mainService.chartData.data = [];
    mainService.getChartInfo(symbol.toUpperCase()).then(function(response) {
      for (var i = 0; i < response.data.query.results.quote.length; i++) {
        var dateArray = response.data.query.results.quote[i].Date.split('-')
        var dataObject = {}
        dataObject.Open = response.data.query.results.quote[i].Open;
        dataObject.Low = response.data.query.results.quote[i].Low;
        dataObject.High = response.data.query.results.quote[i].High;
        dataObject.Close = response.data.query.results.quote[i].Close;
        dataObject.Volume = response.data.query.results.quote[i].Volume;
        dataObject.Date = response.data.query.results.quote[i].Date
        dataObject._date_Date = dataObject.Date;
        mainService.chartData.data.push(dataObject);
      }
      $localStorage.chartData = mainService.chartData;
      $scope.chartData = $localStorage.chartData;
      mainService.getMoreInformation(symbol).then(function(response) {
        mainService.specificData = response.data.query.results.quote;
        $localStorage.fundData = mainService.specificData;
          $scope.lineData = [];
          $scope.lineData[0] = [];
          $scope.lineData[1] = [];
          $scope.lineData[2] = [];
          $scope.lineLabels = [];
          var neededData = $scope.chartData.data.reverse();
          for (var i = 0; i < $scope.chartData.data.length; i++) {
            $scope.lineLabels.push(neededData[i].Date);
            $scope.lineData[0].push(neededData[i].High)
            $scope.lineData[1].push(neededData[i].Low)
            $scope.lineData[2].push(neededData[i].Open)
          }
          $localStorage.data = $scope.lineData;
          $localStorage.labels = $scope.lineLabels;
          neededData = null;
          fundService.searchFund(symbol).then(function(response) {
            $localStorage.fundData = response.data.list.resources[0].resource.fields;
            $scope.disabled = false;
            $state.go('fundinfo')
        })
      })
    })
  }






  $scope.getCompatibleFunds = function() {
    var user = $localStorage.currentUser;
    user.okayMatches = [];
    user.bestMatches = [];
    user.goodMatches = [];
    user.badMatches = [];
    user.okayMatchRatios = [];
    user.bestMatchRatios = [];
    user.goodMatchRatios = [];
    user.badMatchRatios = [];
    fundService.getFund().then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        if ((response.data[i].riskCompatibility / user.suitabilityScore) <= 1.1 && (response.data[i].riskCompatibility / user.suitabilityScore) >= .90) {
          if (!user.bestMatches.includes(response.data[i]._id)) {
            user.bestMatches.push(response.data[i]._id);
            user.bestMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            mainService.updateUser(user);
            $localStorage.currentUser = user;
          }
        } else if ((response.data[i].riskCompatibility / user.suitabilityScore) < .90 && (response.data[i].riskCompatibility / user.suitabilityScore) >= .70) {
          if (!user.goodMatches.includes(response.data[i]._id)) {
            user.goodMatches.push(response.data[i]._id);
            user.goodMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            mainService.updateUser(user);
            $localStorage.currentUser = user;
          }
        } else if ((response.data[i].riskCompatibility / user.suitabilityScore) <= 1.3 && (response.data[i].riskCompatibility / user.suitabilityScore) > 1.1) {
          if (!user.goodMatches.includes(response.data[i]._id)) {
            user.goodMatches.push(response.data[i]._id);
            user.goodMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            mainService.updateUser(user);
            $localStorage.currentUser = user;
          }
        } else if ((response.data[i].riskCompatibility / user.suitabilityScore) <= 1.5 && (response.data[i].riskCompatibility / user.suitabilityScore) > 1.3) {
          if (!user.goodMatches.includes(response.data[i]._id)) {
            user.okayMatches.push(response.data[i]._id);
            user.okayMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            mainService.updateUser(user);
            $localStorage.currentUser = user;
          }
        } else if ((response.data[i].riskCompatibility / user.suitabilityScore) < .70 && (response.data[i].riskCompatibility / user.suitabilityScore) >= .50) {
          if (!user.okayMatches.includes(response.data[i]._id)) {
            user.okayMatches.push(response.data[i]._id);
            user.okayMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            mainService.updateUser(user);
            $localStorage.currentUser = user;
          }
        } else if ((response.data[i].riskCompatibility / user.suitabilityScore) < .50 && (response.data[i].riskCompatibility / user.suitabilityScore) >= 0) {
          if (!user.badMatches.includes(response.data[i]._id)) {
            user.badMatches.push(response.data[i]._id);
            user.badMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
            mainService.updateUser(user);
            $localStorage.currentUser = user;
          }
        } else if ((response.data[i].riskCompatibility / user.suitabilityScore) <= 2 && (response.data[i].riskCompatibility / user.suitabilityScore) > 1.5) {
          if (!user.badMatches.includes(response.data[i]._id)) {
            user.badMatches.push(response.data[i]._id);
            user.badMatchRatios.push({compatibilityRatio: response.data[i].riskCompatibility / user.suitabilityScore})
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
      user2.portfolioNumber = [];
      $localStorage.currentUser = user2;
      mainService.updateUser(user2)
      mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
        $localStorage.currentUserPortfolio = response.data;
        $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
        $scope.calculatePortfolioPrice();
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
        user.portfolioNumber.splice(i, 1);
        $localStorage.currentUser = user;
        mainService.updateUser(user)
        mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
          $localStorage.currentUserPortfolio = response.data;
          $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
          $scope.calculatePortfolioPrice();
          $state.reload();
        })
      }
    }
  };
  $scope.removeRecommendedFromPortfolio = function(id) {
    if ($localStorage.currentUser.portfolio.length === 1) {
      var user2 = $localStorage.currentUser;
      user2.portfolio = [];
      user2.portfolioNumber = [];
      $localStorage.currentUser = user2;
      mainService.updateUser(user2)
      mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
        $localStorage.currentUserPortfolio = response.data
        $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
        $scope.calculatePortfolioPrice();
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
        user.portfolioNumber.splice(i, 1);
        $localStorage.currentUser = user;
        mainService.updateUser(user)
        mainService.getUserPortfolio($localStorage.currentUser.username).then(function(response) {
          $localStorage.currentUserPortfolio = response.data;
          $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
          $scope.calculatePortfolioPrice();
          $state.reload();
        })
      }
    }
  };
  $scope.addRecommendedToPortfolio = function(id, name, number) {
    if (number) {
      var user = $localStorage.currentUser
      for (var i = 0; i < user.portfolio.length; i++) {
        if (id === $localStorage.currentUser.portfolio[i]) {
          return false;
        }
      }
      user.portfolio.push(id)
      user.portfolioNumber.push({number: number, name: name})
      number = '';
      $localStorage.currentUser = user;
      $scope.currentUserCookie = $localStorage.currentUser;
      mainService.updateUser(user)
      mainService.getUserPortfolio(user.username).then(function(response) {
        $localStorage.currentUserPortfolio = response.data;
        $scope.currentUserPortfolioCookie = $localStorage.currentUserPortfolio;
        $state.reload();
      })
    };
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
