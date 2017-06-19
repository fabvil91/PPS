(function(){
	'use strict';
	angular.module('cine')
	.controller('adminTarjetaCtrl', ['$rootScope','$scope','Datos','$sce','Tarjetas','$timeout','$location',function($rootScope,$scope,Datos,$sce,Tarjetas,$timeout,$location){
								       
     Datos.limpiar();

	   Tarjetas.listado()
     .then(function(datos){
     	console.log(datos);
        $scope.tarjetas = datos;
     })
     .catch(function(e){
       console.log(e);
     })

    
   	 $scope.borrar = function borrar(item) {

     Tarjetas.borrar(item)
     .then(function(datos){
      console.log(item);
      var pos = $scope.tarjetas.indexOf(item);
      $scope.tarjetas.splice(pos, 1);
     })
     .catch(function(e){
       console.log(e);
     });
    }

    $scope.modificar = function modificar(item) {
      console.log(item);
     Datos.cargar(item);
     $location.path('adminTarjetaForm');
    }	 

     $scope.alta = function alta() {      
     Datos.cargar(null);
     $location.path('adminTarjetaForm');
    }	
   	       		         	         
    }])
})();