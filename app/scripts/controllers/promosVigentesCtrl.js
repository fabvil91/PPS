(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('promosVigentesCtrl', ['$rootScope','$scope','$location', 'AuthenticationService',
	    function ($rootScope,$scope,$location, AuthenticationService) {

			$scope.promociones = [ {
				nombre: "miercoles de cine",
				descripcion: "2x1"
			},
			{
				nombre: "pepe",
				descripcion: "pepe2"
			}
			]
	}
])})();
