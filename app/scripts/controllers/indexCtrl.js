(function(){
	'use strict';
	angular.module('cine')
	.controller('indexCtrl', ['$rootScope', '$scope','AuthenticationService', function($rootScope,$scope,AuthenticationService){
		
		$scope.nombreUser = null;
		$rootScope.$on('myOwnEvent', function(newData,data) {
    		console.log(data);
    		$scope.nombreUser = data;
		});
		
		$scope.logout = function logout() {
			AuthenticationService.ClearCredentials();
			console.log($rootScope);			
			$scope.nombreUser = null;
		}  

	}]);
}) ();