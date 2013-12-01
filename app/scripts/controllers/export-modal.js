'use strict';

angular.module('faeriaDeckbuilderApp')
	.controller('ExportModalCtrl', function($scope, $modalInstance, exportData, inGameExportData) {
		$scope.exportData = exportData;
		$scope.inGameExportData = inGameExportData;
		$scope.exportType = 'ingame';
		$scope.ok = function() {
			$modalInstance.close();
		};
	});