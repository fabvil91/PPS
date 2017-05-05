(function(){
	'use strict';
	angular.module('cine')
	.controller('indexCtrl', ['$rootScope', '$scope', function($rootScope,$scope){
		$rootScope.globals = {};

		$scope.peliculaList = [];
		console.log($rootScope);
		$scope.logueado = $rootScope.globals.currentUser != null;
		$scope.userName = {};
		console.log($scope.logueado);

		if($scope.logueado){
			userName = $rootScope.globals.currentUser.username;
			console.log(userName);
		}
		console.log($scope.logueado);		
	}]);
}) ();