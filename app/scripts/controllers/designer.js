'use strict';

angular.module('faeriaDeckbuilderApp')
	.controller('DesignerCtrl', function($scope) {
		var FAERIACARDS = window.FAERIACARDS;

		$scope.opts = {
			name: 'Awesome Dragon', //String
			img: 'img/dragon.png', //String
			gold: 7, //Number
			faeria: 3, //Number
			rarity: 'L', // 'C','U','E','R','L'
			attack: 2, // Number
			life: 5, // Number
			type: 'Creature', //'Creature', Structure', 'Event'
			effect: 'Haste. Flying. [Charge4]. [Accumulator2]. 1 energy - Draw 2 Cards.', //String  non-value keywords can be typed.  keywords with values have to be in the form: [Keyword#]
			color: 'green', //'blue', 'green', 'red', 'yellow', 'human'
			landB: 0, //number
			landG: 3, //number
			landR: 0, //number
			landY: 0 //number
		};
		$scope.export = function() {
			window.open(FAERIACARDS.toURL(), 'FaeriaDecks Card Render', 'height=500,width=300,location=no,menubar=no,titlebar=no', false);
		};
		$scope.$watch('opts.name + opts.gold + opts.faeria + opts.rarity + opts.attack + opts.life + opts.type + opts.effect + opts.color + opts.landB + opts.landG + opts.landR + opts.landY + opts.img', function() {
			FAERIACARDS.render($scope.opts);
		});

		FAERIACARDS.ready(function() {
			FAERIACARDS.setContainer('#designer-render');
			FAERIACARDS.render($scope.opts);
		});

		function handleImage(e) {
			var reader = new FileReader();
			reader.onload = function(event) {
				var img = new Image();
				img.onload = function() {
					$scope.opts.img = img;
					FAERIACARDS.render($scope.opts);
				};
				img.src = event.target.result;
			};
			reader.readAsDataURL(e.target.files[0]);
		}

		var imageLoader = document.getElementById('imageLoader');
		imageLoader.addEventListener('change', handleImage, false);


	});