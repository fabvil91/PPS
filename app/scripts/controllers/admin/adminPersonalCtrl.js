(function(){
	'use strict';
	angular.module('cine')
	.controller('adminPersonalCtrl', ['$rootScope','$scope','Datos','$sce','TiposUsuario','$timeout','$location',function($rootScope,$scope,Datos,$sce,TiposUsuario,$timeout,$location){
								       
     Datos.limpiar();

	   TiposUsuario.listadoPersonal()
     .then(function(datos){
     	console.log(datos);
        $scope.personal = datos;
     })
     .catch(function(e){
       console.log(e);
     })

    
   	 $scope.borrarPersonal = function borrarPersonal(item) {

     TiposUsuario.borrarPersonal(item)
     .then(function(datos){
      console.log(item);
      var pos = $scope.personal.indexOf(item);
      $scope.personal.splice(pos, 1);
     })
     .catch(function(e){
       console.log(e);
     });
    }

    $scope.modificarPersonal = function modificarPersonal(item) {
      console.log(item);
     Datos.cargar(item);
     $location.path('adminPersonalForm');
    }	 

     $scope.altaPersonal = function altaPersonal() {      
     Datos.cargar(null);
     $location.path('adminPersonalForm');
    }	
   	       		         	         
    }])
})();