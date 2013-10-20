'use strict';

angular.module('faeriaDeckbuilderApp')
	.directive('faeriaImg', function() {
		var $ = window.$;
		var FAERIACARDS = window.FAERIACARDS;

		//card images are 4-digit with 0 padding
		function padZero(id) {
			if (id.length < 4) {
				while(id.length < 4) { id = '0'+id; }
			}
			return id;
		}
		FAERIACARDS.setContainer('.cardlist-render-container');
		return {
			link: function(scope, element, attrs) {
				scope.$watch(attrs.faeriaImg, function(card) {
					if (card && card.type) {
						var landOpts = {
							landB: 0,
							landG: 0,
							landR: 0,
							landY: 0
						};

						landOpts['land'+card.landColor[0].toUpperCase()] = card.landCost;
						FAERIACARDS.queue({
							card: {
								name: card.name,
								img: 'img/cards/'+padZero(card.gameId)+'.jpg', //String
								gold: Number(card.gold), //Number
								faeria: Number(card.faeria), //Number
								rarity: card.rarity, // 'C','U','E','R','L'
								attack: card.power ? Number(card.power) : '', // Number
								life: Number(card.life), // Number
								type: card.type[0].toUpperCase()+card.type.substring(1), //'Creature', Structure', 'Event'
								effect: card.ability, //String  non-value keywords can be typed.  keywords with values have to be in the form: [Keyword#]
								/*
				            Ranged attack. [Strikeback3]. Conquest. Flying. [Charge3]. Haste. Haunt. [Protection3]. [Accumulator4]. Jump. Frenzy. Curse. [Radiate4]. Aquatic. Auto-collect. Convoke.
				            */
								color: card.landColor, //'blue', 'green', 'red', 'yellow', 'human'
								landB: landOpts.landB, //number
								landG: landOpts.landG, //number
								landR: landOpts.landR, //number
								landY: landOpts.landY //number
							},
							callback: function(data) {
								if (data) {
									$(element).attr('src', data);
								}
							}
						});
					}
				});
			}
		};
	});
