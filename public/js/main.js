'use strict';

// Declare app level module which depends on filters, and services

angular.module('rule30', [
	'ui.router',
	'rule30.controllers',
	'rule30.directives',
]).

config(function ($locationProvider) {

  $locationProvider.html5Mode(true);

});
