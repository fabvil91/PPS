(function(){
	'use strict';
	angular.module('cine')
	.controller('indexCtrl', ['$rootScope', '$scope','AuthenticationService','$location', function($rootScope,$scope,AuthenticationService,$location){
		
		$scope.nombreUser = null;
		$scope.tipoUser = null;

		$rootScope.$on('myOwnEvent', function(newData,data) {
    		console.log(data);
    		
    		$scope.nombreUser = data;
    		$scope.tipoUser = $rootScope.globals.currentUser.tipoUsuario;
		});

		$rootScope.$on('desloguear', function(newData,data) {
    		console.log(data);

    		AuthenticationService.ClearCredentials();
			console.log($rootScope);

			$scope.nombreUser = null;
			$scope.tipoUser = null;
		});
		
		$scope.logout = function logout() {
			AuthenticationService.ClearCredentials();
			console.log($rootScope);

			$scope.nombreUser = null;
			$scope.tipoUser = null;

			$location.path('/main'); 
		}

		$scope.main = function(){
			if($rootScope.globals.currentUser && $rootScope.globals.currentUser.tipoUsuario == 'Usuario'){
			   $location.path('/main'); 						
 			}else    					
 			if($rootScope.globals.currentUser && $rootScope.globals.currentUser.tipoUsuario == 'Admin'){
				$location.path('/adminMain'); 						
 			}else
 			if($rootScope.globals.currentUser && $rootScope.globals.currentUser.tipoUsuario == 'Empleado'){
				$location.path('/empleadoMain'); 						
 			}else 
 			if($rootScope.globals.currentUser && $rootScope.globals.currentUser.tipoUsuario == 'Cajero'){
				$location.path('/cajeroMain'); 				
 			}else{  			
           		$location.path('/main');          
            }    
		}
				  
	}]);
}) ();