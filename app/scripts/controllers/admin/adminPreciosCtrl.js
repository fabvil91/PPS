(function(){
	'use strict';
	angular.module('cine')
	.controller('adminPreciosCtrl', ['$rootScope','$scope','Datos','$sce','Precios','$timeout','$location',function($rootScope,$scope,Datos,$sce,Precios,$timeout,$location){
								       
     Datos.limpiar();

	   Precios.listado()
     .then(function(datos){
     	console.log(datos);
        $scope.precios = datos;
     })
     .catch(function(e){
       console.log(e);
     })

    
   	 $scope.borrar = function borrar(item) {

     Precios.borrar(item)
     .then(function(datos){
      console.log(item);
      var pos = $scope.precios.indexOf(item);
      $scope.precios.splice(pos, 1);
     })
     .catch(function(e){
       console.log(e);
     });
    }

    $scope.modificar = function modificar(item) {
      console.log(item);
     Datos.cargar(item);
     $location.path('adminPreciosForm');
    }	 

     $scope.alta = function alta() {      
     Datos.cargar(null);
     $location.path('adminPreciosForm');
    }	
   	       		         	         
    }])
})();