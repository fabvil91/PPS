(function(){
	'use strict';
	angular.module('cine')
	.controller('mainCtrl', function($scope){
		$scope.complejos = ["Cinemar Avellaneda", "Cinemar Lanus"];
		$scope.formatos = ["2D","3D"];

		 $scope.filtro = {
      //  complejo : $scope.complejos[0]
       };

		$scope.myInterval = 3000;
		
		$scope.slides = [
			{imageUrl: "https://lh3.googleusercontent.com/-H1KqX5HicIU/AAAAAAAAAAI/AAAAAAABSs8/XItaPYUOWX4/photo.jpg",
			 nombre: "Star Wars",
			 descripcion: "Episodio 7"
			},
			{imageUrl: "http://www.foxlatina.com/custom-pages/logan-es/img/backgrounds_logan_outer.jpg",
			 nombre: "Logan",
			 descripcion: "1231111132 434"
			},
			{imageUrl: "http://lacarbonifera.com/wp-content/uploads/2016/05/Steven_Rogers_Earth-616_0007.jpg",
			 nombre: "Capitan America",
			 descripcion: "Effffffffffffffffffffffffffffffffffff"
			},
			{imageUrl: "https://4.bp.blogspot.com/-JtQOvKt1hJE/WIiAKGp9xEI/AAAAAAAAUCc/hzwIrs8f050GTVA6JQpMRyD5lQs0ibcwQCLcB/s400/posterchino.jpg",
			 nombre: "Bella y Bestia",
			 descripcion: "Episod234dsfgdfgdfg 34534 234523 123123 io 7 sdfsd "
			}
		];

		var funciones = [
			{
				pelicula: {imageUrl: "https://lh3.googleusercontent.com/-H1KqX5HicIU/AAAAAAAAAAI/AAAAAAABSs8/XItaPYUOWX4/photo.jpg",
			 			   nombre: "Star Wars",
			 			   descripcion: "Episodio 7"},
				formato: "2D",
				complejo: {
						   nombre: "Cinemar Avellaneda"
						  },
				idioma: "Español"
			},
			{
				pelicula: {imageUrl: "http://www.foxlatina.com/custom-pages/logan-es/img/backgrounds_logan_outer.jpg",
			 			   nombre: "Logan",
			 			   descripcion: "Vuelve de nuevo a la accion"},
				formato: "3D",
				complejo: {
						   nombre: "Cinemar Lanus"
						  },
				idioma: "Subtitulado"
			}
		];

		$scope.funciones = funciones;
		$scope.funcionesFiltradas = funciones;
		
		function checkComplejo(funcion){
			return funcion.complejo.nombre == $scope.filtro.complejo.nombre;
		}

		$scope.filtrarComplejo = function (){
			$scope.funcionesFiltradas = $scope.funciones.filter(checkComplejo);
		}

		function checkFormato(funcion){
			return funcion.formato == $scope.filtro.formato;
		}

		$scope.filtrarFormato = function (){
			$scope.funcionesFiltradas = $scope.funciones.filter(checkFormato);
		}
		
	});
})();