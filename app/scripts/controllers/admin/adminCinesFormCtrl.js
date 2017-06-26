(function(){
	'use strict';
	angular.module('cine')
	.controller('adminCinesFormCtrl', ['$rootScope','$scope','Datos','$sce','Cines','$location',function($rootScope,$scope,Datos,$sce,Cines,$location){									
        $scope.cines = {};

       Cines.listado()
	    .then(function(datos){
	     console.log(datos);
	     $scope.cines = datos; 

	    if(Datos.listado() == null){
	     console.log('alta ' + Datos.listado());
	     $scope.cargar = cargar;
	    	    	  	     
	    // function cargar() {   
	     	//console.log($scope.bancos);

	     	//var pelicula = $scope.peliculas.filter(function(element){
			//return (element._id === $scope.slide.pelicula._id);
			//});

	    	//$scope.slide.pelicula = pelicula[0];

	       Cines.alta($scope.cines)
	       .then(function(datos){
	        console.log(datos);
	       })
	       .catch(function(e){
	        console.log(e);
	       });
	         	    
	    	$location.path('adminCines');
	     }

	   }else{
		    console.log('modificar' + Datos.listado());  
		    $scope.cargar = cargar;
		    
		    $scope.slide = Datos.listado();
		    console.log($scope.cines);	    	    	   	    
		     
		    //function cargar() {
		    //	console.log($scope.bancos);	

		    //	var pelicula = $scope.peliculas.filter(function(element){
			//	return (element._id === $scope.slide.pelicula._id);
			//	});

		    //	$scope.slide.pelicula = pelicula[0];

		       Bancos.modificar($scope.cines)
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

	   })
	   .catch(function(e){
	      console.log(e);
	   })
    }])
})();


