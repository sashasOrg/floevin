angular.module('SashasApp')
.directive('login', function() {

	return {
		restrict: 'E',
		templateUrl: '../views/login.html',
		controller: 'loginController'
	}

});