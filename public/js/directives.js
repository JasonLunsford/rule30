'use strict';

angular.module('rule30.directives', []).
	directive('renderMe', [function() {
		return function(scope, element, attrs) {

				element.bind('click', function() {


				});

		}
	}]).
	directive('buildFirstRow', [function() {
		return {
			restrict:'AE',
			replace:true,
			templateUrl:'partials/firstRow'
		}
	}]).
	directive('buildCommonRow', [function() {
		return {
			restrict:'AE',
			replace:true,
			templateUrl:'partials/commonRow'
		}
	}]).
	directive('addCells', [function() {
		return {
			restrict:'AE',
			replace:true,
			template:'<div id="c{{$index}}"></div>'
		}
	}]);