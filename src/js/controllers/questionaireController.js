angular.module('SashasApp').controller('questionaireController', function($scope, $cookies, $state, questionaireService, mainService) {

         $scope.age_answer = [];
         $scope.age_answer["30"]=10;
         $scope.age_answer["3040"]=8;
         $scope.age_answer["4050"]=6;
         $scope.age_answer["5065"]=4;
         $scope.age_answer["65"]=2;

         $scope.objective_answer = [];
         $scope.objective_answer["Spec"]=10;
         $scope.objective_answer["Growth"]=8;
         $scope.objective_answer["Income"]=6;
         $scope.objective_answer["Tax"]=4;
         $scope.objective_answer["Safety"]=1;

         $scope.income_answer = [];
         $scope.income_answer["I50"]=2;
         $scope.income_answer["I50100"]=4;
         $scope.income_answer["I100250"]=6;
         $scope.income_answer["I250500"]=8;
         $scope.income_answer["I500"]=10;

         $scope.timeFrame_answer = [];
         $scope.timeFrame_answer["6mo1yr"]=1;
         $scope.timeFrame_answer["1to3yr"]=4;
         $scope.timeFrame_answer["3to5yr"]=6;
         $scope.timeFrame_answer["5to7yr"]=8;
         $scope.timeFrame_answer["7+"]=10;

        (function(angular) {
            $scope.data = {
             repeatSelect: null,
             availableOptions: [
               {id: '...', name: ''},
               {id: .80, name: 'Limited'},
               {id: .85, name: 'Some'},
               {id: .90, name: 'Good'},
               {id: .95, name: 'Experienced'},
               {id: 1, name: 'Professional'}
             ],
            };
         })(window.angular);

        $scope.getAge = function()
        {
            var ageFill=0;
            var theForm = document.forms["form"];
            var age = theForm.elements["ageselected"];
            for(var i = 0; i < age.length; i++)
            {
                if(age[i].checked)
                {
                    ageFill = $scope.age_answer[age[i].value];
                    break;
                }
            }
            return ageFill;
        }

        $scope.getObjective = function()
        {
            var objectiveFill=0;
            var theForm = document.forms["form"];
            var objective = theForm.elements["objectiveselected"];
            for(var i = 0; i < objective.length; i++)
            {
                if(objective[i].checked)
                {
                    objectiveFill = $scope.objective_answer[objective[i].value];
                    break;
                }
            }
            return objectiveFill;
        }

        $scope.getIncome = function()
        {
            var incomeFill=0;
            var theForm = document.forms["form"];
            var income = theForm.elements["incomeselected"];
            for(var i = 0; i < income.length; i++)
            {
                if(income[i].checked)
                {
                    incomeFill = $scope.income_answer[income[i].value];
                    break;
                }
            }
            return incomeFill;
        }
        $scope.getTimeFrame = function(){
          var timeframeFill=0;
          var theForm = document.forms["form"];
          var timeframe= theForm.elements["timeframeselected"];
          for(var i = 0; i < timeframe.length; i++)
          {
              if(timeframe[i].checked)
              {
                  timeframeFill = $scope.timeFrame_answer[timeframe[i].value];
                  break;
              }
          }
          return timeframeFill;
        }

        $scope.calculateTotal = function() {
          $scope.disabled = true;
            var riskLevel = ((($scope.getAge() + $scope.getObjective() + $scope.getIncome() + $scope.getTimeFrame()) / 4) * 10) * $scope.data.repeatSelect;
            var user = JSON.parse($cookies.get('currentUser'));
            user.suitabilityScore = riskLevel;
            user.badMatches = [];
            user.badMatchRatios = [];
            user.okayMatches = [];
            user.okayMatchRatios = [];
            user.goodMatches = [];
            user.goodMatchRatios = [];
            user.bestMatches = [];
            user.bestMatchRatios = [];
            $cookies.remove('currentUser');
            $cookies.put('currentUser', JSON.stringify(user));
            mainService.updateUser(user).then(function(response) {
              console.log("I did yay")
              $state.go('portfolio');
              $scope.disabled = false;
            })
        }
    })
