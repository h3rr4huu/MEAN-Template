angular.module('TemplateApp', ['ngRoute', 'appRoutes',

  // Controllers
  'MainCtrl',
  'HomeCtrl',

  // Services
  'MainService',

]);

angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {

		$routeProvider

			.when('/', {
				templateUrl: 'views/home.html',
				controller: 'HomeController'
			});

		$locationProvider.html5Mode(true);

	}
]);
angular.module('HomeCtrl', []).controller('HomeController', ['$scope', function($scope) {

}]);
angular.module('MainCtrl', []).controller('MainController', ['$scope', function($scope) {

}]);
angular.module('MainService', []).factory('Main', ['$http',
	function($http) {

	}
]);