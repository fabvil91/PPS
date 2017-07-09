(function(){
	'use strict';
	angular.module('cine')
	.controller('adminFormatosFormCtrl', ['$rootScope','$scope','Datos','$sce','Formatos','$location',function($rootScope,$scope,Datos,$sce,Formatos,$location){									
        $scope.formato = {};

       	if(Datos.listado() == null){
	     console.log('alta ' + Datos.listado());$scope.cargar = cargar;
	    	    	  	     
	     function cargar() {   
	       Formatos.alta($scope.formato)
	       .then(function(datos){
	        console.log(datos);
	    	$location.path('adminFormatos');
	       })
	       .catch(function(e){
	        console.log(e);
	       }); 
	     }}

	   else{
		    console.log('modificar' + Datos.listado());  
		    $scope.cargar = cargar;
		     $scope.formato=Datos.listado();
		    function cargar() {
		   
		       Formatos.modificar($scope.formato)
		        .then(function(datos){
		         console.log(datos); 		     
		       	 $location.path('adminFormatos');
		        })
		        .catch(function(e){
		         console.log(e);
		       });

		       Datos.limpiar(); 
		    }
	   }

	}])
	   
})();
