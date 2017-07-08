(function(){
	'use strict';
	angular.module('cine')
	.controller('adminTarjetaFormCtrl', ['$rootScope','$scope','Datos','$sce','Tarjetas','$location',function($rootScope,$scope,Datos,$sce,Tarjetas,$location){									
        $scope.tarjeta = {};

       	if(Datos.listado() == null){
	     console.log('alta ' + Datos.listado());$scope.cargar = cargar;
	    	    	  	     
	     function cargar() {   
	       Tarjetas.alta($scope.tarjeta)
	       .then(function(datos){
	        console.log(datos);
	    	$location.path('adminTarjeta');
	       })
	       .catch(function(e){
	        console.log(e);
	       }); 
	     }}

	   else{
		    console.log('modificar' + Datos.listado());  
		    $scope.cargar = cargar;
		     $scope.tarjeta=Datos.listado();
		    function cargar() {
		   
		       Tarjetas.modificar($scope.tarjeta)
		        .then(function(datos){
		         console.log(datos); 		     
		       	 $location.path('adminTarjeta');
		        })
		        .catch(function(e){
		         console.log(e);
		       });

		       Datos.limpiar(); 
		    }
	   }

	}])
	   
})();
