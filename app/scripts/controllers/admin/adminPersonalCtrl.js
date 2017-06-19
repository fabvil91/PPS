(function(){
	'use strict';
	angular.module('cine')
	.controller('adminPersonalCtrl', ['$rootScope','$scope','Datos','$sce','Personal','$timeout','$location',function($rootScope,$scope,Datos,$sce,Personal,$timeout,$location){
								       
     Datos.limpiar();

	   Personal.listado()
     .then(function(datos){
     	console.log(datos);
        $scope.personal = datos;
     })
     .catch(function(e){
       console.log(e);
     })

    
   	 $scope.borrar = function borrar(item) {

     Personal.borrar(item)
     .then(function(datos){
      console.log(item);
      var pos = $scope.personal.indexOf(item);
      $scope.personal.splice(pos, 1);
     })
     .catch(function(e){
       console.log(e);
     });
    }

    $scope.modificar = function modificar(item) {
      console.log(item);
     Datos.cargar(item);
     $location.path('adminPersonalForm');
    }	 

     $scope.alta = function alta() {      
     Datos.cargar(null);
     $location.path('adminPersonalForm');
    }	
   	       		         	         
    }])
})();