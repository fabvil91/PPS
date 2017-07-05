(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('promosVigentesCtrl', ['$rootScope','$scope','$location', 'Promociones','Funciones','Complejos',
	    function ($rootScope,$scope,$location,Promociones,Funciones,Complejos) {

			  Promociones.listado()
		     .then(function(datos){
		     	console.log(datos);
		        $scope.promociones = datos;

		      /*   Complejos.getById('5927208039a5301c9ceb768c')
			     .then(function(datos){
			     	console.log(datos);
		       
			     	 var o = {
			      	_id: '5927331139a5301c9ceb7699',
			      	complejo: datos[0]
			      };
			     Funciones.modificarComplejo(o)
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
