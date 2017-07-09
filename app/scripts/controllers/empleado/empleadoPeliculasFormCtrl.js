(function(){
	'use strict';
	angular.module('cine')
	.controller('empleadoPeliculasFormCtrl', ['$rootScope','$scope','Datos','$sce','Formatos','Idiomas','$location',function($rootScope,$scope,Datos,$sce,Formatos,Idiomas,$location){									
        $scope.pelicula = {};
		$scope.estados = ["Activa", "Inactiva"];
		
		 Idiomas.listado()
	     .then(function(datos){
	     console.log(datos); 
	     $scope.idiomas = datos; 

	       Formatos.listado()
		    .then(function(datos){
		     console.log(datos); 
		     $scope.formatos = datos; 

		    if(Datos.listado() == null){
		     console.log('alta ' + Datos.listado());
		     $scope.cargar = cargar;
		    	    	  	     
		     function cargar() {   
		     	console.log($scope.slide);

		     	var pelicula = $scope.peliculas.filter(function(element){
				return (element._id === $scope.slide.pelicula._id);
				});

		    	$scope.slide.pelicula = pelicula[0];

		       Slides.alta($scope.slide)
		       .then(function(datos){
		        console.log(datos); 
		       })
		       .catch(function(e){
		        console.log(e);
		       });
		         	    
		    	$location.path('adminSlide');
		     }

		   }else{
			    console.log('modificar' + Datos.listado());  
			    $scope.cargar = cargar;
			    
			    $scope.slide = Datos.listado();
			    console.log($scope.slide);	    	    	   	    
			     
			    function cargar() {
			    	console.log($scope.slide);	

			    	var pelicula = $scope.peliculas.filter(function(element){
					return (element._id === $scope.slide.pelicula._id);
					});

			    	$scope.slide.pelicula = pelicula[0];

			       Slides.modificar($scope.slide)
			        .then(function(datos){
			         console.log(datos);
			        })
			        .catch(function(e){
			         console.log(e);
			       });

			       Datos.limpiar(); 
			     
			       $location.path('adminSlide');
			    }
		   }

	   })
	   .catch(function(e){
	      console.log(e);
	   })
	  })	    
	   .catch(function(e){
	      console.log(e);
	   })
    }])
})();