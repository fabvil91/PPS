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
				nombre: "Viernes de Cine",
				descripcion: "30% de descuento en todas las entradas"
			},

            {
				nombre: "2x1 Banco Santander Rio",
				descripcion: "Abonando con tu tarjeta Visa-Santander Rio,obtene el beneficio 2x1 en salas 2D todos los dias y 2x1 en salas 3D de Lunes a Jueves "
                              
                              
			},

			{                                 
				nombre: "Promo Jueves de Estreno",
				descripcion: "Un dia a precio especial"
			},

			{
				nombre: "2x1 Banco Galicia",
				descripcion: "Abonando con tu tarjeta Mastercard-Galicia, obtene el beneficio 2x1 en salas 2D todos los dias y 2x1 en salas 3D de Lunes a Jueves "
                            
                              
			},

            {
				nombre: "2x1 Visa",
				descripcion: "Abonando con tu tarjeta Visa de cualquier Banco obtene el beneficio 2x1 en salas 2D todos los dias y 2x1 en salas 3D de Lunes a Jueves " 
                              
                              
			}







			]
	}
])})();
