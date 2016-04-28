angular.module('SashasApp').controller('questionaireController', function($scope, $cookies, $state, $window, $localStorage, questionaireService, mainService) {

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

         $scope.liquidity_answer = [];
         $scope.liquidity_answer["Low"]=2;
         $scope.liquidity_answer["Medium-Low"]=4;
         $scope.liquidity_answer["Medium"]=6;
         $scope.liquidity_answer["Medium-High"]=8;
         $scope.liquidity_answer["High"]=10;

         $scope.experience_answer = [];
         $scope.experience_answer["Low-Experience"]=2;
         $scope.experience_answer["Medium-Low-Experience"]=4;
         $scope.experience_answer["Medium-Experience"]=6;
         $scope.experience_answer["Medium-High-Experience"]=8;
         $scope.experience_answer["High-Experience"]=10;

         $scope.stockexperience_answer = [];
         $scope.stockexperience_answer["Low-Experience-Stock"]=2;
         $scope.stockexperience_answer["Medium-Low-Experience-Stock"]=4;
         $scope.stockexperience_answer["Medium-Experience-Stock"]=6;
         $scope.stockexperience_answer["Medium-High-Experience-Stock"]=8;
         $scope.stockexperience_answer["High-Experience-Stock"]=10;

         $scope.bondexperience_answer = [];
         $scope.bondexperience_answer["Low-Experience-bond"]=2;
         $scope.bondexperience_answer["Medium-Low-Experience-bond"]=4;
         $scope.bondexperience_answer["Medium-Experience-bond"]=6;
         $scope.bondexperience_answer["Medium-High-Experience-bond"]=8;
         $scope.bondexperience_answer["High-Experience-bond"]=10;


        (function(angular) {
            $scope.data = {
             repeatSelect: null,
             availableOptions: [
               {id: '...', name: ''},
               {id: .80, name: 'Limited'},
               {id: .85, name: 'Some'},
               {id: .90, name: 'Good'},
               {id: .95, name: 'Expert'},
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
        $scope.getLiquidity = function() {
          var liquidityFill = 0;
          var theForm = document.forms["form"];
          var liquidity = theForm.elements["liquidityselected"];
          for(var i = 0; i < liquidity.length; i++)
          {
              if(liquidity[i].checked)
              {
                  liquidityFill = $scope.liquidity_answer[liquidity[i].value];
                  break;
              }
          }
          return liquidityFill;
        }
        $scope.getExperience = function() {
          var experienceFill = 0;
          var theForm = document.forms["form"];
          var experience = theForm.elements["experienceselected"];
          for(var i = 0; i < experience.length; i++)
          {
              if(experience[i].checked)
              {
                  experienceFill = $scope.experience_answer[experience[i].value];
                  break;
              }
          }
          return experienceFill;
        }
        $scope.getStockExperience = function() {
          var experienceFill = 0;
          var theForm = document.forms["form"];
          var experience = theForm.elements["stockexperienceselected"];
          for(var i = 0; i < experience.length; i++)
          {
              if(experience[i].checked)
              {
                  experienceFill = $scope.stockexperience_answer[experience[i].value];
                  break;
              }
          }
          return experienceFill;
        }
        $scope.getBondExperience = function() {
          var experienceFill = 0;
          var theForm = document.forms["form"];
          var experience = theForm.elements["bondexperienceselected"];
          for(var i = 0; i < experience.length; i++)
          {
              if(experience[i].checked)
              {
                  experienceFill = $scope.bondexperience_answer[experience[i].value];
                  break;
              }
          }
          return experienceFill;
        }


        $scope.calculateTotal = function() {
          $scope.disabled = true;
            var riskLevel = ((($scope.getAge() + $scope.getObjective() + $scope.getIncome() + $scope.getTimeFrame() + $scope.getLiquidity() + $scope.getExperience() + $scope.getStockExperience() + $scope.getBondExperience()) / 8) * 10) * $scope.data.repeatSelect;
            var user = $localStorage.currentUser;
            user.suitabilityScore = riskLevel;
            user.badMatches = [];
            user.badMatchRatios = [];
            user.okayMatches = [];
            user.okayMatchRatios = [];
            user.goodMatches = [];
            user.goodMatchRatios = [];
            user.bestMatches = [];
            user.bestMatchRatios = [];
            user.questionaire = true;
            $localStorage.currentUser = user;
            $scope.successMessage = "Score Saved!"
            mainService.updateUser(user).then(function(response) {
              $scope.disabled = false;
              $state.go('portfolio');
            })
        }
    })
