(function(){
	'use strict';
	angular.module('cine')
	.controller('adminCinesFormCtrl', ['$rootScope','$scope','Datos','$sce','Complejos','$location',function($rootScope,$scope,Datos,$sce,Complejos,$location){									
    $scope.complejo = {};

       	    if(Datos.listado() == null){
	     console.log('alta ' + Datos.listado());$scope.cargar = cargar;
	    	    	  	     
	     function cargar() {   
	       Complejos.alta($scope.complejo)
	       .then(function(datos){
	        console.log(datos);
	       })
	       .catch(function(e){
	        console.log(e);
	       }); 
	    	$location.path('adminCines');
	     }}

	   else{
		    console.log('modificar' + Datos.listado());  
		    $scope.cargar = cargar;
		     
		    function cargar() {
		   
		       Complejos.modificar($scope.complejo)
		        .then(function(datos){
		         console.log(datos);
		        })
		        .catch(function(e){
		         console.log(e);
		       });

		       Datos.limpiar(); 
		     
		       $location.path('adminCines');
		    }
	   }

	}
	   
})();



