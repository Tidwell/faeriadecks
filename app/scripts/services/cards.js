'use strict';

angular.module('faeriaDeckbuilderApp')
	.service('cards', function($http) {
		var cards = {
			cards: []
		};

		$http({
			method: 'GET',
			url: '/cards.json'
		}).
		success(function(data, status, headers, config) {
			cards.cards = data;
			cards.cards.forEach(function(el,i){
				el.id = i;
			});
		}).
		error(function(data, status, headers, config) {
			alert('Could not get card data!');
		});

		// Public API here
		return {
			get: function() {
				return cards;
			}
		};
	});