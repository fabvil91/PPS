(function(){
	'use strict';
	angular.module('cine')
	.controller('adminBancosFormCtrl', ['$rootScope','$scope','Datos','$sce','Bancos','$location',function($rootScope,$scope,Datos,$sce,Bancos,$location){									
        $scope.bancos = {};

       Bancos.listado()
	    .then(function(datos){
	     console.log(datos);
	     $scope.bancos = datos; 

	    if(Datos.listado() == null){
	     console.log('alta ' + Datos.listado());
	     $scope.cargar = cargar;
	    	    	  	     
	    // function cargar() {   
	     	//console.log($scope.bancos);

	     	//var pelicula = $scope.peliculas.filter(function(element){
			//return (element._id === $scope.slide.pelicula._id);
			//});

	    	//$scope.slide.pelicula = pelicula[0];

	       Bancos.alta($scope.bancos)
	       .then(function(datos){
	        console.log(datos);
	       })
	       .catch(function(e){
	        console.log(e);
	       });
	         	    
	    	$location.path('adminBancos');
	     }

	   }else{
		    console.log('modificar' + Datos.listado());  
		    $scope.cargar = cargar;
		    
		    $scope.slide = Datos.listado();
		    console.log($scope.bancos);	    	    	   	    
		     
		    //function cargar() {
		    //	console.log($scope.bancos);	

		    //	var pelicula = $scope.peliculas.filter(function(element){
			//	return (element._id === $scope.slide.pelicula._id);
			//	});

		    //	$scope.slide.pelicula = pelicula[0];

		       Bancos.modificar($scope.bancos)
		        .then(function(datos){
		         console.log(datos);
		        })
		        .catch(function(e){
		         console.log(e);
		       });

		       Datos.limpiar(); 
		     
		       $location.path('adminBancos');
		    }
	   }

	   })
	   .catch(function(e){
	      console.log(e);
	   })
    }])
})();


