(function(){
	'use strict';
	angular.module('cine')
	.controller('mainCtrl', function($rootScope,$scope){		
		$scope.complejos = ["Cinemar Avellaneda", "Cinemar Lanus"];
		$scope.formatos = ["2D","3D"];
		$scope.idiomas = ["Español", "Subtitulado"];

		$scope.filtro = {};

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
				idioma: "Español",
				dia: new Date("5/5/2017")
			},
			{
				pelicula: {imageUrl: "http://www.foxlatina.com/custom-pages/logan-es/img/backgrounds_logan_outer.jpg",
			 			   nombre: "Logan",
			 			   descripcion: "Vuelve de nuevo a la accion"},
				formato: "3D",
				complejo: {
						   nombre: "Cinemar Lanus"
						  },
				idioma: "Subtitulado",
				dia: new Date("5/7/2017")
			}
		];

		$scope.funciones = funciones;
		$scope.funcionesFiltradas = funciones;
		
		Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
   		}

   		function getDates(startDate, stopDate) {
      	var dateArray = new Array();
      	var currentDate = startDate;
      	while (currentDate <= stopDate) {
        	dateArray.push(currentDate)
        	currentDate = currentDate.addDays(1);
      	}
      	return dateArray;
    	}

		$scope.dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
		var hoy = new Date();
		hoy.setHours(0,0,0,0);
		var proxSem = (new Date()).addDays(6);
		proxSem.setHours(0,0,0,0);
		//console.log(hoy);
		//console.log(proxSem);
		//$scope.fechas = getDates(new Date(), (new Date()).addDays(6));
		$scope.fechas = getDates(hoy,proxSem);
		$scope.fechasDias = [];

		(function (){			
			//console.log($scope.fechas);			
			for (var i = 0; i < $scope.fechas.length; i++ ) {	   
       		  $scope.fechasDias.push($scope.dias[$scope.fechas[i].getDay()]);    
			}
			//console.log($scope.fechasDias);
			//console.log(funciones[1].dia);
		})();  

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

		function checkIdioma(funcion){
			return funcion.idioma == $scope.filtro.idioma;
		}

		$scope.filtrarIdioma = function (){
			$scope.funcionesFiltradas = $scope.funciones.filter(checkIdioma);
		}

		$scope.limpiarFiltro = function (){
			console.log($rootScope);
			$scope.filtro = {};
			$scope.funcionesFiltradas = funciones;
		}

		function checkDia(funcion){
			return funcion.dia.getTime() === $scope.filtro.diaLocale.getTime();
		}

		$scope.filtrarDia = function(){
			console.log($scope.filtro);
			var indice = $scope.fechasDias.indexOf($scope.filtro.dia);
			console.log(indice);
			var dia = $scope.fechas[indice];
			console.log(dia);			
			$scope.filtro.diaLocale = dia;//new Date(dia).toLocaleDateString();
			console.log($scope.filtro.diaLocale);
			$scope.funcionesFiltradas = $scope.funciones.filter(checkDia);
		}
		
	});
})();