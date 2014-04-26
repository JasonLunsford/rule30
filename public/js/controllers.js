'use strict';

angular.module('rule30.controllers', []).
	controller('PuzzleController', ['$scope', function ($scope) {

		// ---------- Variables Powering Recursion ----------

		// initialize loop
		var rows = 0;

		// seed loop sets us up the first iteration using just one black square
		var seedRow = ["white","white","black","white","white"];
		var newRow = [];

		// temp variables used in processRow
		var testLeftSquare;
		var testCenterSquare;
		var testRightSquare;
		var finalSquareColor;

		// ---------- UI Related Functions & Containers ----------

		var puzzleBox = document.querySelector('#puzzleBox');
		var theRow;
		var theSquare;
		var targetSquare;

		// contain completed puzzle
		$scope.readyToRender = [];

		// run again flag
		$scope.runAgain = false;

		// Button Text
		$scope.buttonText = "Begin!";

		// Build button
		$scope.buildMyPuzzle = function() {
			buildRow(seedRow);
		}

		$scope.renderMyPuzzle = function() {
			var puzzleLayers = $scope.readyToRender.length;
			var offSetter = 1;

			for ( var k = 0; k < puzzleLayers; k++ ) {
				$scope.readyToRender[k].shift();
				$scope.readyToRender[k].shift();
				$scope.readyToRender[k].pop();
				$scope.readyToRender[k].pop();

				var firstSquare = 15 - offSetter;
				for ( var i = 0; i < (2*offSetter + 1); i++ ) {
					if ( firstSquare >= 0 && k < (puzzleLayers - 1)) {
						theRow = "#r"+k;
						theSquare = "#c"+firstSquare;

						targetSquare = angular.element(puzzleBox.querySelector(theRow).querySelector(theSquare));

						if ( $scope.readyToRender[k][i] === "black" ) { targetSquare.addClass("black"); }
					}

					firstSquare = firstSquare + 1;
				}
				offSetter++;
			}
			$scope.buttonText = "Again?";
			$scope.runAgain = true;
		}

		// ---------- Page Load Grid Assembly ----------

		/* AngularJS does not afford a easy way to iterate over simple integers using ng-repeat, so we'll just use a pseudo-collection
		   with a value passed in that represents the total number of rows we want - in this case 15 additional. */
	    $scope.numberOfRows = function(row) {
	        return new Array(row);
	    };

	    $scope.numberOfCells = function(cells) {
	    	return new Array(cells);
	    }

		// ---------- Recursion Warp Engine ----------

		// Adds ghost squares to both ends of any given array to afford correct calculation
		function buildRow(priorRow) {
			newRow = processRow(priorRow);

			newRow.unshift("white");
			newRow.unshift("white");
			newRow.push("white");
			newRow.push("white");

			rows = rows + 1;
			if (rows < 16 ) { buildRow(newRow); }
			else {
				$scope.renderMyPuzzle();
				return;
			}
		}

		function processRow(currentRow) {
		    var resultRow = [];

		    // stop loop two squares before the end to ensure right square does not get assigned w undefined
			for ( var n = 0; n < currentRow.length-2; n++ ) {
				testLeftSquare = currentRow[n];
				testCenterSquare = currentRow[n+1];
				testRightSquare = currentRow[n+2];

				finalSquareColor = "black";
				if ( testLeftSquare === "black" &&
					 testCenterSquare === "black" &&
					 testRightSquare === "black" ) { finalSquareColor = "white"; }

				if ( testLeftSquare === "black" &&
					 testCenterSquare === "black" &&
					 testRightSquare === "white" ) { finalSquareColor = "white"; }

				if ( testLeftSquare === "black" &&
					 testCenterSquare === "white" &&
					 testRightSquare === "black" ) { finalSquareColor = "white"; }

				if ( testLeftSquare === "white" &&
					 testCenterSquare === "white" &&
					 testRightSquare === "white" ) { finalSquareColor = "white"; }

				resultRow.push(finalSquareColor);
			}

			$scope.readyToRender.push(resultRow);
			return resultRow;
		};

	}]);