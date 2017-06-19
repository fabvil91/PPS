(function(){
	'use strict';
	angular.module('cine')
	.controller('adminSlideCtrl', ['$rootScope','$scope','Datos','$sce','Slides','$timeout','$location',function($rootScope,$scope,Datos,$sce,Slides,$timeout,$location){
								       
     Datos.limpiar();

	   Slides.listado()
     .then(function(datos){
     	console.log(datos);
        $scope.slides = datos;
     })
     .catch(function(e){
       console.log(e);
     })

    
   	 $scope.borrar = function borrar(item) {

     Slides.borrar(item)
     .then(function(datos){
      console.log(item);
      var pos = $scope.slides.indexOf(item);
      $scope.slides.splice(pos, 1);
     })
     .catch(function(e){
       console.log(e);
     });
    }

    $scope.modificar = function modificar(item) {
      console.log(item);
     Datos.cargar(item);
     $location.path('adminSlideForm');
    }	 

     $scope.alta = function alta() {      
     Datos.cargar(null);
     $location.path('adminSlideForm');
    }	
   	       		         	         
    }])
})();