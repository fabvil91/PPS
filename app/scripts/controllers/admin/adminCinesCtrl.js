(function(){
	'use strict';
	angular.module('cine')
	.controller('adminCinesCtrl', ['$rootScope','$scope','Datos','$sce','Cines','$timeout','$location',function($rootScope,$scope,Datos,$sce,Cines,$timeout,$location){
								       
     Datos.limpiar();

	   Cines.listado()
     .then(function(datos){
     	console.log(datos);
        $scope.cines = datos;
     })
     .catch(function(e){
       console.log(e);
     })

    
   	 $scope.borrar = function borrar(item) {

     Cines.borrar(item)
     .then(function(datos){
      console.log(item);
      var pos = $scope.cines.indexOf(item);
      $scope.cines.splice(pos, 1);
     })
     .catch(function(e){
       console.log(e);
     });
    }

    $scope.modificar = function modificar(item) {
      console.log(item);
     Datos.cargar(item);
     $location.path('adminCinesForm');
    }	 

     $scope.alta = function alta() {      
     Datos.cargar(null);
     $location.path('adminCinesForm');
    }	
   	       		         	         
    }])
})();