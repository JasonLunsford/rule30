'use strict';

// Declare app level module which depends on filters, and services

angular.module('rule30', [
	'ui.router',
  'ui.bootstrap',
  'ngSanitize',
	'rule30.controllers',
	'rule30.directives',
]).

config(function ($urlRouterProvider, $locationProvider, $stateProvider) {

    // let's normalize the capitalization if the user went all cap/some cap on us
  $urlRouterProvider
    .rule(function ($injector, $location) {
      var path = $location.path();
      var normalized = path.toLowerCase();

      if (path != normalized) {
        $location.replace().path(normalized);
      }
    })
    .otherwise("/404");

  $stateProvider
    .state('default', {
        url: '/',
        views: {
          'renderedPuzzleView':{
            templateUrl: 'partials/renderedPuzzleView.html',
            controller: 'PuzzleController'
          }
        }
    });

  $locationProvider.html5Mode(true);

});
