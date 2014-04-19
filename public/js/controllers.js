'use strict';

angular.module('rule30.controllers', []).
	controller('PuzzleController', ['$scope', function ($scope) {

		var iterations = 15;
		var collection = [ { "column":15, "color":"black" } ];
		var priorCollection = [];
		var priorCollectionLength;
		var currentRow;

		var currentSquare = {};
		var squareOffset = 0;
		var advanceMe = 0;

		// logic to color in box @ row 0, column 15 goes here
		console.log(collection)

		for ( var n=1; n < iterations ; n++ ) {
		   currentRow = iterations - n;

		   while (priorCollection.length > 0) {
		      priorCollection.shift();
		   }

		   priorCollection = JSON.parse(JSON.stringify(collection));
		   priorCollectionLength = priorCollection.length;

		   while (collection.length > 0) {
		      collection.shift();
		   }

		   for ( var b=0; b < (priorCollectionLength+2); b++ ) {
		       currentSquare.left = currentRow + b - 1;
		       currentSquare.center = currentRow + b;
		       currentSquare.right = currentRow + b + 1;

		       // determine pattern above square
		       if ( currentSquare.left < priorCollection[0].column ) {
		           currentSquare.leftColor = "white";
		       } else {
		           currentSquare.leftColor = priorCollection[b-2].color;
		       }

		       if ( currentSquare.center < priorCollection[0].column || currentSquare.center > priorCollection[priorCollectionLength-1].column ) {
		           currentSquare.centerColor = "white";
		       } else {
		           currentSquare.centerColor = priorCollection[b-1].color;
		       }

		       if ( currentSquare.right > priorCollection[priorCollectionLength-1].column ) {
		           currentSquare.centerColor = "white";
		       } else {
		           currentSquare.centerColor = priorCollection[b].color;
		       }

		       // determine color square is assigned, based on pattern
			   currentSquare.color = "white"

		       if ( currentSquare.leftColor == "black" &&
		       	    currentSquare.centerColor == "white" &&
		       	    currentSquare.rightColor == "white" ) { currentSquare.color = "black" }
		       else if ( currentSquare.leftColor == "white" &&
		       	    	 currentSquare.centerColor == "black" &&
		       	    	 currentSquare.rightColor == "black" ) { currentSquare.color = "black" }
		       else if ( currentSquare.leftColor == "white" &&
		       	    	 currentSquare.centerColor == "black" &&
		       	    	 currentSquare.rightColor == "white" ) { currentSquare.color = "black" }
		       else if ( currentSquare.leftColor == "white" &&
		       	    	 currentSquare.centerColor == "white" &&
		       	    	 currentSquare.rightColor == "black" ) { currentSquare.color = "black" }

		       // determine square position
		   	   currentSquare.position = iterations + squareOffset + advanceMe;

		       collection[b] = {"column":currentSquare.position, "color":currentSquare.color}
		       advanceMe = advanceMe + 1;
		   }
		   advanceMe = 0;
		   squareOffset = squareOffset - 1;
		   console.log(collection);
		}

		
	}]);