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

		       /*  SalasService.getById('5952bd9283d7350820e5f698')
			     .then(function(datos){
			     	console.log(datos);
		       
			     	 var o = {
			      	_id: '5927331139a5301c9ceb7699',
			      	sala: datos[0]
			      };
			     Funciones.modificarSala(o)
			     .then(function(datos){
			     	console.log(datos);
			       
			     })
			     .catch(function(e){
			       console.log(e);
			     })*/
              /*
				Modificados por refactor salas:
				salas.html X
				cajeroAsientos.html X
				cajeroBuscarCodiugo.html X
				cajeroAsietnosCtrl.js X
				cajeroFinaalizarCtrl.js X
				finalizarOperacionCtrl.js X
              */
		    /* })
		     .catch(function(e){
		       console.log(e);
		     })*/

		    


		         })
		     .catch(function(e){
		       console.log(e);
		     })

		   
		
	}
])})();
