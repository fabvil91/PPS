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
		$scope.promociones = [{nombre: "Miércoles de Cine",
							   porcentaje: 50,
							   diaSemana: 3
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
			var promocion = null;
			for (var i = $scope.promociones.length - 1; i >= 0; i--) {
				if ($scope.promociones[i].diaSemana == $scope.funcion.dia.getDay()){
					promocion = $scope.promociones[i];
					break;
				}
			}
			console.log(promocion);
			for (var i = $scope.preciosFiltrados.length - 1; i >= 0; i--) {
				$scope.preciosFiltrados[i].cantidad = 0;
				$scope.preciosFiltrados[i].subtotal = 0;

				if($scope.preciosFiltrados[i].tipo == 'Entrada General' && promocion != null){
					$scope.preciosFiltrados[i].tipoOriginal = 'Entrada General';
					$scope.preciosFiltrados[i].tipo = promocion.nombre;

					$scope.preciosFiltrados[i].montoOriginal = $scope.preciosFiltrados[i].monto;
					$scope.preciosFiltrados[i].monto = $scope.preciosFiltrados[i].monto * (promocion.porcentaje / 100);

					$scope.preciosFiltrados[i].promocion = promocion;
				}
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
        	funcion.transaccion = $scope.transaccion;
        	console.log(funcion);
        	
			Datos.cargar(funcion);
        }	
				
    }])
})();


