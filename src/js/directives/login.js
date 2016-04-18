angular.module('SashasApp')
.directive('login', function() {

	return {
		restrict: 'E',
		templateUrl: 'login.html',
		controller: 'loginController'
	}

});