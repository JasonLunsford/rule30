'use strict';

angular.module('rule30.directives', []).
	directive('renderMe', [function() {
		return {
			link: function(scope, element, attrs) {
				var testSquare = angular.element(document.querySelector('.row0 .renderedRow .cell15 div'));

				element.bind('click', function() {
					testSquare.addClass('black');
					console.log(testSquare);			
				});

		    }
		}
	}]).
	directive('buildFirstRow', [function() {
		return {
			restrict:'AE',
			templateUrl:'partials/firstRow'
		}
	}]).
	directive('buildCommonRow', [function() {
		return {
			restrict:'AE',
			templateUrl:'partials/commonRow'
		}
	}]).
	directive('addCells', [function() {
		return {
			restrict:'AE',
			template:'<div></div>'
		}
	}]);