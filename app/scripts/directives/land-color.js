'use strict';

angular.module('faeriaDeckbuilderApp')
	.directive('landColor', function() {
	var $ = window.$;
	return {
		link: function(scope, element, attrs) {
			scope.$watch(attrs.landColor, function(color) {
				if (color) {
					$(element).addClass('land-' + color.toLowerCase());
				}
			});
		}
	};
});