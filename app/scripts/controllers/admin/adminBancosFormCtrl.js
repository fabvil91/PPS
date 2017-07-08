(function(){
	'use strict';
	angular.module('cine')
	.controller('adminBancosFormCtrl', ['$rootScope','$scope','Datos','$sce','Bancos','$location',function($rootScope,$scope,Datos,$sce,Bancos,$location){									
        $scope.banco = {};
		
	    if(Datos.listado() == null){
	     console.log('alta ' + Datos.listado());
		 $scope.cargar = cargar;
	    	    	  	     
	     function cargar() {   
	       Bancos.alta($scope.banco)
	       .then(function(datos){
	        console.log(datos);			
	    	$location.path('adminBancos');
	       })
	       .catch(function(e){
	        console.log(e);
			
	       }); 
	     }}

	   else{
		    console.log('modificar' + Datos.listado());  
		    $scope.cargar = cargar;
			$scope.banco=Datos.listado();
		     
		    function cargar() {
		   
		       Bancos.modificar($scope.banco)
		        .then(function(datos){
		         console.log(datos);				 
	    		$location.path('adminBancos');
		        })
		        .catch(function(e){
		         console.log(e);
				 
		       });

		       Datos.limpiar(); 
		    }
	   }

	}])
	
	   
})();



