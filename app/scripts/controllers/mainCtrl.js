(function(){
	'use strict';
	angular.module('cine')
	.controller('mainCtrl', ['$rootScope','$scope','Datos','Complejos','Formatos','Idiomas','Slides','Funciones',function($rootScope,$scope,Datos,Complejos,Formatos,Idiomas,Slides,Funciones){		
	//	$scope.complejos = ["Cinemar Avellaneda", "Cinemar Lanus"];

		 Complejos.listado()
	     .then(function(datos){
	     	console.log(datos);
	        $scope.complejos = datos;
	     })
	     .catch(function(e){
	       console.log(e);
	     })

		//$scope.formatos = ["2D","3D"];

		Formatos.listado()
	     .then(function(datos){
	     	console.log(datos);
	        $scope.formatos = datos;
	     })
	     .catch(function(e){
	       console.log(e);
	     })

		//$scope.idiomas = ["Español", "Subtitulado"];

		Idiomas.listado()
	     .then(function(datos){
	     	console.log(datos);
	        $scope.idiomas = datos;
	     })
	     .catch(function(e){
	       console.log(e);
	     })

		$scope.filtro = {};

		$scope.myInterval = 3000;
		
	/*	$scope.slides = [
			{imageUrl: "images/carousel/starWars.jpg",
			 nombre: "Star Wars",
			 descripcion: "Episodio 7"
			},
			{imageUrl: "images/carousel/logan.jpg",
			 nombre: "Logan",
			 descripcion: "Vuelve de nuevo a la acción"
			},
			{imageUrl: "images/carousel/cv2.jpg",
			 nombre: "Capitán América",
			 descripcion: "El héroe de Estados Unidos"
			},
			{imageUrl: "images/carousel/beautyAndBeast.jpeg",
			 nombre: "Bella y Bestia",
			 descripcion: "Un romance diferente" 
			}
		];*/

		Slides.listado()
	     .then(function(datos){
	     	console.log(datos);
	        $scope.slides = datos;
	     })
	     .catch(function(e){
	       console.log(e);
	     })

	/*	$scope.funciones = [
			{
				pelicula: {imageUrl: "images/peliculas/StarWars.jpg",
						   trailerUrl: "https://www.youtube.com/embed/sGbxmsDFVnE",
			 			   nombre: "Star Wars",
			 			   descripcion: "Episodio 7",
			 			   genero: "Space Opera",
						   duracion: "98",
						   tituloOriginal: "Star Wars",
						   director: "JJ Abrams",
						   calificacion: "+13"},						 			   
				formato: "2D",
				complejo: {
						   nombre: "Cinemar Avellaneda"
						  },
				idioma: "Español",
				dia: new Date("5/23/2017"),
				hora: new Date(2017,4,23,15,10,0,0)
			},
			{
				pelicula: {imageUrl: "images/peliculas/Logan.jpg",
						   trailerUrl: "https://www.youtube.com/embed/Div0iP65aZo",
			 			   nombre: "Logan",
			 			   descripcion: "Vuelve de nuevo a la acción",
			 			   genero: "Acción",
						   duracion: "80",
						   tituloOriginal: "Logan",
						   director: "John Will",
						   calificacion: "+16"},			 	
				formato: "3D",
				complejo: {
						   nombre: "Cinemar Lanus"
						  },
				idioma: "Subtitulado",
				dia: new Date("5/24/2017"),
				hora: new Date(2017,4,24,16,30,0,0)
			},
			{
				pelicula: {imageUrl: "images/peliculas/America.jpg",
						   trailerUrl: "https://www.youtube.com/embed/uVdV-lxRPFo",
			 			   nombre: "Capitán América",
			 			   descripcion: "El héroe de Estados Unidos",
			 			   genero: "Acción",
						   duracion: "76",
						   tituloOriginal: "Captain America",
						   director: "Mary Weild",
						   calificacion: "+13"},			 	
				formato: "3D",
				complejo: {
						   nombre: "Cinemar Avellaneda"
						  },
				idioma: "Español",
				dia: new Date("5/25/2017"),
				hora: new Date(2017,4,25,18,0,0,0)
			},
			{
				pelicula: {imageUrl: "images/peliculas/BeautyAndTheBeast.jpg",
						   trailerUrl: "https://www.youtube.com/embed/SqQvZ_VUtg8",
			 			   nombre: "Bella y Bestia",
			 			   descripcion: "Un romance diferente",
			 			   genero: "Romance",
						   duracion: "71",
						   tituloOriginal: "Beauty And The Beast",
						   director: "Taliz Al Quilani",
						   calificacion: "ATP"},							 			   
				formato: "2D",
				complejo: {
						   nombre: "Cinemar Lanus"
						  },
				idioma: "Español",
				dia: new Date("5/26/2017"),
				hora: new Date(2017,4,26,10,0,0,0)
			},
			{
				pelicula: {imageUrl: "images/peliculas/BeautyAndTheBeast.jpg",
						   trailerUrl: "https://www.youtube.com/embed/SqQvZ_VUtg8",
			 			   nombre: "Bella y Bestia",
			 			   descripcion: "Un romance diferente",
			 			   genero: "Romance",
						   duracion: "71",
						   tituloOriginal: "Beauty And The Beast",
						   director: "Taliz Al Quilani",
						   calificacion: "ATP"},							 			   
				formato: "2D",
				complejo: {
						   nombre: "Cinemar Lanus"
						  },
				idioma: "Español",
				dia: new Date("5/26/2017"),
				hora: new Date(2017,4,26,16,30,0,0)
			}
		];*/

		Funciones.listado()
	     .then(function(datos){
	     	console.log(datos);

	        $scope.funciones = datos;

	        (function(){						
			var funcionesDesdeAhora = [];

			for (var i = $scope.funciones.length - 1; i >= 0; i--) {				
				$scope.funciones[i].diaTime = new Date($scope.funciones[i].dia).getTime();
				if(new Date($scope.funciones[i].hora).getTime() >= new Date().getTime()){
					funcionesDesdeAhora.push($scope.funciones[i]);
				}
			}
			$scope.funciones = funcionesDesdeAhora;
			console.log($scope.funciones);			
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
	       		  $scope.fechasDias.push($scope.dias[$scope.fechas[i].getDay()] + " - " + $scope.fechas[i].getDate() + "/" + ($scope.fechas[i].getMonth()+1));    
				}						
			})();  

	     })
	     .catch(function(e){
	       console.log(e);
	     });
					
		$scope.filtrarDia = function(){									
			var indice = $scope.fechasDias.indexOf($scope.filtro.dia);			
			var dia = $scope.fechas[indice];
			
			$scope.filtro.diaLocale = dia.getTime();	

			console.log($scope.filtro);				
		}
				
		$scope.limpiarFiltro = function (){
			console.log($rootScope);
			$scope.filtro = {};			
		}

		$scope.cargar = function(funcion){
			console.log($scope.filtro);													
			$scope.filtro.formato == null ? funcion.filtroFormato = false : funcion.filtroFormato = true;
			$scope.filtro.idioma == null ? funcion.filtroIdioma = false : funcion.filtroIdioma = true;
			$scope.filtro.complejo == null ? funcion.filtroComplejo = false : funcion.filtroComplejo = true;
			$scope.filtro.diaLocale == null ? funcion.filtroDia = false : funcion.filtroDia = true;
			
			console.log(funcion);
			Datos.cargar(funcion);
		}

		$scope.loguear = function(){
			console.log($scope.filtro);
		}						
	}]);
})();