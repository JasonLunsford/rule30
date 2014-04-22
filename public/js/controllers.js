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

		// ---------- UI Related Functions (Buttons) ----------

		// loop stop
		$scope.runLoop = false;

		// Button Text
		$scope.buttonText = "Begin!";

		// Build button
		$scope.buildMyPuzzle = function() {
			if ( $scope.runLoop ) {
				buildRow(seedRow);
			} else {
				// clean up board first
				$scope.runLoop = true;
				buildRow(seedRow);
			}
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
			$scope.rowToRender = newRow;

			newRow.unshift("white");
			newRow.unshift("white");
			newRow.push("white");
			newRow.push("white");

			// stop recursion by row 15, or when user clicks Stop
			rows = rows + 1;
			if (rows < 16 && $scope.runLoop ) { buildRow(newRow); }
			else {
				$scope.buttonText = "Again?";
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
			console.log(resultRow);
			return resultRow;
		};

	}]);