'use strict';

angular.module('faeriaDeckbuilderApp')
	.directive('imagePopup', function() {
		var $ = window.$;
		var FAERIACARDS = window.FAERIACARDS;

		//card images are 4-digit with 0 padding
		function padZero(id) {
			if (id.length < 4) {
				while(id.length < 4) { id = '0'+id; }
			}
			return id;
		}

		return {
			link: function(scope, element, attrs) {
				scope.$watch(attrs.imagePopup, function(card) {
					if (card && card.type) {
						var imgData;
						var thisPopup = Math.floor(Math.random()*999999);

						var landOpts = {
							landB: 0,
							landG: 0,
							landR: 0,
							landY: 0
						};

						landOpts['land'+card.landColor[0].toUpperCase()] = card.landCost;

						$(element).popover({
							html: true,
							content: '<img id="current-popover'+thisPopup+'" />as',
							trigger: 'hover',
							placement: attrs.imagePopupPositon ? attrs.imagePopupPositon : 'right',
							container: '.image-popup-container'
						});
						$(element).on('shown.bs.popover', function() {
							if (!imgData) {
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
									container: '.render-container',
									callback: function(data) {
										imgData = data;
										$('#current-popover'+thisPopup).attr('src', imgData);
									}
								});
								return;
							}
							$('#current-popover'+thisPopup).attr('src', imgData);
						});
					}
				});
			}
		};
	});