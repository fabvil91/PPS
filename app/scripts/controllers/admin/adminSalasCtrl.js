(function(){
	'use strict';
	angular.module('cine')
	.controller('adminSalasCtrl', ['$rootScope','$scope','Datos','$sce','SalasService','$timeout','$location',
    function($rootScope,$scope,Datos,$sce,SalasService,$timeout,$location){
								       
     Datos.limpiar();

	 SalasService.listado()
     .then(function(datos){
     	console.log(datos);
        $scope.salas = datos;
     })
     .catch(function(e){
       console.log(e);
     })

    
   	 $scope.borrar = function borrar(item) {

     SalasService.borrar(item)
     .then(function(datos){
      console.log(item);
      var pos = $scope.salas.indexOf(item);
      $scope.salas.splice(pos, 1);
     })
     .catch(function(e){
       console.log(e);
     });
    }	 

     $scope.alta = function alta() {      
     Datos.cargar(null);
     $location.path('adminSalaNueva');
    }	
   	       		         	         
    }])
})();