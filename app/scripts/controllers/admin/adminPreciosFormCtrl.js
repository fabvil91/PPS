(function(){
	'use strict';
	angular.module('cine')
	.controller('adminPreciosFormCtrl', ['$rootScope','$scope','Datos','$sce','Complejos','Precios','$location',function($rootScope,$scope,Datos,$sce,Complejos,Precios,$location){									
        $scope.precio = {};

       Complejos.listado()
	    .then(function(datos){
	     console.log(datos);
	     $scope.complejos = datos; 

	    if(Datos.listado() == null){
	     console.log('alta ' + Datos.listado());
	     $scope.cargar = cargar;
	    	    	  	     
	     function cargar() {   
	     	console.log($scope.precio);

	     	var complejo = $scope.peliculas.filter(function(element){
			return (element._id === $scope.precio.complejo._id);
			});

	    	$scope.precio.complejo = complejo[0];

	       Slides.alta($scope.precio)
	       .then(function(datos){
	        console.log(datos);
	       })
	       .catch(function(e){
	        console.log(e);
	       });
	         	    
	    	$location.path('adminPrecios');
	     }

	   }else{
		    console.log('modificar' + Datos.listado());  
		    $scope.cargar = cargar;
		    
		    $scope.slide = Datos.listado();
		    console.log($scope.precio);	    	    	   	    
		     
		    function cargar() {
		    	console.log($scope.precio);	

		    	var complejos = $scope.complejos.filter(function(element){
				return (element._id === $scope.precio.complejo._id);
				});

		    	$scope.precio.complejo = complejo[0];

		       Slides.modificar($scope.precio)
		        .then(function(datos){
		         console.log(datos);
		        })
		        .catch(function(e){
		         console.log(e);
		       });

		       Datos.limpiar(); 
		     
		       $location.path('adminPrecios');
		    }
	   }

	   })
	   .catch(function(e){
	      console.log(e);
	   })
    }])
})();