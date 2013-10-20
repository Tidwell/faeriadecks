'use strict';

angular.module('faeriaDeckbuilderApp')
	.service('cards', function($http) {
		var alert = window.alert;

		var cards = {
			cards: []
		};

		var currentVersion;

		function makeRequest(version) {
			currentVersion = version;
			var url = '/cards.json';
			if (version) {
				url = '/old-data/cards.'+version+'.json';
			}
			$http({
				method: 'GET',
				url: url
			}).
			success(function(data) {
				cards.cards = data;
				cards.cards.forEach(function(el,i){
					if (el.gameId) {
						el.id = Number(el.gameId);
					} else {
						el.id = i;
					}
				});
			}).
			error(function() {
				alert('Could not get card data!');
			});
		}

		// Public API here
		return {
			get: function(version) {
				if (currentVersion === version && cards.cards.length) {
					return cards;
				}
				makeRequest(version);
				return cards;
			}
		};
	});