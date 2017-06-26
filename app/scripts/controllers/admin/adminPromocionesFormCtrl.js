(function(){
	'use strict';
	angular.module('cine')
	.controller('adminPromocionesFormCtrl', ['$rootScope','$scope','Datos','$sce','Promociones','$location',function($rootScope,$scope,Datos,$sce,Promociones,$location){									
        $scope.promociones = {};

       Promociones.listado()
	    .then(function(datos){
	     console.log(datos);
	     $scope.promociones = datos; 

	    if(Datos.listado() == null){
	     console.log('alta ' + Datos.listado());
	     $scope.cargar = cargar;
	    	    	  	     
	    // function cargar() {   
	     	//console.log($scope.bancos);

	     	//var pelicula = $scope.peliculas.filter(function(element){
			//return (element._id === $scope.slide.pelicula._id);
			//});

	    	//$scope.slide.pelicula = pelicula[0];

	       Promociones.alta($scope.promociones)
	       .then(function(datos){
	        console.log(datos);
	       })
	       .catch(function(e){
	        console.log(e);
	       });
	         	    
	    	$location.path('adminPromociones');
	     }

	   }else{
		    console.log('modificar' + Datos.listado());  
		    $scope.cargar = cargar;
		    
		    $scope.slide = Datos.listado();
		    console.log($scope.prom);	    	    	   	    
		     
		    //function cargar() {
		    //	console.log($scope.bancos);	

		    //	var pelicula = $scope.peliculas.filter(function(element){
			//	return (element._id === $scope.slide.pelicula._id);
			//	});

		    //	$scope.slide.pelicula = pelicula[0];

		       Promociones.modificar($scope.promociones)
		        .then(function(datos){
		         console.log(datos);
		        })
		        .catch(function(e){
		         console.log(e);
		       });

		       Datos.limpiar(); 
		     
		       $location.path('adminPromociones');
		    }
	   }

	   })
	   .catch(function(e){
	      console.log(e);
	   })
    }])
})();


