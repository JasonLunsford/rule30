'use strict';

angular.module('rule30.directives', []).
	directive('renderMe', [function() {
		return {
			restrict:'AE',
			scope:false,
			link: function(element, scope, attrs) {

		    }
		}
	}]);