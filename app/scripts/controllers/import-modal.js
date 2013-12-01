'use strict';

angular.module('faeriaDeckbuilderApp')
	.controller('ImportModalCtrl', function($scope, $modalInstance) {
		$scope.importDeck = '';
		$scope.inGameImportDeck = '';
		$scope.importType = 'ingame';

		$scope.ok = function(importDeck, inGameImportDeck, importType) {
			if (importType === 'ingame') {
				$modalInstance.close({data: inGameImportDeck, type: importType});
			} else {
				$modalInstance.close({data: importDeck, type: importType});
			}
		};
		$scope.cancel = function() {
			$modalInstance.close();
		};
	});