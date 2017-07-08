(function(){
	'use strict';
	angular.module('cine')
	.controller('adminIdiomasCtrl', ['$rootScope','$scope','Datos','$sce','Idiomas','$timeout','$location',function($rootScope,$scope,Datos,$sce,Idiomas,$timeout,$location){
								       
     Datos.limpiar();

	   Idiomas.listado()
     .then(function(datos){
     	console.log(datos);
        $scope.idiomas = datos;
     })
     .catch(function(e){
       console.log(e);
     })

    
   	 $scope.borrar = function borrar(item) {

     Idiomas.borrar(item)
     .then(function(datos){
      console.log(item);
      var pos = $scope.idiomas.indexOf(item);
      $scope.idiomas.splice(pos, 1);
     })
     .catch(function(e){
       console.log(e);
     });
    }

    $scope.modificar = function modificar(item) {
      console.log(item);
     Datos.cargar(item);
     $location.path('adminIdiomasForm');
    }	 

     $scope.alta = function alta() {      
     Datos.cargar(null);
     $location.path('adminIdiomasForm');
    }	
   	       		         	         
    }])
})();