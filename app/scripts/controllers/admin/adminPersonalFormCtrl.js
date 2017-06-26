(function(){
	'use strict';
	angular.module('cine')
	.controller('adminPersonalFormCtrl', ['$rootScope','$scope','Datos','$sce','Personal','$location',function($rootScope,$scope,Datos,$sce,Personal,$location){									
        $scope.personal = {};

       Personal.listado()
	    .then(function(datos){
	     console.log(datos);
	     $scope.personal = datos; 

	    if(Datos.listado() == null){
	     console.log('alta ' + Datos.listado());
	     $scope.cargar = cargar;
	    	    	  	     
	    // function cargar() {   
	     	//console.log($scope.bancos);

	     	//var pelicula = $scope.peliculas.filter(function(element){
			//return (element._id === $scope.slide.pelicula._id);
			//});

	    	//$scope.slide.pelicula = pelicula[0];

	       Personal.alta($scope.personal)
	       .then(function(datos){
	        console.log(datos);
	       })
	       .catch(function(e){
	        console.log(e);
	       });
	         	    
	    	$location.path('adminPersonal');
	     }

	   }else{
		    console.log('modificar' + Datos.listado());  
		    $scope.cargar = cargar;
		    
		    $scope.slide = Datos.listado();
		    console.log($scope.personal);	    	    	   	    
		     
		    //function cargar() {
		    //	console.log($scope.bancos);	

		    //	var pelicula = $scope.peliculas.filter(function(element){
			//	return (element._id === $scope.slide.pelicula._id);
			//	});

		    //	$scope.slide.pelicula = pelicula[0];

		       Personal.modificar($scope.personal)
		        .then(function(datos){
		         console.log(datos);
		        })
		        .catch(function(e){
		         console.log(e);
		       });

		       Datos.limpiar(); 
		     
		       $location.path('adminPersonal');
		    }
	   }

	   })
	   .catch(function(e){
	      console.log(e);
	   })
    }])
})();


