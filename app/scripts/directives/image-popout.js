'use strict';

angular.module('faeriaDeckbuilderApp')
	.directive('imagePopup', function() {
		return {
			link: function(scope, element, attrs) {
				var $ = window.$;
				var FAERIACARDS = window.FAERIACARDS;

				scope.$watch(attrs.imagePopup, function(card) {
					if (card && card.type) {

						//todo colors, land costs, and images

						$(element).mouseenter(function() {
							$('.image-popup-container').show();
							FAERIACARDS.setContainer('.image-popup-container');
							FAERIACARDS.render({
								name: card.name,
								img: 'img/tstimg.jpg', //String
								gold: card.gold, //Number
								faeria: card.faeria, //Number
								rarity: card.rarity, // 'C','U','E','R','L'
								attack: card.power, // Number
								life: card.life, // Number
								type: card.type, //'Creature', Structure', 'Event'
								effect: card.ability, //String  non-value keywords can be typed.  keywords with values have to be in the form: [Keyword#]
								/*
				            Ranged attack. [Strikeback3]. Conquest. Flying. [Charge3]. Haste. Haunt. [Protection3]. [Accumulator4]. Jump. Frenzy. Curse. [Radiate4]. Aquatic. Auto-collect. Convoke.
				            */
								color: 'green', //'blue', 'green', 'red', 'yellow', 'human'
								landB: 0, //number
								landG: 0, //number
								landR: 0, //number
								landY: 2 //number
							});
						}).mouseleave(function() {
							$('.image-popup-container').hide();
						});
					}
				});
			}
		};
	});