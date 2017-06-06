(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('loginCtrl', ['$rootScope','$scope','$location', 'AuthenticationService',
        function ($rootScope,$scope,$location, AuthenticationService) {
                
         $scope.loginForm = {};
         $scope.mensaje = null;

        (function () {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();
  
        $scope.login = function login() {        
            AuthenticationService.Login($scope.loginForm.username, $scope.loginForm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.loginForm.username, $scope.loginForm.password, response.tipoUsuario, response.complejo);
					
 					console.log($rootScope);

 					$rootScope.$emit('myOwnEvent', $scope.loginForm.username);

 					if($rootScope.globals.currentUser.tipoUsuario == 'Usuario'){
						$location.path('/main'); 						
 					}   
 					//Agregar los demas tipos de usuario 
 					if($rootScope.globals.currentUser.tipoUsuario == 'Admin'){
						$location.path('/adminMain'); 						
 					}

 					if($rootScope.globals.currentUser.tipoUsuario == 'Empleado'){
						$location.path('/empleadoMain'); 						
 					} 

 					if($rootScope.globals.currentUser.tipoUsuario == 'Cajero'){
						$location.path('/cajeroMain'); 						
 					}            	

                } else {
                    console.log("error");
                    $scope.mensaje = response.message;             
                }
            });
        }; 
		 
}]);
}) ();