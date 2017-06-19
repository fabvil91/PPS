(function(){
	'use strict';
	angular.module('cine')
	.controller('adminPromocionesCtrl', ['$rootScope','$scope','Datos','$sce','Promociones','$timeout','$location',function($rootScope,$scope,Datos,$sce,Promociones,$timeout,$location){
								       
     Datos.limpiar();

	   Promociones.listado()
     .then(function(datos){
     	console.log(datos);
        $scope.promociones = datos;
     })
     .catch(function(e){
       console.log(e);
     })

    
   	 $scope.borrar = function borrar(item) {

     Promociones.borrar(item)
     .then(function(datos){
      console.log(item);
      var pos = $scope.promociones.indexOf(item);
      $scope.promociones.splice(pos, 1);
     })
     .catch(function(e){
       console.log(e);
     });
    }

    $scope.modificar = function modificar(item) {
      console.log(item);
     Datos.cargar(item);
     $location.path('adminPromocionesForm');
    }	 

     $scope.alta = function alta() {      
     Datos.cargar(null);
     $location.path('adminPromocionesForm');
    }	
   	       		         	         
    }])
})();