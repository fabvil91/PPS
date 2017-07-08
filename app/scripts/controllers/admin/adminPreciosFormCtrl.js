(function(){
	'use strict';
	angular.module('cine')
	.controller('adminPreciosFormCtrl', ['$rootScope','$scope','Datos','$sce','Complejos','Formatos','Precios','$location',
	function($rootScope,$scope,Datos,$sce,Complejos,Formatos,Precios,$location){									
        $scope.precio = {};
		$scope.tipos=["Entrada General","Niño"];
       Complejos.listado()
	    .then(function(datos){
	     console.log(datos);
	     $scope.complejos = datos; 
		  Formatos.listado()
	    .then(function(datos){
	     console.log(datos);
	     $scope.formatos = datos; 

	    if(Datos.listado() == null){
	     console.log('alta ' + Datos.listado());
	     $scope.cargar = cargar;
	    	    	  	     
	     function cargar() {   
	     	console.log($scope.precio);

	     	var complejo = $scope.complejos.filter(function(element){
			return (element._id === $scope.precio.complejo._id);
		});
		var formato = $scope.formatos.filter(function(element){
			return (element._id === $scope.precio.formato._id);
			});

	    	$scope.precio.complejo = complejo[0];
			$scope.precio.formato = formato[0];

	       Precios.alta($scope.precio)
	       .then(function(datos){
	        console.log(datos);
	    	$location.path('adminPrecios');
	       })
	       .catch(function(e){
	        console.log(e);
	       });
	     }

	   }else{
		    console.log('modificar' + Datos.listado());  
		    $scope.cargar = cargar;
		    
		    $scope.precio = Datos.listado();
		    console.log($scope.precio);	    	    	   	    
		     
		    function cargar() {
		    	console.log($scope.precio);	

		    	var complejo = $scope.complejos.filter(function(element){
			return (element._id === $scope.precio.complejo._id);
			});
			var formato = $scope.formatos.filter(function(element){
				return (element._id === $scope.precio.formato._id);
				});

	    	$scope.precio.complejo = complejo[0];
			$scope.precio.formato = formato[0];

		       Precios.modificar($scope.precio)
		        .then(function(datos){
		         console.log(datos);
		         $location.path('adminPrecios');
		        })
		        .catch(function(e){
		         console.log(e);
		       });

		       Datos.limpiar(); 
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