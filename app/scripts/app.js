'use strict';

angular.module('faeriaDeckbuilderApp', ['ui.bootstrap'])
	.config(function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider
			.when('/deckbuilder', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.when('/designer', {
			  templateUrl: 'views/designer.html',
			  controller: 'DesignerCtrl'
			})
			.when('/changelog', {
			  templateUrl: 'views/changelog.html',
			  controller: 'ChangelogCtrl'
			})
			.when('/cardlist', {
			  templateUrl: 'views/cardlist.html',
			  controller: 'CardlistCtrl'
			})
			.otherwise({
				redirectTo: '/deckbuilder'
			});
	});