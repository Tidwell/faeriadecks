'use strict';

angular.module('faeriaDeckbuilderApp')
	.service('cards', function($http) {
		var alert = window.alert;

		var cards = {
			cards: []
		};

		$http({
			method: 'GET',
			url: '/cards.json'
		}).
		success(function(data) {
			cards.cards = data;
			cards.cards.forEach(function(el,i){
				el.id = i;
			});
		}).
		error(function() {
			alert('Could not get card data!');
		});

		// Public API here
		return {
			get: function() {
				return cards;
			}
		};
	});