(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('olvidoContraseniaCtrl', ['$scope','$location','Mail','Usuarios','$rootScope',
        function ($scope,$location,Mail,Usuarios,$rootScope) {
         $scope.mensaje = false;
         $scope.mensajeOk = false;
         $scope.registroForm = {         	
         	email: null,          
         };
         
		$scope.enviar = function(){
		Usuarios.usuarioPorEmail($scope.registroForm.email)
		.then(function(datos){
		    console.log(datos);

		    if(datos.length != 0){		    	
				Mail.enviarContrasenia(datos[0])
				.then(function(datos){
				      console.log(datos);
				      $scope.mensajeOk = true;
				      $scope.mensaje = false;
				})
				.catch(function(e){
				      console.log(e);
				}); 
			}else{
         		$scope.mensaje = true;
	            $scope.mensajeOk = false;
			}
		})
		.catch(function(e){
		      console.log(e);
		}); 
		}		
				           		
     }]);
})();

