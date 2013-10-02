'use strict';

angular.module('faeriaDeckbuilderApp')
	.filter('toArray', function() {
		return function(obj) {
			if (!(obj instanceof Object)) {
				return obj;
			}

			return Object.keys(obj).map(function(key) {
				return Object.defineProperty(obj[key], '$key', {
					value: key
				});
			});
		};
	});