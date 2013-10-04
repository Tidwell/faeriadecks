'use strict';

angular.module('faeriaDeckbuilderApp', ['ui.bootstrap'])
	.config(function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider
			.when('/deckbuilder', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/deckbuilder'
			});
	});