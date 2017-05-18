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
		$scope.entradas = [];
		$scope.total = 0;
		$scope.cantidadTotal = 0;

		$scope.funcion = Datos.listado();

		$scope.preciosFiltrados = $scope.precios.filter(function(element){
				return (element.complejo.nombre === $scope.funcion.complejo.nombre && element.formato === $scope.funcion.formato);
		});

		(function(){
			for (var i = $scope.preciosFiltrados.length - 1; i >= 0; i--) {
				$scope.preciosFiltrados[i].cantidad = 0;
				$scope.preciosFiltrados[i].subtotal = 0;
			}
			console.log($scope.preciosFiltrados);
		})();

		
		$scope.agregarEntrada = function(precio){	
			if($scope.cantidadTotal == 6){		
				$scope.mensaje = "Puede seleccionar un máximo de 6 entradas"
			}else{	
				precio.cantidad = precio.cantidad + 1;
				precio.subtotal = precio.cantidad * precio.monto;
				$scope.total = $scope.total + precio.monto;				
				$scope.cantidadTotal = $scope.cantidadTotal + 1;
			}							
		};

		$scope.restarEntrada = function(precio){				
			if(precio.cantidad > 0){
				precio.cantidad = precio.cantidad - 1;
				precio.subtotal = precio.cantidad * precio.monto;
				$scope.total = $scope.total - precio.monto;			
				$scope.cantidadTotal = $scope.cantidadTotal - 1;
			}
		}

		$scope.cargar = function(funcion){
        	funcion.cantidadAsientos = $scope.cantidadTotal;
        	funcion.entradas = $scope.preciosFiltrados;
        	console.log(funcion);
        	
			Datos.cargar(funcion);
        }	
				
    }])
})();


