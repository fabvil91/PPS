(function(){
	'use strict';
	angular.module('cine')
	.controller('adminTarjetaFormCtrl', ['$rootScope','$scope','Datos','$sce','Tarjetas','$location',function($rootScope,$scope,Datos,$sce,Tarjetas,$location){									
        $scope.tarjetas = {};

       Tarjetas.listado()
	    .then(function(datos){
	     console.log(datos);
	     $scope.tarjetas = datos; 

	    if(Datos.listado() == null){
	     console.log('alta ' + Datos.listado());
	     $scope.cargar = cargar;
	    	    	  	     
	    // function cargar() {   
	     	//console.log($scope.bancos);

	     	//var pelicula = $scope.peliculas.filter(function(element){
			//return (element._id === $scope.slide.pelicula._id);
			//});

	    	//$scope.slide.pelicula = pelicula[0];

	       Tarjetas.alta($scope.tarjetas)
	       .then(function(datos){
	        console.log(datos);
	       })
	       .catch(function(e){
	        console.log(e);
	       });
	         	    
	    	$location.path('adminTarjeta');
	     }

	   }else{
		    console.log('modificar' + Datos.listado());  
		    $scope.cargar = cargar;
		    
		    $scope.slide = Datos.listado();
		    console.log($scope.tarjetas);	    	    	   	    
		     
		    //function cargar() {
		    //	console.log($scope.bancos);	

		    //	var pelicula = $scope.peliculas.filter(function(element){
			//	return (element._id === $scope.slide.pelicula._id);
			//	});

		    //	$scope.slide.pelicula = pelicula[0];

		       Tarjetas.modificar($scope.tarjetas)
		        .then(function(datos){
		         console.log(datos);
		        })
		        .catch(function(e){
		         console.log(e);
		       });

		       Datos.limpiar(); 
		     
		       $location.path('adminTarjeta');
		    }
	   }

	   })
	   .catch(function(e){
	      console.log(e);
	   })
    }])
})();


