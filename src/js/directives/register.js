angular.module('SashasApp')
.directive('register', function() {

	return {
		restrict: 'E',
		templateUrl: 'register.html',
		controller: 'registerController'
	}

});
