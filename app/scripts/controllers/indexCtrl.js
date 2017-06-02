(function(){
	'use strict';
	angular.module('cine')
	.controller('indexCtrl', ['$rootScope', '$scope','AuthenticationService','$location', function($rootScope,$scope,AuthenticationService,$location){
		
		$scope.nombreUser = null;
		$rootScope.$on('myOwnEvent', function(newData,data) {
    		console.log(data);
    		$scope.nombreUser = data;
		});
		
		$scope.logout = function logout() {
			AuthenticationService.ClearCredentials();
			console.log($rootScope);

			$scope.nombreUser = null;

			$location.path('/main'); 
		}

		$scope.main = function(){
			if($rootScope.globals.currentUser.tipoUsuario == 'Usuario'){
			   $location.path('/main'); 						
 			}   
 					//Agregar los demas tipos de usuario 
 					/*if($rootScope.globals.currentUser.tipoUsuario == 'Admin'){
						$location.path('/mainAdmin'); 						
 					}

 					if($rootScope.globals.currentUser.tipoUsuario == 'Empleado'){
						$location.path('/mainEmpleado'); 						
 					} */

 			if($rootScope.globals.currentUser.tipoUsuario == 'Cajero'){
				$location.path('/cajeroMain'); 						
 			}    
		}
		  
	}]);
}) ();