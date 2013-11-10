'use strict';

angular.module('faeriaDeckbuilderApp')
	.controller('ExportModalCtrl', function($scope, $modalInstance, exportData) {
		$scope.exportData = exportData;
		$scope.ok = function() {
			$modalInstance.close();
		};
	});