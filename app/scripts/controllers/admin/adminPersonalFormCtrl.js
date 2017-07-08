(function(){
	'use strict';
	angular.module('cine')
	.controller('adminPersonalFormCtrl', ['$rootScope','$scope','Datos','$sce','TiposUsuario','Usuarios','Complejos','$location',
	function($rootScope,$scope,Datos,$sce,TiposUsuario,Usuarios,Complejos,$location){									
         $scope.persona = {};

       TiposUsuario.listado()
	    .then(function(datos){
	     console.log(datos);
	     $scope.tipoUsuario = datos.filter(function(item){
			 if(item.nombre!="Usuario"&&item.nombre!="Admin"){
				 return item;
			 }
		 }); 
		  Complejos.listado()
	    .then(function(datos){
	     console.log(datos);
		 $scope.complejos=datos;

			if(Datos.listado() == null){
			console.log('alta ' + Datos.listado());
			$scope.cargar = cargar;
								
			function cargar() {   
				console.log($scope.persona);

				var tipoUsuario = $scope.tipoUsuario.filter(function(element){
				return (element._id === $scope.persona.tipo._id);
			});
				var complejo = $scope.complejos.filter(function(element){
				return (element._id === $scope.persona.complejo._id);
				});
				$scope.persona.complejo=complejo[0];
				$scope.persona.tipo = tipoUsuario[0];
				console.log($scope.persona);
	
			Usuarios.altaPersonal($scope.persona)
			.then(function(datos){
				console.log(datos);	         	    
				$location.path('adminPersonal');
			})
			.catch(function(e){
				console.log(e);
			});
			}

		}else{
				console.log('modificar' + Datos.listado());  
				$scope.cargar = cargar;
				
				$scope.persona = Datos.listado();
				console.log($scope.persona);	    	    	   	    
				
				function cargar() {
					console.log($scope.persona);	

					var tipoUsuario = $scope.tipoUsuario.filter(function(element){
					return (element._id === $scope.persona.tipo._id);
					});

					$scope.persona.tipo = tipoUsuario[0];
					var complejo = $scope.complejos.filter(function(element){
					return (element._id === $scope.persona.complejo._id);
					});
					$scope.persona.complejo=complejo[0];
					console.log($scope.persona);

				Usuarios.modificarUsuario($scope.persona)
					.then(function(datos){
					console.log(datos);
					$location.path('adminPersonal');
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

