(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('promosVigentesCtrl', ['$rootScope','$scope','$location', 'Promociones','Funciones','SalasService',
	    function ($rootScope,$scope,$location,Promociones,Funciones,SalasService) {

			  Promociones.listado()
		     .then(function(datos){
		     	console.log(datos);
		        $scope.promociones = datos;

		         SalasService.getById('5952b54183d7350820e5f697')
			     .then(function(datos){
			     	console.log(datos);
		       
			     	 var o = {
			      	_id: '59272ca539a5301c9ceb7695',
			      	sala: datos
			      };
			 /*    Funciones.modificarSala(o)
			     .then(function(datos){
			     	console.log(datos);
			       
			     })
			     .catch(function(e){
			       console.log(e);
			     })*/
              /*
				A modifiar
				salas.html
				cajeroAsientos.html
				cajeroBuscarCodiugo.html
				cajeroAsietnosCtrl.js
				cajeroFinaalizarCtrl.js
				finalizarOperacionCtrl.js
              */
		     })
		     .catch(function(e){
		       console.log(e);
		     })

		    


		         })
		     .catch(function(e){
		       console.log(e);
		     })

		   
		
	}
])})();
