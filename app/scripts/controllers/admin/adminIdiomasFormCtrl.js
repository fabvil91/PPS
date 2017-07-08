(function(){
	'use strict';
	angular.module('cine')
	.controller('adminIdiomasFormCtrl', ['$rootScope','$scope','Datos','$sce','Idiomas','$location',function($rootScope,$scope,Datos,$sce,Idiomas,$location){									
        $scope.idioma = {};

       	if(Datos.listado() == null){
	     console.log('alta ' + Datos.listado());$scope.cargar = cargar;
	    	    	  	     
	     function cargar() {   
	       Idiomas.alta($scope.idioma)
	       .then(function(datos){
	        console.log(datos);
	    	$location.path('adminIdiomas');
	       })
	       .catch(function(e){
	        console.log(e);
	       }); 
	     }}

	   else{
		    console.log('modificar' + Datos.listado());  
		    $scope.cargar = cargar;
		     $scope.idioma=Datos.listado();
		    function cargar() {
		   
		       Idiomas.modificar($scope.idioma)
		        .then(function(datos){
		         console.log(datos); 		     
		       	 $location.path('adminIdiomas');
		        })
		        .catch(function(e){
		         console.log(e);
		       });

		       Datos.limpiar(); 
		    }
	   }

	}])
	   
})();
