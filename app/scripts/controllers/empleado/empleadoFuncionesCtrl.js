(function(){
	'use strict';
	angular.module('cine')
	.controller('empleadoFuncionesCtrl', ['$rootScope','$scope','Datos','$sce','Funciones','$timeout','$location',function($rootScope,$scope,Datos,$sce,Funciones,$timeout,$location){
								       
   Datos.limpiar();

	 Funciones.listado()
     .then(function(datos){
     	console.log(datos);
        $scope.funciones = datos;
     })
     .catch(function(e){
       console.log(e);
     })

    
   	 $scope.borrar = function borrar(item) {
       Funciones.borrar(item)
       .then(function(datos){
        console.log(item);
        var pos = $scope.funciones.indexOf(item);
        $scope.funciones.splice(pos, 1);
       })
       .catch(function(e){
         console.log(e);
       });
    }

    /*$scope.modificar = function modificar(item) {
      console.log(item);
     Datos.cargar(item);
     $location.path('adminSlideForm');
    }	*/ 

     $scope.alta = function alta() {      
     Datos.cargar(null);
     $location.path('empleadoFuncionesForm');
    }	
   	       		         	         
    }])
})();