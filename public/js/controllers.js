'use strict';

angular.module('rule30.controllers', []).
	controller('PuzzleController', ['$scope', function ($scope) {

		var rows = 0;
		var seedRow = ["white","white","black","white","white"];
		var newRow = [];


		var testLeftSquare;
		var testCenterSquare;
		var testRightSquare;
		var finalSquareColor;

		buildRow(seedRow);

		function buildRow(priorRow) {
			newRow = processRow(priorRow);

			newRow.unshift("white");
			newRow.unshift("white");
			newRow.push("white");
			newRow.push("white");

			rows = rows + 1;
			if (rows < 6 ) { buildRow(newRow); }
			else { console.log("Done!"); return; }
		}

		function processRow(currentRow) {
		    var resultRow = [];

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