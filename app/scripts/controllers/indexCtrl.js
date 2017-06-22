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

		$scope.cuenta = function(){
			console.log($rootScope.globals.currentUser);
			if($rootScope.globals.currentUser && $rootScope.globals.currentUser.tipoUsuario == 'Usuario'){
			   $location.path('/usuarioMain'); 				 			
 			}else    					
 			if($rootScope.globals.currentUser && $rootScope.globals.currentUser.tipoUsuario == 'Admin'){
			//	$location.path('/adminMain'); 						
 			}else
 			if($rootScope.globals.currentUser && $rootScope.globals.currentUser.tipoUsuario == 'Empleado'){
			//	$location.path('/empleadoMain'); 						
 			}else 
 			if($rootScope.globals.currentUser && $rootScope.globals.currentUser.tipoUsuario == 'Cajero'){ 				
				$location.path('/cajeroCuenta');										
 			}else{  			
           		$location.path('/main');          
            }    
		}
		  
	}]);
}) ();