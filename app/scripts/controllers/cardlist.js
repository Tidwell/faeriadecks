'use strict';

angular.module('faeriaDeckbuilderApp')
	.controller('CardlistCtrl', function($scope, cards) {
		var FAERIACARDS = window.FAERIACARDS;
		FAERIACARDS.clearQueue();
		$scope.allCards = cards.get();
		$scope.currentWidth = 125;
	});