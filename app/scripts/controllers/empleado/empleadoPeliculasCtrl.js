(function(){
	'use strict';
	angular.module('cine')
	.controller('empleadoPeliculasCtrl', ['$rootScope','$scope','Datos','$sce','Peliculas','$timeout','$location',function($rootScope,$scope,Datos,$sce,Peliculas,$timeout,$location){
								       
     Datos.limpiar();
 
  function list() {
	 Peliculas.listado()
     .then(function(datos){
     	console.log(datos);
        $scope.peliculas = datos;
     })
     .catch(function(e){
       console.log(e);
     })
   }
   $timeout(list, 200);
    
   	 $scope.borrar = function borrar(item) {
      item.estado = "Inactiva";
     Peliculas.modificar(item)
     .then(function(datos){
      console.log(item);
      //var pos = $scope.peliculas.indexOf(item);
      //$scope.peliculas.splice(pos, 1);
     })
     .catch(function(e){
       console.log(e);
     });
    }

    $scope.modificar = function modificar(item) {
      console.log(item);
     Datos.cargar(item);
     $location.path('empleadoPeliculasForm');
    }	 

     $scope.alta = function alta() {      
     Datos.cargar(null);
     $location.path('empleadoPeliculasForm');
    }	
   	       		         	         
    }])
})();