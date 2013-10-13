'use strict';

angular.module('faeriaDeckbuilderApp')
	.controller('MainCtrl', function($scope, $location, cards, skipReload, $http) {
		var VERSION = 2.0;

		$scope.VERSION = 2.0;
		$scope.currentVersion = VERSION;

		var alert = window.alert;
		$scope.allCards = cards.get();

		$scope.searchText = '';
		$scope.showBlue = true;
		$scope.showGreen = true;
		$scope.showRed = true;
		$scope.showYellow = true;
		$scope.showHuman = true;

		$scope.showCreature = true;
		$scope.showStructure = true;
		$scope.showEvent = true;
		$scope.showFate = true;

		$scope.showCommon = true;
		$scope.showUncommon = true;
		$scope.showEpic = true;
		$scope.showRare = true;
		$scope.showLegendary = true;

		$scope.isShared = false;

		$scope.error = null;

		$scope.deck = {};

		$scope.filterColumn = 'name';

		$scope.$watch('currentVersion', function() {
			if ($scope.currentVersion !== VERSION) {
				cards.get($scope.currentVersion);
			}
		});
		$scope.share = function() {
			save();
			var deckInfo = $location.hash();
			$http({
				method: 'GET',
				url: '/share?deckInfo='+deckInfo
			}).
			success(function(data) {
				skipReload();
				$scope.isShared = true;
				$scope.sharedUrl = 'faeriadecks.com/deckbuilder#'+data.hash;
				$location.hash(data.hash);
				$scope.showUrl = true;
			}).
			error(function() {
				alert('error saving');
			});
		};

		$scope.addToDeck = function(card, noSave) {
			$scope.isShared = false;
			$scope.error = null;
			if ($scope.deck[card.name]) {
				if ($scope.deck[card.name].quantity < 3) {
					$scope.deck[card.name].quantity++;
				} else {
					$scope.error = 'limit3';
				}
			} else {
				$scope.deck[card.name] = card;
				$scope.deck[card.name].quantity = 1;
			}
			if (!noSave) {
				save();
			}
		};

		$scope.removeFromDeck = function(card) {
			$scope.isShared = false;
			$scope.error = null;
			$scope.deck[card.name].quantity--;
			if (!$scope.deck[card.name].quantity) {
				delete $scope.deck[card.name];
			}
			save();
		};
		$scope.upgrade = function() {
			$scope.currentVersion = VERSION;
			save();
			$scope.clearDeck(true);
			cards.get();
		};

		$scope.clearDeck = function(noSave) {
			$scope.deck = {};
			if (!noSave) {
				save();
			}
		};

		$scope.countDeck = function() {
			var total = 0;
			for (var card in $scope.deck) {
				total += $scope.deck[card].quantity;
			}
			return total;
		};

		$scope.countType = function(type) {
			var total = 0;
			for (var card in $scope.deck) {
				if ($scope.deck[card].type === type) {
					total += $scope.deck[card].quantity;
				}
			}
			return total;
		};

		$scope.countGold = function() {
			var total = 0;
			for (var card in $scope.deck) {
				total += $scope.deck[card].gold * $scope.deck[card].quantity;
			}
			return total;
		};

		$scope.countFaeria = function() {
			var total = 0;
			for (var card in $scope.deck) {
				total += $scope.deck[card].faeria * $scope.deck[card].quantity;
			}
			return total;
		};

		$scope.countColor = function(color) {
			var total = 0;
			for (var card in $scope.deck) {
				if ($scope.deck[card].landColor === color) {
					total += $scope.deck[card].landCost * $scope.deck[card].quantity;
				}
			}
			return total;
		};

		$scope.countZeroF = function() {
			var total = 0;
			for (var card in $scope.deck) {
				if ($scope.deck[card].type === 'creature' && !Number($scope.deck[card].faeria)) {
					total += $scope.deck[card].quantity;
				}
			}
			return total;
		};
		$scope.search = function(item) {
			if (item.landColor === 'blue' && !$scope.showBlue) {
				return false;
			}
			if (item.landColor === 'green' && !$scope.showGreen) {
				return false;
			}
			if (item.landColor === 'red' && !$scope.showRed) {
				return false;
			}
			if (item.landColor === 'yellow' && !$scope.showYellow) {
				return false;
			}
			if (item.landColor === 'human' && !$scope.showHuman) {
				return false;
			}

			if (item.type === 'creature' && !$scope.showCreature) {
				return false;
			}
			if (item.type === 'structure' && !$scope.showStructure) {
				return false;
			}
			if (item.type === 'event' && !$scope.showEvent) {
				return false;
			}
			if (item.type === 'fate' && !$scope.showFate) {
				return false;
			}

			if (item.rarity === 'C' && !$scope.showCommon) {
				return false;
			}
			if (item.rarity === 'U' && !$scope.showUncommon) {
				return false;
			}
			if (item.rarity === 'E' && !$scope.showEpic) {
				return false;
			}
			if (item.rarity === 'R' && !$scope.showRare) {
				return false;
			}
			if (item.rarity === 'L' && !$scope.showLegendary) {
				return false;
			}

			if (item.name.toLowerCase().indexOf($scope.searchText.toLowerCase()) !== -1) {
				return true;
			}
			return false;
		};

		$scope.sort = {
			column: 'name',
			descending: false
		};

		$scope.selectedCls = function(column) {
			return column === $scope.sort.column && 'sort-' + $scope.sort.descending;
		};

		$scope.changeSorting = function(column) {
			var sort = $scope.sort;
			if (sort.column === column) {
				sort.descending = !sort.descending;
			} else {
				sort.column = column;
				sort.descending = false;
			}
		};

		$scope.sortDeck = {
			column: 'name',
			descending: false
		};
		$scope.selectedClsDeck = function(column) {
			return column === $scope.sortDeck.column && 'sort-' + $scope.sortDeck.descending;
		};

		$scope.changeSortingDeck = function(column) {
			var sort = $scope.sortDeck;
			if (sort.column === column) {
				sort.descending = !sort.descending;
			} else {
				sort.column = column;
				sort.descending = false;
			}
		};

		$scope.powerLifeString = function(card) {
			if (!card.power && !card.life) {
				return '';
			}

			return Number(card.power) + '/' + card.life;
		};


		function save() {
			skipReload();
			$location.hash(serialize($scope.deck));
		}

		function serialize() {
			var str = '';
			for (var card in $scope.deck) {
				if (str.length) {
					str += ':';
				}
				str += $scope.deck[card].id + ($scope.deck[card].quantity > 1 ? ',' + $scope.deck[card].quantity : '');
			}
			var serialized = ($scope.deckName ? $scope.deckName : '') + '' + '@' + str + '.'+$scope.currentVersion;
			return serialized;
		}

		function unserialize(encoded) {
			//detect version of the cardlist we are using
			if (encoded.indexOf('.') !== -1) {
				var s = encoded.split('.');
				encoded = s[0];
				$scope.currentVersion = Number(s[1]);
			} else {
				$scope.currentVersion = 1.0;
			}

			var nameSplit = encoded.split('@');
			$scope.deckName = nameSplit[0];
			var deckSplit = encoded.split('@')[1].split(':');
			if (typeof deckSplit === 'string') {
				deckSplit = [deckSplit];
			}
			$scope.clearDeck(true);
			deckSplit.forEach(function(str) {
				str = str.split(',');
				var id, quantity;

				if (str.length > 1) {
					id = Number(str[0]);
					quantity = Number(str[1]);
				} else {
					id = Number(str[0]);
					quantity = 1;
				}

				$scope.allCards.cards.forEach(function(card) {
					if (card.id === id) {
						var i = 0;
						while (i < quantity) {
							$scope.addToDeck(card, true);
							i++;
						}
					}
				});
			});
		}

		//when we get cards we parse the url
		$scope.$watch('allCards.cards', function() {
			//if we havent got a list back, ignore it
			if (!$scope.allCards.cards.length) {
				return;
			}
			var deck = $location.hash();
			if (deck.length === 5 && deck.indexOf('@') === -1) {
				$http.get('/load?shortKey='+deck).success(function(data) {
					unserialize(data.data[0].fullInfo);
					$location.hash(deck);
					$scope.isShared = true;
					$scope.sharedUrl = 'faeriadecks.com/deckbuilder#'+deck;
				});
				return;
			}
			if (deck) {
				unserialize(deck);
			}
		});

		$scope.$watch('deckName', function(newVal, oldVal) {
			if ($scope.deckName && oldVal) {
				$scope.isShared = false;
				save();
			}
		});

	});