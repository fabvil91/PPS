(function(){
	'use strict';
	angular.module('cine')
	.controller('detallePeliculaCtrl', ['$rootScope','$scope','Datos','$sce','Salas',function($rootScope,$scope,Datos,$sce,Salas){	
		$scope.complejos = ["Cinemar Avellaneda", "Cinemar Lanus"];
		$scope.formatos = ["2D","3D"];
		$scope.idiomas = ["Español", "Subtitulado"];

		$scope.filtro = {};

		$scope.funciones = [
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
				dia: new Date("5/19/2017"),
				hora: new Date(2017,4,19,15,10,0,0)
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
				dia: new Date("5/16/2017"),
				hora: new Date(2017,4,16,16,30,0,0)
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
				dia: new Date("5/17/2017"),
				hora: new Date(2017,4,17,18,0,0,0)
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
				dia: new Date("5/18/2017"),
				hora: new Date(2017,4,18,10,0,0,0)
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
				dia: new Date("5/18/2017"),
				hora: new Date(2017,4,18,16,30,0,0)
			}
		];
	
		(function(){						
			var funcionesDesdeAhora = [];

			for (var i = $scope.funciones.length - 1; i >= 0; i--) {				
				$scope.funciones[i].diaTime = $scope.funciones[i].dia.getTime();
				if($scope.funciones[i].hora.getTime() >= new Date().getTime()){
					funcionesDesdeAhora.push($scope.funciones[i]);
				}
			}
			$scope.funciones = funcionesDesdeAhora;
			console.log($scope.funciones);
			console.log(funcionesDesdeAhora);
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
				
		$scope.filtrarDia = function(){									
			var indice = $scope.fechasDias.indexOf($scope.filtro.diaNombre);			
			var dia = $scope.fechas[indice];
			
			$scope.filtro.diaLocale = dia.getTime();					
			console.log($scope.filtro);
		}
				
		$scope.limpiarFiltro = function (){
			console.log($rootScope);
			$scope.filtro = {};			
		}
		
		$scope.filtro.pelicula = Datos.listado().pelicula;
		if(Datos.listado().filtroDia){			
			$scope.filtro.diaNombre = $scope.dias[Datos.listado().dia.getDay()] + " - " + Datos.listado().dia.getDate() + "/" + (Datos.listado().dia.getMonth()+1);
			$scope.filtro.diaLocale = Datos.listado().dia.getTime();
		}
		if(Datos.listado().filtroFormato){			
			$scope.filtro.formato = Datos.listado().formato;
		}
		if(Datos.listado().filtroIdioma){			
			$scope.filtro.idioma = Datos.listado().idioma;
		}
		if(Datos.listado().filtroComplejo){
			$scope.filtro.complejo = {};			
			$scope.filtro.complejo.nombre = Datos.listado().complejo.nombre;
		}

		(function(){
			for (var i = 0; i < $scope.funciones.length; i++ ) {	   
			  var funciones = $scope.funciones;
       		  funciones[i].diaFormateado = $scope.dias[funciones[i].dia.getDay()] + " - " + funciones[i].dia.getDate() + "/" + (funciones[i].dia.getMonth()+1);       		  
			}
			console.log($scope.funciones);	
		})();
		
		$scope.tab = 1;

        $scope.setTab = function (tabId) {
        	console.log("setTab");
            $scope.tab = tabId;
        };

        $scope.isSet = function (tabId) {        	        	
            return $scope.tab === tabId;
        };

        $scope.formatear = function(funcion){
        	console.log(funcion);
        	return funcion.replace(/,/g, " > ");
        }

        $scope.cargar = function(funcion){
        	console.log(funcion);
        	console.log(Salas.crear(2,4));
			Datos.cargar(funcion);
        }
    }])
})();