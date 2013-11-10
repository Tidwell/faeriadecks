'use strict';

angular.module('faeriaDeckbuilderApp')
	.controller('ImportModalCtrl', function($scope, $modalInstance) {
		$scope.importDeck = '';
		$scope.ok = function(deck) {
			$modalInstance.close(deck);
		};
		$scope.cancel = function() {
			$modalInstance.close();
		};
	});