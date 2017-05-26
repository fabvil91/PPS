(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('promosVigentesCtrl', ['$rootScope','$scope','$location', 'Promociones',
	    function ($rootScope,$scope,$location,Promociones ) {

			  Promociones.listado()
		     .then(function(datos){
		     	console.log(datos);
		        $scope.promociones = datos;
		         })
		     .catch(function(e){
		       console.log(e);
		     })
		
	}
])})();
