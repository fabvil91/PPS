(function(){
	'use strict';
	angular.module('cine')
	.controller('adminFormatosCtrl', ['$rootScope','$scope','Datos','$sce','Formatos','$timeout','$location',function($rootScope,$scope,Datos,$sce,Formatos,$timeout,$location){
								       
     Datos.limpiar();

	   Formatos.listado()
     .then(function(datos){
     	console.log(datos);
        $scope.formatos = datos;
     })
     .catch(function(e){
       console.log(e);
     })

    
   	 $scope.borrar = function borrar(item) {

     Formatos.borrar(item)
     .then(function(datos){
      console.log(item);
      var pos = $scope.formatos.indexOf(item);
      $scope.formatos.splice(pos, 1);
     })
     .catch(function(e){
       console.log(e);
     });
    }

    $scope.modificar = function modificar(item) {
      console.log(item);
     Datos.cargar(item);
     $location.path('adminFormatosForm');
    }	 

     $scope.alta = function alta() {      
     Datos.cargar(null);
     $location.path('adminFormatosForm');
    }	
   	       		         	         
    }])
})();