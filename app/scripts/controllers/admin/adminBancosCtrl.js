(function(){
	'use strict';
	angular.module('cine')
	.controller('adminBancosCtrl', ['$rootScope','$scope','Datos','$sce','Bancos','$timeout','$location',function($rootScope,$scope,Datos,$sce,Bancos,$timeout,$location){
								       
     Datos.limpiar();

	   Bancos.listado()
     .then(function(datos){
     	console.log(datos);
        $scope.bancos = datos;
     })
     .catch(function(e){
       console.log(e);
     })

    
   	 $scope.borrar = function borrar(item) {

     Bancos.borrar(item)
     .then(function(datos){
      console.log(item);
      var pos = $scope.bancos.indexOf(item);
      $scope.bancos.splice(pos, 1);
     })
     .catch(function(e){
       console.log(e);
     });
    }

    $scope.modificar = function modificar(item) {
      console.log(item);
     Datos.cargar(item);
     $location.path('adminBancosForm');
    }	 

     $scope.alta = function alta() {      
     Datos.cargar(null);
     $location.path('adminBancosForm');
    }	
   	       		         	         
    }])
})();