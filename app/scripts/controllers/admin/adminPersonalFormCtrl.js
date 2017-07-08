(function(){
	'use strict';
	angular.module('cine')
	.controller('adminPersonalFormCtrl', ['$rootScope','$scope','Datos','$sce','TiposUsuario','$location',function($rootScope,$scope,Datos,$sce,TiposUsuario,$location){									
         $scope.persona = {};

       TiposUsuario.listadoPersonal()
	    .then(function(datos){
	     console.log(datos);
	     $scope.tipoUsuario = datos; 

	    if(Datos.listadoPersonal() == null){
	     console.log('alta ' + Datos.listadoPersonal());
	     $scope.cargar = cargar;
	    	    	  	     
	     function cargar() {   
	     	console.log($scope.persona);

	     	var tipoUsuario = $scope.tipoUsuario.filter(function(element){
			return (element._id === $scope.persona.tipoUsuario._id);
			});

	    	$scope.persona.tipoUsuario = tipoUsuario[0];

	       TiposUsuario.altaPersonal($scope.persona)
	       .then(function(datos){
	        console.log(datos);
	       })
	       .catch(function(e){
	        console.log(e);
	       });
	         	    
	    	$location.path('adminPersonal');
	     }

	   }else{
		    console.log('modificar' + Datos.listadoPersonal());  
		    $scope.cargar = cargar;
		    
		    $scope.persona = Datos.listadoPersonal();
		    console.log($scope.persona);	    	    	   	    
		     
		    function cargar() {
		    	console.log($scope.persona);	

		    	var tipoUsuario = $scope.tipoUsuario.filter(function(element){
				return (element._id === $scope.persona.tipoUsuario._id);
				});

		    	$scope.persona.tipoUsuario = tipoUsuario[0];

		       Slides.modificarPersonal($scope.persona)
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

