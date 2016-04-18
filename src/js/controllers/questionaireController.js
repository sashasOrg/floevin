angular.module('SashasApp').controller('questionaireController', function($scope, $cookies, questionaireService ) {

         $scope.age_answer = [];
         $scope.age_answer["30"]=5;
         $scope.age_answer["3040"]=4;
         $scope.age_answer["4050"]=3;
         $scope.age_answer["5065"]=2;
         $scope.age_answer["65"]=1;

         $scope.objective_answer = [];
         $scope.objective_answer["Spec"]=2;
         $scope.objective_answer["Growth"]=1;
         $scope.objective_answer["Income"]=-1;
         $scope.objective_answer["Tax"]=-3;
         $scope.objective_answer["Safety"]=-4;

         $scope.income_answer = [];
         $scope.income_answer["I50"]=-4;
         $scope.income_answer["I50100"]=2;
         $scope.income_answer["I100250"]=0;
         $scope.income_answer["I250500"]=3;
         $scope.income_answer["I500"]=4;

        $scope.timeFrame_answer = [];
         $scope.timeFrame_answer["6mo1yr"]=-4;
         $scope.timeFrame_answer["1to3yr"]=-3;
         $scope.timeFrame_answer["3to5yr"]=3;
         $scope.timeFrame_answer["5to7yr"]=4;
         $scope.timeFrame_answer["7+"]=5;

        (function(angular) {
            $scope.data = {
             repeatSelect: null,
             availableOptions: [
               {id: '...', name: ''},
               {id: 'Risk potential: 1', name: 'None'},
               {id: 'Risk potential: 2', name: 'Limited'},
               {id: 'Risk potential: 3', name: 'Average'},
               {id: 'Risk potential: 4', name: 'Acceptable'},
               {id: 'Risk potential: 5', name: 'Extensive'}
             ],
            };
         })(window.angular);

        $scope.getAge = function()
        {
            var ageFill=0;
            var theForm = document.forms["form"];
            var ageselected = theForm.elements["ageselected"];
            for(var i = 0; i < ageselected.length; i++)
            {
                if(ageselected[i].checked)
                {
                    ageFill = $scope.age_answer[ageselected[i].value];
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
          for(var i = 0; i < ageselected.length; i++)
          {
              if(timeframeselected[i].checked)
              {
                  timeframeFill = $scope.timeframe_answer[timeframeselected[i].value];
                  break;
              }
          }
          return timeframeFill;
        }

        $scope.calculateTotal = function()
        {
            var riskLevel = $scope.getAge() + $scope.getObjective() + $scope.getIncome() + $scope.getTimeFrame();
            if(riskLevel < 1){
                return riskLevel = 1;
            }
            else if(riskLevel > 5){
                return riskLevel = 5;
            }

            var divobj = document.getElementById('totalRisk');
            divobj.style.display='block';
            divobj.innerHTML = 'We recommend taking level: '+riskLevel+' risk';
        }

        $scope.hideTotal = function()
        {
            var divobj = document.getElementById('totalRisk');
            divobj.style.display='none';
        }

})
