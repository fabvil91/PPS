(function(){
	'use strict';
	angular.module('cine')
	.controller('usuarioCuentaCtrl', ['$rootScope','$scope',function($rootScope,$scope){	
	
	    $scope.username = $rootScope.globals.currentUser.username;
        $scope.password = $rootScope.globals.currentUser.password;

        $scope.datosPersonales={};
        $scope.datosPersonales.nombre = $rootScope.globals.currentUser.datosPersonales.nombre;
        $scope.datosPersonales.apellido = $rootScope.globals.currentUser.datosPersonales.apellido;
        $scope.datosPersonales.mail = $rootScope.globals.currentUser.datosPersonales.mail;
        $scope.datosPersonales.telefono = $rootScope.globals.currentUser.datosPersonales.telefono;

        $scope.readOnlyPersonales = true;
        $scope.readOnlyUsuario = true;

        //PERMITE EDITAR
        $scope.editar = function(editarEsto){
            if(editarEsto=='personales'){
                $scope.readOnlyPersonales=false;
            }
            if(editarEsto == 'usuario'){
                $scope.readOnlyUsuario=false;
            }
        }

        //HACE UPDATE EN BD
        $scope.guardar = function(seccion){
            console.log('guardar datos de ' + seccion + ' en db');
            if(seccion=='personales'){
                $scope.readOnlyPersonales=true;
            }
            if(seccion=='usuario'){
                $scope.readOnlyUsuario=true;
            }
            
        }

        //RECARGA DATOS
        $scope.cancelar = function(seccion){

            if(seccion=='personales'){
                $scope.datosPersonales.nombre = $rootScope.globals.currentUser.datosPersonales.nombre;
                $scope.datosPersonales.apellido = $rootScope.globals.currentUser.datosPersonales.apellido;
                $scope.datosPersonales.mail = $rootScope.globals.currentUser.datosPersonales.mail;
                $scope.datosPersonales.telefono = $rootScope.globals.currentUser.datosPersonales.telefono;

                $scope.readOnlyPersonales=true;
            }
            
            if(seccion=='usuario'){
                $scope.username = $rootScope.globals.currentUser.username;
                $scope.password = $rootScope.globals.currentUser.password;

                $scope.readOnlyUsuario=true;
            }
        }

		 
    }])
})();