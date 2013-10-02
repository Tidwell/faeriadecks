'use strict';
//https://github.com/angular/angular.js/issues/1699#issuecomment-22509845
angular.module('faeriaDeckbuilderApp')
	.factory('skipReload', [
		'$route',
		'$rootScope',
		function($route, $rootScope) {
			return function() {
				var lastRoute = $route.current;
				var un = $rootScope.$on('$locationChangeSuccess', function() {
					$route.current = lastRoute;
					un();
				});
			};
		}
	]);