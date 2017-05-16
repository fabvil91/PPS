(function(){
	'use strict';
	angular.module('cine')
	.controller('seleccionEntradasCtrl', ['$rootScope','$scope','Datos','$sce','Salas',function($rootScope,$scope,Datos,$sce,Salas){	
		$scope.complejos = ["Cinemar Avellaneda", "Cinemar Lanus"];
		$scope.formatos = ["2D","3D"];
		$scope.idiomas = ["Español", "Subtitulado"];

		$scope.filtro = {};	 	
		$scope.precios = [{
			complejo: {nombre:"Cinemar Lanus"},
			formato: "2D",
			tipo: "Niño",
			monto: 170
			},
			{
			complejo: {nombre:"Cinemar Lanus"},
			formato: "2D",
			tipo: "Entrada General",
			monto: 220
			},
			{
			complejo: {nombre:"Cinemar Avellaneda"},
			formato: "3D",
			tipo: "Entrada General",
			monto: 260
			},
			{
			complejo: {nombre:"Cinemar Avellaneda"},
			formato: "3D",
			tipo: "Niño",
			monto: 230
			},
			{
			complejo: {nombre:"Cinemar Lanus"},
			formato: "3D",
			tipo: "Niño",
			monto: 230
			},
			{
			complejo: {nombre:"Cinemar Lanus"},
			formato: "3D",
			tipo: "Entrada General",
			monto: 260
			},
			{
			complejo: {nombre:"Cinemar Avellaneda"},
			formato: "2D",
			tipo: "Entrada General",
			monto: 220
			},
			{
			complejo: {nombre:"Cinemar Avellaneda"},
			formato: "2D",
			tipo: "Niño",
			monto: 170
			}
		];
		$scope.transaccion = {}
		$scope.entradas = []

		$scope.funcion = Datos.listado();
		$scope.preciosFiltrados = $scope.precios.filter(function(element){
				return (element.complejo.nombre === $scope.funcion.complejo.nombre && element.formato === $scope.funcion.formato);
		});

		
		$scope.agregarEntrada = function(tipo, precio){
			var entrada = {
				tipo:tipo,
				precio:precio
			}
			$scope.entradas.push(entrada);
			
		};

		$scope.restarEntrada = function(tipo,precio){
			for(var i = 0; i<$scope.entradas.length-1;i++){
				if($scope.entradas[i].tipo==tipo){
					$scope.entradas.splice(i,1);
					return;
				}
			}
		}

		
    }])
})();


