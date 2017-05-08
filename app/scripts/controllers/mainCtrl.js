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
			{imageUrl: "images/peliculas/StarWars.jpg",
			 nombre: "Star Wars",
			 descripcion: "Episodio 7"
			},
			{imageUrl: "images/peliculas/Logan.jpg",
			 nombre: "Logan",
			 descripcion: "Vuelve de nuevo a la accion"
			},
			{imageUrl: "images/peliculas/America.jpg",
			 nombre: "Capitan America",
			 descripcion: "El heroe de estados unidos"
			},
			{imageUrl: "images/peliculas/BeautyAndTheBeast.jpg",
			 nombre: "Bella y Bestia",
			 descripcion: "Un romance diferente" 
			}
		];

		$scope.funciones = [
			{
				pelicula: {imageUrl: "images/peliculas/StarWars.jpg",
			 			   nombre: "Star Wars",
			 			   descripcion: "Episodio 7"},
				formato: "2D",
				complejo: {
						   nombre: "Cinemar Avellaneda"
						  },
				idioma: "Español",
				dia: new Date("5/8/2017")
			},
			{
				pelicula: {imageUrl: "images/peliculas/Logan.jpg",
			 			   nombre: "Logan",
			 			   descripcion: "Vuelve de nuevo a la accion"},
				formato: "3D",
				complejo: {
						   nombre: "Cinemar Lanus"
						  },
				idioma: "Subtitulado",
				dia: new Date("5/10/2017")
			},
			{
				pelicula: {imageUrl: "images/peliculas/America.jpg",
			 			   nombre: "Capitan America",
			 			   descripcion: "El heroe de estados unidos"},
				formato: "3D",
				complejo: {
						   nombre: "Cinemar Avellaneda"
						  },
				idioma: "Español",
				dia: new Date("5/10/2017")
			},
			{
				pelicula: {imageUrl: "images/peliculas/BeautyAndTheBeast.jpg",
			 			   nombre: "Bella y Bestia",
			 			   descripcion: "Un romance diferente"},
				formato: "2D",
				complejo: {
						   nombre: "Cinemar Lanus"
						  },
				idioma: "Español",
				dia: new Date("5/11/2017")
			}
		];

				
		(function(){			
			var funcionesConTime = $scope.funciones;
			for (var i = funcionesConTime.length - 1; i >= 0; i--) {				
				funcionesConTime[i].diaTime = funcionesConTime[i].dia.getTime();				
			}
			console.log($scope.funciones);
			console.log(funcionesConTime);			
		})();
		
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
				
		$scope.fechas = getDates(hoy,proxSem);
		$scope.fechasDias = [];

		(function (){							
			for (var i = 0; i < $scope.fechas.length; i++ ) {	   
       		  $scope.fechasDias.push($scope.dias[$scope.fechas[i].getDay()]);    
			}						
		})();  
				
		$scope.filtrarDia = function(){		
			console.log($scope.filtro);
				
			var indice = $scope.fechasDias.indexOf($scope.filtro.dia);			
			var dia = $scope.fechas[indice];
			
			$scope.filtro.diaLocale = dia.getTime();					
		}
				
		$scope.limpiarFiltro = function (){
			console.log($rootScope);
			$scope.filtro = {};			
		}						
	});
})();