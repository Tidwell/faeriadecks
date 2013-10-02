'use strict';

angular.module('faeriaDeckbuilderApp')
	.controller('MainCtrl', function($scope, $location, cards, skipReload) {
		$scope.allCards = cards.get();

		$scope.searchText = '';
		$scope.showBlue = true;
		$scope.showGreen = true;
		$scope.showRed = true;
		$scope.showYellow = true;
		$scope.showHuman = true;

		$scope.error = null;

		$scope.deck = {};

		$scope.addToDeck = function(card) {
			$scope.error = null;
			if ($scope.deck[card.name]) {
				if ($scope.deck[card.name].quantity < 3) {
					$scope.deck[card.name].quantity++
				} else {
					$scope.error = 'limit3';
				}
			} else {
				$scope.deck[card.name] = card;
				$scope.deck[card.name].quantity = 1;
			}
			save();
		};

		$scope.removeFromDeck = function(card) {
			$scope.error = null;
			$scope.deck[card.name].quantity--;
			if (!$scope.deck[card.name].quantity) {
				delete $scope.deck[card.name];
			}
			save();
		};

		$scope.clearDeck = function() {
			$scope.deck = {};
			save();
		};

		$scope.countDeck = function() {
			var total = 0;
			for (var card in $scope.deck) {
				total += $scope.deck[card].quantity;
			}
			return total;
		};

		$scope.search = function(item) {
			if (item.landColor === 'blue' && !$scope.showBlue) { return false; }
			if (item.landColor === 'green' && !$scope.showGreen) { return false; }
			if (item.landColor === 'red' && !$scope.showRed) { return false; }
			if (item.landColor === 'yellow' && !$scope.showYellow) { return false; }
			if (item.landColor === 'human' && !$scope.showHuman) { return false; }

			if (item.name.toLowerCase().indexOf($scope.searchText.toLowerCase()) !== -1) {
				return true;
			}
			return false;
		}

		function save() {
			skipReload();
			$location.hash(btoa(serialize($scope.deck)));
		}

		function serialize() {
			var str = '';
			for (var card in $scope.deck) {
				if (str.length) { str += '-'; }
				str += $scope.deck[card].id + ($scope.deck[card].quantity > 1 ? '_'+$scope.deck[card].quantity : '');
			}
			return str;
		}

		function unserialize(encoded) {
			encoded = encoded.split('-');
			if (typeof encoded !== 'object') { encoded = [encoded]; }
			encoded.forEach(function(str){
				str = str.split('_');
				if (str.length > 1) {
					var id = Number(str[0]);
					var quantity = Number(str[1]);
				} else {
					var id = Number(str[0]);
					var quantity = 1;
				}

				$scope.allCards.cards.forEach(function(card){
					if (card.id === id) {
						var i = 0;
						while (i<quantity) {
							$scope.addToDeck(card);
							i++;
						}
					}
				});
			});
		}

		//when we get cards we parse the url
		$scope.$watch('allCards.cards', function() {
			if (!$scope.allCards.cards.length) { return; }
			var deck = $location.hash();
			if (deck) {
				unserialize(atob(deck));
			}
		});

	});